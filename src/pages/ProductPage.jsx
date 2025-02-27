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
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brand, setBrand] = useState([]);
  const [filteredCate, setFilteredCate] = useState("All");

  // const [filteredProduct, setFilteredProduct] = useState([]);
  // Add a new state to store the original products
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredBrand, setFilteredBrand] = useState("All");
  const [query, setQuery] = useState("");
  // Modify the fetchProductData function to store both all products and filtered products
  const [filterState, setFilterState] = useState({
    filtered_products: [],
    all_products: [],
    grid_view: true,
    sort: "price-lowest",
    filters: {
      text: "",
      brand: "all",
      category: "all",
    },
  });
  console.log(filterState);
  const fetchProductData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://dummyjson.com/products`);

      // Store all products in both states initially
      setAllProducts(res.data.products);
      setProducts(res.data.products);
      setFilterState({ ...filterState, all_products: [...res.data.products] });

      setCategories([
        ...new Set(
          res.data.products.map(
            (item) =>
              item.category.charAt(0).toUpperCase() + item.category.slice(1)
          )
        ),
      ]);
      setBrand([...new Set(res.data.products.map((item) => item.brand))]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products data:", error);
    }
  };

  const filterProduct = (filCate, filBrand) => {
    const flCate = filCate.charAt(0).toLowerCase() + filCate.slice(1);
    console.log("Cate :" + flCate);
    let filteredProducts = [...allProducts];
    if (flCate !== "all") {
      filteredProducts = filteredProducts.filter(
        (item) => item.category === flCate
      );
    }

    if (filBrand !== "All") {
      filteredProducts = filteredProducts.filter(
        (item) => item.brand === filBrand
      );
    }
    setProducts(filteredProducts);
  };
  const refresh = () => {
    setFilteredCate("All");
    setFilteredBrand("All");
    setQuery("");
    setProducts(allProducts);
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    setFilteredBrand(e.target.value);
  };
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    if (!searchTerm.trim()) {
      // If search is empty, show all products (based on current category/brand filters)
      filterProduct(filteredCate, filteredBrand);
      return;
    }

    // Use the current search term value directly, not the state
    const searchProduct = allProducts.filter((item) => {
      // Case-insensitive search in title and description
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Additional filtering for any active category/brand filters
    let finalProducts = searchProduct;

    if (filteredCate !== "All") {
      const flCate =
        filteredCate.charAt(0).toLowerCase() + filteredCate.slice(1);
      finalProducts = finalProducts.filter((item) => item.category === flCate);
    }

    if (filteredBrand !== "All") {
      finalProducts = finalProducts.filter(
        (item) => item.brand === filteredBrand
      );
    }

    setProducts(finalProducts);
  };

  useEffect(() => {
    filterProduct(filteredCate, filteredBrand);
    console.log(products);
  }, [filteredCate, filteredBrand]);

  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    console.log("Cate filter:" + filteredCate);
  }, [filteredCate]);

  useEffect(() => {
    console.log("Categories:", categories);
    console.log("Brand:", brand);
  }, [categories, brand]);

  return (
    <>
      <Col md={2}>
        <Sidebar
          categories={categories}
          brand={brand}
          setFilteredCate={setFilteredCate}
          refresh={refresh}
          handleChange={handleChange}
          filteredBrand={filteredBrand}
          query={query}
          handleSearch={handleSearch}
        />
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
