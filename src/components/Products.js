import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "firebase";
import { db } from "../config/firebase";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

export default function Products({ setIsEdit, setSelectedProduct }) {
  const [products, setProducts] = useState([]);

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

      setProducts(tempProduct);
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
            setIsEdit={setIsEdit}
            setSelectedProduct={setSelectedProduct}
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
  max-width: 1200px;
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
