import React from "react";

const Sidebar = ({ categories }) => {
  return (
    <div className="side-bar">
      <div
        class="form-outline"
        data-mdb-input-init
        style={{ marginTop: "50px" }}
      >
        <input
          type="text"
          id="form12"
          class="form-control"
          placeholder="Search.."
        />
      </div>
      <div className="filter" style={{ marginTop: "20px", marginLeft: "5px" }}>
        <h6 style={{ color: "#0DC8EE" }}>Category</h6>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">All</li>
          {categories.map((item) => {
            return <li class="list-group-item">{item}</li>;
          })}
        </ul>
        <h6 style={{ color: "#0DC8EE", marginTop: "20px" }}>Price</h6>
      </div>
    </div>
  );
};

export default Sidebar;
