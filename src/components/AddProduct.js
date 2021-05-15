import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { db } from "../config/firebase";
import AddImage from "./AddImage";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function AddProduct() {
  const { selectedProduct, isEdit } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState();
  const [imgUrl, setImgUrl] = useState(
    selectedProduct ? selectedProduct.product.image : ""
  );
  const [productName, setProductName] = useState(
    selectedProduct ? selectedProduct.product.name : ""
  );
  const [price, setPrice] = useState(
    selectedProduct ? selectedProduct.product.price : ""
  );
  const [addError, setAddError] = useState("");
  const history = useHistory();

  const types = ["image/png", "image/jpeg", "image/jpg"];

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
      console.log(productName, imgUrl, price);
    if (productName && imgUrl && price) {
      if (isEdit) {
        db.collection("products").doc(selectedProduct?.id).update({
          name: productName,
          price: price,
          image: imgUrl,
        });

        dispatch({
          type: "SET_IS_EDIT",
          payload: false,
        });
        dispatch({
          type: "SET_SELECTED_PRODUCT",
          payload: null,
        });
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
        <h2>Add Product</h2>
      </Header>
      <AddProductContainer>
        <ImageContainer>
          <h5>Upload Photo</h5>
          <label>
            <input type="file" onChange={fileUploadHandler} />
            <PhotoCameraIcon />
          </label>
          {selectedFile && (
            <AddImage file={selectedFile} setImgUrl={setImgUrl} error={error} />
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
    border: 1px solid purple;
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
  h2 {
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
