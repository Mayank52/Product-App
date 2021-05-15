import { useState } from "react";
import "./App.css";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Products from "./components/Products";
import AddProduct from "./components/AddProduct";
import Header from "./components/Header";

function App() {
  const [selectedProduct, setSelectedProduct] = useState();
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/" exact>
            <Products
              setIsEdit={setIsEdit}
              setSelectedProduct={setSelectedProduct}
            />
          </Route>
          <Route path="/addProduct">
            <AddProduct
              product={selectedProduct?.product}
              id={selectedProduct?.id}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              setSelectedProduct={setSelectedProduct}
            />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;

const Container = styled.div``;
