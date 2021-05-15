import React from "react";
import styled from "styled-components";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { db } from "../config/firebase";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function ProductCard({ product, id }) {
  const dispatch = useDispatch();

  let history = useHistory();
  const editProduct = () => {
    dispatch({
      type: "SET_IS_EDIT",
      payload: true,
    });
    dispatch({
      type: "SET_SELECTED_PRODUCT",
      payload: { product, id },
    });

    history.push("/addProduct");
  };

  const deleteProduct = () => {
    console.log(id);
    db.collection("products").doc(id).delete();
  };

  return (
    <Container>
      <ProductContainer>
        <ImageContainer>
          <img src={product.image} alt="product image" />
        </ImageContainer>
        <DetailsContainer>
          <div className="product-name">{product.name}</div>
          <div className="product-price">{product.price}</div>
        </DetailsContainer>
      </ProductContainer>
      <ButtonsContainer>
        <ButtonIcon onClick={deleteProduct}>
          <DeleteIcon />
        </ButtonIcon>
        <ButtonIcon onClick={editProduct}>
          <EditIcon />
        </ButtonIcon>
      </ButtonsContainer>
    </Container>
  );
}

const Container = styled.div`
  background-color: #fff;
  margin: auto;
  border-radius: 4px;
  padding: 0 4%;
  display: flex;
  flex-direction: column;

  box-shadow: 0px 1px 2px gray;
  margin-top: 3%;
`;
const ProductContainer = styled.div`
  display: flex;
  border-bottom: 1px solid lightgrey;
  padding: 5% 0;
`;
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2% 0;
`;
const ImageContainer = styled.div`
  img {
    height: 100px;
    width: 150px;
    object-fit: contain;
    border-radius: 4px;
  }
  margin-right: 4%;
`;
const DetailsContainer = styled.div`
  .product-name {
    font-weight: 500;
  }
  .product-price {
    color: green;
  }
`;
const ButtonIcon = styled.div`
  .MuiSvgIcon-root {
    color: purple;

    :hover {
      transform: scale(1.2);
    }
  }
`;
