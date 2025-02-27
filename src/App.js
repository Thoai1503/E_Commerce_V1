import "./App.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import NavDropdown from "react-bootstrap/NavDropdown";
import { FaShoppingCart } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

import { BsFillGridFill, BsList } from "react-icons/bs";
import Sidebar from "./Component/Sidebar";

import BarE from "./Component/BarE";
import { ProductPage } from "./pages/ProductPage";

function App() {
  const [cartCount, setCartCount] = useState(3); // Example cart count

  return (
    <>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <BarE />
      </Container>
      <div
        className="bg-primary w-100 vw-100"
        style={{ width: "1800px", display: "block", color: "#0DC8EE" }}
      >
        <div className="container-fluid py-4" style={{ marginLeft: "120px" }}>
          {/* Breadcrumb */}
          <nav className="d-flex">
            <h6 className="mb-0">
              <a href="" className="text-white-50">
                Home
              </a>
              <span className="text-white-50 mx-2"> &gt; </span>
              <a href="" className="text-white-50">
                Library
              </a>
              <span className="text-white-50 mx-2"> &gt; </span>
              <a href="" className="text-white">
                <u>Data</u>
              </a>
            </h6>
          </nav>
          {/* Breadcrumb */}
        </div>
      </div>
      <Container>
        <Row>
          <Outlet />
        </Row>
      </Container>
    </>
  );
}

export default App;
