import React, { useState, useEffect } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import CommentSection from "./Comments";

import BlogCard from "./BlogCard";

import Navbar from "./Navbar";

const BlogView = () => {
  const [data, setData] = useState([]);

  const [filteredData, setFilteredData] = useState([]); // State for filtered blogs

  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const [searchByCat, setSearchByCat] = useState("");

  const [searchByTag, setSearchByTag] = useState("");

  const [themeContainer, setThemeContainer] = useState("light");

  const url = "http://localhost:5550/blogs"; // Replace with your API endpoint

  const nav = useNavigate();

  const fetchAllBlogs = async () => {
    try {
      const val1 = await axios
        .get("https://bloggy-db.onrender.com/blogs")
        .then((data) => {
          setData(data.data);
          setFilteredData(data.data);
        });
    } catch (error) {
      console.error("Error fetching blogs:", error); // Handle errors gracefully
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Lowercase for case-insensitive search

    const filteredBlogs = data.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm)
    );

    setFilteredData(filteredBlogs);
  };

  const toggleThemeContainer = () => {
    setThemeContainer((prevTheme) =>
      prevTheme === "light" ? "dark" : "light"
    );
  };

  return (
    <>
      <Navbar />

      <div
        className={`container blog-view ${
          themeContainer === "dark" ? "bg-dark text-white" : ""
        }`}
      >
        <div className="theme-toggle d-flex justify-content-end"></div>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter blog title to search"
            aria-label="Search"
            aria-describedby="search-btn"
            value={searchTerm}
            onChange={handleSearch}
          />

          <button className="btn btn-secondary" onClick={toggleThemeContainer}>
            {themeContainer === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>

        <h3 className="text-primary text-center mb-4">View Blogs</h3>

        <div className="row">
          {filteredData.map((blog) => (
            <div className="col-md-6 col-lg-4 mb-4 " key={blog.id}>
              <BlogCard blog={blog} funcCall={fetchAllBlogs} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogView;
