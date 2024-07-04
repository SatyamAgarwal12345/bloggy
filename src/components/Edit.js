import React, { useState, useEffect } from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import Navbar from "./Navbar";

const Edit = () => {
  const { id } = useParams();

  const nav = useNavigate();

  const [themeContainer, setThemeContainer] = useState("light");

  const [data, setData] = useState({
    title: "",

    content: "",

    categories: ["cat1", "cat2"],

    tags: ["tag1", "tag2"],
  });

  const [errorField, setErrorField] = useState({
    title: "",

    content: "",

    categories: "",

    tags: "",
  });

  const [formVaild, setFormVaild] = useState({
    title: false,

    content: false,

    categories: false,

    tags: false,

    btnActive: false,
  });

  const toggleThemeContainer = () => {
    setThemeContainer((prevTheme) =>
      prevTheme === "light" ? "dark" : "light"
    );
  };

  function validation(fieldName, fieldValue) {
    var copyErrorField = errorField;

    var copyFormVaild = formVaild;

    if (fieldName == "title") {
      if (fieldValue.length < 5) {
        copyErrorField.title = "plz enter more title length more than 5";

        copyFormVaild.title = false;
      } else {
        copyErrorField.title = "";

        copyFormVaild.title = true;
      }
    }

    if (fieldName == "content") {
      if (fieldValue.length < 5) {
        copyErrorField.content = "plz enter more content length more than 5";

        copyFormVaild.content = false;
      } else {
        copyErrorField.content = "";

        copyFormVaild.content = true;
      }
    }

    if (fieldName == "categories") {
      if (fieldValue == "") {
        copyErrorField.categories = "plz select";

        copyFormVaild.categories = false;
      } else {
        copyErrorField.categories = "";

        copyFormVaild.categories = true;
      }
    }

    if (fieldName == "tags") {
      if (fieldValue == "") {
        copyErrorField.tags = "plz select";

        copyFormVaild.tags = false;
      } else {
        copyErrorField.tags = "";

        copyFormVaild.tags = true;
      }
    }

    setErrorField({ ...errorField, copyErrorField });

    setFormVaild({ ...formVaild, copyFormVaild });

    const btnActDatv =
      formVaild.title &&
      formVaild.content &&
      formVaild.categories &&
      formVaild.tags;

    setFormVaild({ ...formVaild, btnActive: btnActDatv });
  }

  function dataHandler(e) {
    const name = e.target.name;

    const value = e.target.value;

    console.log(name, value);

    if (name === "title" || name === "content") {
      setData({ ...data, [name]: value });
    } else if (name === "categories" || name === "tags") {
      // Handle multiple selection for categories and tags

      const selectedOptions = Array.from(e.target.selectedOptions).map(
        (option) => option.value
      );

      setData({ ...data, [`selected${name}`]: selectedOptions });
    }

    validation(name, value);
  }

  var idwc = id.slice(1, id.length);

  console.log("id is " + id);

  async function submitHandler(e) {
    e.preventDefault();

    try {
      await axios

        .put(`https://bloggy-db.onrender.com/blogs/${idwc}`, data)

        .then(() => nav("/view"));
    } catch (error) {}
  }
  useEffect(() => {
    async function fetchDataOfId() {
      try {
        const response = await axios

          .get(`https://bloggy-db.onrender.com/blogs/${idwc}`)

          .then((response) => {
            console.log(response.data);

            setInpFie(response.data);
          });
      } catch (error) {}
    }

    fetchDataOfId();
  }, []);

  function setInpFie(obj) {
    console.log(obj, " edit data");
    setData({ ...data, title: obj.title, content: obj.content });
  }

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
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 shadow p-3 mb-5 bg-white rounded">
            <h4 className="text-center mb-4">Edit Your Blog</h4>

            <select onChange={(e) => handleFontColor(e)}>
              <option value="">--Select Theme--</option>

              <option value="black">black</option>

              <option value="red">red</option>

              <option value="blue">blue</option>

              <option value="green">green</option>
            </select>

            <div
              className={`card ${
                themeContainer === "dark" ? "bg-dark text-white" : ""
              }`}
            >
              <form onSubmit={submitHandler} style={styles}>
                <div className="form-group mb-3">
                  <label htmlFor="title">Title:</label>

                  <input
                    type="text"
                    name="title"
                    onChange={dataHandler}
                    className="form-control"
                    value={data.title}
                    id="title"
                  />

                  <p className="text-danger">{errorField.title}</p>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="content">Content:</label>

                  <textarea
                    type="text"
                    name="content"
                    onChange={dataHandler}
                    className="form-control"
                    value={data.content}
                    id="content"
                    rows="5"
                  />

                  <p className="text-danger">{errorField.content}</p>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="categories">Categories:</label>

                  <select
                    name="categories"
                    className="form-control"
                    onChange={dataHandler}
                    id="categories"
                  >
                    <option value="">--Select--</option>

                    {data.categories.map((opt) => (
                      <option value={opt} key={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>

                  <p className="text-danger">{errorField.categories}</p>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="tags">Tags:</label>

                  <select
                    name="tags"
                    className="form-control"
                    onChange={dataHandler}
                    id="tags"
                  >
                    <option value="">--Select--</option>

                    {data.tags.map((opt) => (
                      <option value={opt} key={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>

                  <p className="text-danger">{errorField.tags}</p>
                </div>

                <button
                  className="btn btn-primary float-end"
                  disabled={!formVaild.btnActive}
                  type="submit"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>

        <button className="btn btn-secondary" onClick={toggleThemeContainer}>
          {themeContainer === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </>
  );
};

export default Edit;
