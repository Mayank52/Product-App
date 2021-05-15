import React, {useEffect } from "react";
import styled from "styled-components";
import { db } from "../config/firebase";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Products() {
  const { products } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    db.collection("products").onSnapshot((snapshot) => {
      let tempProduct = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          product: doc.data(),
        };
      });

      dispatch({
        type: "SET_PRODUCTS",
        payload: tempProduct,
      });
    });
  };

  console.log(products);
  return (
    <Container>
      <ProductsHeader>
        <h2>Products</h2>
      </ProductsHeader>
      <ProductsContainer>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            product={product.product}
          />
        ))}
      </ProductsContainer>
      <AddProductContainer>
        <Link to="/addProduct">
          <button>ADD PRODUCT</button>
        </Link>
      </AddProductContainer>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 500px;
  margin: auto;
  padding: 5%;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
const ProductsHeader = styled.div`
  h2 {
    margin: 0;
  }
`;
const ProductsContainer = styled.div`
  flex: 1;
`;
const AddProductContainer = styled.div`
  margin: 5% 0;
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
