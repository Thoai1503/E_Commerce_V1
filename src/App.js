import "./App.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import NavDropdown from "react-bootstrap/NavDropdown";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

import { BsFillGridFill, BsList } from "react-icons/bs";
import Sidebar from "./Component/Sidebar";

import BarE from "./Component/BarE";
import { ProductPage } from "./pages/ProductPage";

function App() {
  const [cartCount, setCartCount] = useState(3); // Example cart count

  return (
    <body>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <BarE />
        <Container>
          <Row>
            <ProductPage />
          </Row>
        </Container>
      </Container>
    </body>
  );
}

export default App;
