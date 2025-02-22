import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import NavDropdown from "react-bootstrap/NavDropdown";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import ProductItem from "../Component/ProductItem";
import { BsFillGridFill, BsList } from "react-icons/bs";
import Sidebar from "../Component/Sidebar";
import GridView from "../Component/GridView";

export const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://dummyjson.com/products`);

      setProducts(res.data.products);
      setCategories([
        ...new Set(
          res.data.products.map(
            (item) =>
              item.category.charAt(0).toUpperCase() + item.category.slice(1) // ✅ Capitalizing first letter
          )
        ),
      ]);
      console.log(res.data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching products data:", error);
    }
  };

  useEffect(() => {
    fetchProductData();
    console.log("Cate:" + categories);
  }, []);

  useEffect(() => {
    console.log("Categories:", categories);
  }, [categories]);
  return (
    <>
      <Col md={2}>
        <Sidebar categories={categories} />
      </Col>
      <Col md={10}>
        <section style={{ backgroundColor: "white" }}>
          <div className="container py-5">
            <Row>
              <Col md={6}>
                {" "}
                <button className="btn-view grid-view">
                  <BsFillGridFill />{" "}
                </button>
                <button className="btn-view list-view">
                  <BsList />
                </button>
              </Col>
              <Col md={6}>
                <form style={{ marginLeft: "260px" }}>
                  <label style={{ marginRight: "8px" }} htmlFor="sort">
                    Sort by{" "}
                  </label>
                  <select name="sort" id="sort" className="sort-input">
                    <option value="price-lowest">price (lowest)</option>
                    <option value="price-highest">price (highest)</option>
                    <option value="name-a">name (a - z)</option>
                    <option value="name-z">name (z - a)</option>
                  </select>
                </form>
              </Col>
            </Row>
            <hr />
            <div className="row">
              {!loading && <GridView products={products} />}
            </div>
          </div>
        </section>
      </Col>
    </>
  );
};
