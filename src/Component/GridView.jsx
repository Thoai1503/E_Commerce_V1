import React from "react";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

const GridView = ({ products }) => {
  return (
    <>
      {products.length > 0 &&
        products.map((item) => {
          return <ProductItem key={item.id} item={item} />;
        })}
    </>
  );
};

export default GridView;
