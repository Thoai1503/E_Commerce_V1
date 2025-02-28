import React from "react";

const Sidebar = ({
  categories = [],
  brand = [],
  setFilteredCate = () => {},
  refresh = () => {},
  handleChange = () => {},
  filteredBrand,
  handleSearch = () => {},
  query,
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
          onChange={handleSearch}
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
                setFilteredCate("All");
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
                  onClick={() => setFilteredCate(`${item}`)}
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
            onChange={handleChange}
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
      <button onClick={refresh}>Refresh</button>
    </div>
  );
};

export default Sidebar;
