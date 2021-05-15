import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { db } from "../config/firebase";
import AddImage from "./AddImage";
import { useHistory } from "react-router-dom";

export default function AddProduct({
  product,
  isEdit,
  setIsEdit,
  setSelectedProduct,
  id,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState();
  const [imgUrl, setImgUrl] = useState(product ? product.image : "");
  const [productName, setProductName] = useState(product ? product.name : "");
  const [price, setPrice] = useState(product ? product.price : "");
  const [addError, setAddError] = useState("");
  const history = useHistory();

  const types = ["image/png", "image/jpeg"];

  const fileUploadHandler = (e) => {
    console.log(e.target.files[0]);
    const imgFile = e.target.files[0];
    if (imgFile && types.includes(imgFile.type)) {
      setSelectedFile(imgFile);
      setError(null);
    } else {
      setSelectedFile(null);
      setError("Please select a valid image (png or jpeg)");
    }
  };

  const addProduct = () => {
    if (productName && imgUrl && price) {
      if (isEdit) {
        console.log(id, price);
        db.collection("products").doc(id).update({
          name: productName,
          price: price,
          image: imgUrl,
        });

        setIsEdit(false);
        setSelectedProduct(null);
      } else {
        db.collection("products").add({
          name: productName,
          price: price,
          image: imgUrl,
        });
      }
      setAddError("");
      history.push("/");
    } else {
      setAddError("Enter Valid Details");
    }
  };

  return (
    <Container>
      <Header>
        <h3>Add Product</h3>
      </Header>
      <AddProductContainer>
        <ImageContainer>
          <h5>Upload Photo</h5>
          <label>
            <input type="file" onChange={fileUploadHandler} />
            <PhotoCameraIcon />
          </label>
          {selectedFile && (
            <AddImage
              file={selectedFile}
              setSelectedFile={setSelectedFile}
              setImgUrl={setImgUrl}
            />
          )}
        </ImageContainer>
        <DetailsContainer>
          <InputContainer>
            <label>Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            />
          </InputContainer>
          <InputContainer>
            <label>Price</label>

            <input
              type="text"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </InputContainer>
        </DetailsContainer>
        {addError ? <ErrorContainer>*{addError}</ErrorContainer> : <></>}
      </AddProductContainer>

      <SaveButton>
        <button onClick={addProduct}>SAVE</button>
      </SaveButton>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 1200px;
  margin: auto;
  padding: 5%;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
`;
const AddProductContainer = styled.div`
  flex: 1;
`;
const ImageContainer = styled.div`
  label {
    display: block;
    width: 40px;
    height: 40px;
    border: 1px solid lightgray;
    border-radius: 4px;
    color: lightgray;
    display: flex;
    align-items: center;
    justify-content: center;

    :hover {
      cursor: pointer;
    }

    input {
      height: 0;
      width: 0;
    }
  }
`;
const DetailsContainer = styled.div`
  margin-top: 10%;
`;
const InputContainer = styled.div`
  input {
    width: 100%;
    border: none;
    border-radius: 4px;
    padding: 1%;
    font-size: 1.1rem;
    margin: 2% 0;

    :focus {
      outline: none;
    }
  }
`;
const Header = styled.div`
  h3 {
    margin: 0;
  }
`;
const SaveButton = styled.div`
  button {
    border: none;
    background-color: green;
    padding: 2%;
    font-size: 1.2rem;
    border-radius: 4px;
    width: 100%;
    margin: auto;
    color: white;
    cursor: pointer;

    :hover {
      background: white;
      border: 2px solid green;
      color: green;
    }
  }
`;

const ErrorContainer = styled.div`
  color: green;
  font-weigth: 500;
`;
