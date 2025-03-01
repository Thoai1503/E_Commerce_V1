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
import ListView from "../Component/ListView";

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
    grid_view: false,
    sort: "price-lowest",
    filters: {
      text: "",
      brand: "All",
      category: "all",
    },
  });

  useEffect(() => {
    console.log("Categories:", categories);
    console.log("Brand:", brand);
  }, [categories, brand]);

  const changeGridView = () => {
    setFilterState({ ...filterState, grid_view: true });
  };

  const changeListView = () => {
    setFilterState({ ...filterState, grid_view: false });
  };

  //New
  const updateFilters = () => {
    let tempProducts = [...filterState.all_products];
    const { text, category, brand } = filterState.filters;

    // Filter by search text

    if (text.trim() === "") {
      tempProducts = [...filterState.all_products];
      // Filter by category
      if (category !== "all") {
        // Convert category format if needed (first letter lowercase)
        const formattedCategory =
          category === "all"
            ? "all"
            : category.charAt(0).toLowerCase() + category.slice(1);

        tempProducts = tempProducts.filter(
          (product) => product.category === formattedCategory
        );
      }

      // Filter by brand
      if (brand !== "All") {
        tempProducts = tempProducts.filter(
          (product) => product.brand === brand
        );
      }
    }

    tempProducts = tempProducts.filter((product) =>
      product.title.toLowerCase().includes(text.trim().toLowerCase())
    );

    // Sort products based on current sort setting
    const sortedProducts = sortProducts(tempProducts);

    // Update state with filtered and sorted products
    setFilterState({
      ...filterState,
      filtered_products: sortedProducts,
    });
  };

  // Handle text search change
  const handleTextChange = (e) => {
    const value = e.target.value;
    setFilterState({
      ...filterState,
      filters: {
        ...filterState.filters,
        text: value,
      },
    });
    // We could call updateFilters() here directly, but it's better to use useEffect
  };

  // Handle category selection
  const handleCategoryChange = (categorya) => {
    const cate = categorya.charAt(0).toLowerCase() + categorya.slice(1);
    setFilterState({
      ...filterState,
      filters: {
        ...filterState.filters,
        category: cate,
      },
    });
  };

  // Handle brand selection
  const handleBrandChange = (e) => {
    const value = e.target.value;
    setFilterState({
      ...filterState,
      filters: {
        ...filterState.filters,
        brand: value,
      },
    });
  };

  // Handle sort change
  const handleSortChange = (e) => {
    const value = e.target.value;
    setFilterState({
      ...filterState,
      sort: value,
    });
  };

  // Sort products based on current sort setting
  const sortProducts = (products) => {
    const { sort } = filterState;
    let tempProducts = [...products];

    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    }

    return tempProducts;
  };

  // Reset all filters
  const clearFilters = () => {
    // let tempProducts = [...filterState.all_products];
    setFilterState({
      ...filterState,

      filters: {
        text: "",
        category: "all",
        brand: "All",
      },
    });
  };

  useEffect(() => {
    updateFilters();
  }, [filterState.filters, filterState.sort]);

  // useEffect to fetch initial data and set all_products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://dummyjson.com/products");

        setFilterState({
          ...filterState,
          all_products: response.data.products,
          filtered_products: sortProducts(response.data.products),
        });

        // Extract unique categories and brands
        const uniqueCategories = [
          ...new Set(
            response.data.products.map(
              (item) =>
                item.category.charAt(0).toUpperCase() + item.category.slice(1)
            )
          ),
        ];

        const uniqueBrands = [
          ...new Set(response.data.products.map((item) => item.brand)),
        ];

        setCategories(uniqueCategories);
        setBrand(uniqueBrands);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Col md={2}>
        <Sidebar
          categories={categories}
          brand={brand}
          setFilteredCate={setFilteredCate}
          filteredBrand={filterState.filters.brand}
          query={filterState.filters.text}
          handleTextChange={handleTextChange}
          handleSortChange={handleSortChange}
          handleCategoryChange={handleCategoryChange}
          clearFilters={clearFilters}
          handleBrandChange={handleBrandChange}
        />
      </Col>
      <Col md={10}>
        <section style={{ backgroundColor: "white" }}>
          <div className="container py-5">
            <Row>
              <Col md={6}>
                {" "}
                <button onClick={changeGridView} className="btn-view grid-view">
                  <BsFillGridFill />{" "}
                </button>
                <button onClick={changeListView} className="btn-view list-view">
                  <BsList />
                </button>
              </Col>
              <Col md={6}>
                <form style={{ marginLeft: "260px" }}>
                  <label style={{ marginRight: "8px" }} htmlFor="sort">
                    Sort by{" "}
                  </label>
                  <select
                    name="sort"
                    id="sort"
                    value={filterState.sort}
                    className="sort-input"
                    onChange={handleSortChange}
                  >
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
              {!loading &&
                (filterState.grid_view ? (
                  <GridView products={filterState.filtered_products} />
                ) : (
                  <ListView />
                ))}
            </div>
          </div>
        </section>
      </Col>
    </>
  );
};
