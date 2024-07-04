import React, { useState } from "react";

import CommentSection from "./Comments";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import "./BlogCard.css";

import img from "../assets/OIP.jpg";

const BlogCard = (props) => {
  const nav = useNavigate();

  const [themeCard, setThemeCard] = useState("light"); // State for theme (initial: light)

  const deleteHandler = async (id) => {
    console.log(id + " is id");

    try {
      await axios.delete(`https://bloggy-db.onrender.com/blogs/${id}`);
      props.funcCall();
    } catch (error) {
      console.error("Error deleting blog:", error); // Handle errors gracefully
    }
  };

  console.log(props.blog._id + " hhihi");

  const toggleThemeCard = () => {
    setThemeCard((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const [selectFontColor, setFontColor] = useState("text-black");

  const styles = {
    color: `${selectFontColor}`, // Corrected usage
  };

  function handleFontColor(e) {
    const color = e.target.value;

    if (color == "") {
      setFontColor("black");
    }

    if (color == "red") {
      setFontColor("red");
    }

    if (color == "blue") {
      setFontColor("blue");
    }

    if (color == "green") {
      setFontColor("green");
    }

    if (color == "black") {
      setFontColor("black");
    }
  }

  return (
    <div
      className={`card blog-card ${
        themeCard === "dark" ? "bg-dark text-white" : ""
      }`}
      style={styles}
    >
      <div
        className={`${themeCard === "dark" ? "bg-dark text-white" : ""}`}
        style={styles}
      >
        <div className="blog-wrapper body">
          <div class="blog-card">
            <div class="card-img">
              <img src={img}></img>
            </div>

            <div class="card-details">
              <span style={styles}>
                <i class="fa fa-calendar"></i>
              </span>

              <span style={styles}>
                <i class="fa fa-heart"></i>
              </span>
            </div>

            <div className={`${themeCard === "dark" ? "text-black" : ""}`}>
              {props.blog.title}
            </div>

            <div class="card-text">
              <p className={`${themeCard === "dark" ? "text-black" : ""}`}>
                {props.blog.content.substring(0, 150)}......
              </p>

              <p className={`${themeCard === "dark" ? "text-black" : ""}`}>
                {props.blog.categories}
              </p>

              <p className={`${themeCard === "dark" ? "text-black" : ""}`}>
                {props.blog.tags}
              </p>
            </div>

            <button
              onClick={() => nav(`/singleview/${props.blog.id}`)}
              class="read-more border"
            >
              Read More
            </button>
          </div>

          <select
            onChange={(e) => handleFontColor(e)}
            className={` ${themeCard === "dark" ? "bg-dark text-white" : ""}`}
            style={{
              backgroundColor: "grey",

              color: "white",

              marginBottom: "10px",
            }}
          >
            <option value="">--Select Theme--</option>

            <option value="black">black</option>

            <option value="red">red</option>

            <option value="blue">blue</option>

            <option value="green">green</option>
          </select>
        </div>
      </div>

      <div className="my-1 mb-2 mt-3">
        <button
          className="btn btn-primary "
          onClick={() => nav(`/edit/:${props.blog.id}`)}
        >
          Edit
        </button>

        <button
          className="btn btn-danger mx-3"
          onClick={() => deleteHandler(props.blog.id)}
        >
          Delete
        </button>

        <button className="btn btn-secondary" onClick={toggleThemeCard}>
          {themeCard === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>

      <CommentSection id={props.blog.id} />
    </div>
  );
};

export default BlogCard;
