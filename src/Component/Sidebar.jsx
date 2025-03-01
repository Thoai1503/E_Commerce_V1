import React from "react";

const Sidebar = ({
  categories = [],
  brand = [],
  setFilteredCate = () => {},
  handleBrandChange = () => {},
  filteredBrand,
  handleTextChange = () => {},
  handleCategoryChange = () => {},
  query,
  clearFilters = () => {},
}) => {
  return (
    <div className="side-bar">
      <div
        className="form-outline"
        data-mdb-input-init
        style={{ marginTop: "50px" }}
      >
        <input
          type="text"
          value={query}
          onChange={handleTextChange}
          id="form12"
          className="form-control"
          placeholder="Search.."
        />
      </div>
      <div className="filter" style={{ marginTop: "20px", marginLeft: "5px" }}>
        <h6 style={{ color: "#0DC8EE" }}>Category</h6>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <button
              style={{ backgroundColor: "white", border: "none" }}
              onClick={() => {
                handleCategoryChange("All");
              }}
            >
              All
            </button>
          </li>
          {categories.map((item, index) => {
            return (
              <li className="list-group-item" key={index}>
                <button
                  style={{ backgroundColor: "white", border: "none" }}
                  onClick={() => handleCategoryChange(`${item}`)}
                >
                  {item}
                </button>
              </li>
            );
          })}
        </ul>
        <h6 style={{ color: "#0DC8EE", marginTop: "20px" }}>Brand</h6>
        <form>
          <select
            value={filteredBrand}
            onChange={handleBrandChange}
            name="sort"
            id="sort"
            className="sort-input"
          >
            <option value="All">All</option>
            {brand.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </form>
      </div>
      <h6 style={{ color: "#0DC8EE", marginTop: "20px" }}>Price</h6>
      <button onClick={clearFilters}>Refresh</button>
    </div>
  );
};

export default Sidebar;
