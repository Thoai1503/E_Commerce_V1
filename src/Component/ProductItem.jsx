import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ item }) => {
  return (
    <div className="col-md-12 col-lg-4 mb-4 mb-lg-0 mt-4">
      <Link
        to={`/product/${item.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="card h-100">
          <div className="d-flex justify-content-between p-3">
            <p className="lead mb-0">Today's Combo Offer</p>
            <div
              className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
              style={{ width: "35px", height: "35px" }}
            >
              <p className="text-white mb-0 small">x4</p>
            </div>
          </div>
          <img src={item.images} className="card-img-top" alt="Laptop" />
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <p className="small">
                <a href="#" className="text-muted">
                  {item.category.charAt(0).toUpperCase() +
                    item.category.slice(1)}
                </a>
              </p>
              <p className="small text-danger">
                <s>$1099</s>
              </p>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <h5 className="mb-0">{item.title}</h5>
              <h5 className="text-dark mb-0">${item.price}</h5>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <p className="text-muted mb-0">
                Available: <span className="fw-bold">6</span>
              </p>
              <div className="ms-auto text-warning">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
