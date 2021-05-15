import "./App.css";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Products from "./components/Products";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/" exact>
            <Products />
          </Route>
          <Route path="/addProduct">
            <AddProduct />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;

const Container = styled.div``;
