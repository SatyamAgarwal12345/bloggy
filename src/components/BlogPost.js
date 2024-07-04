import React, { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import bgimg from "../assets/OIP.jpg";

import Navbar from "./Navbar";

const BlogPost = () => {
  const [themeContainer, setThemeContainer] = useState("light");

  const nav = useNavigate();

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

    copyFormVaild.btnActive =
      formVaild.title &&
      formVaild.content &&
      formVaild.categories &&
      formVaild.tags;

    setErrorField({ ...errorField, copyErrorField });

    setFormVaild({ ...formVaild, copyFormVaild });
  }

  const [showPreview, setShowPreview] = useState(false);

  const [schedule, setSchedule] = useState(false);

  const [scheduleTime, setScheduleTime] = useState(0);

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

  function submitHandler(e) {
    e.preventDefault();

    setTimeout(() => {
      try {
        //this whole commented code is to work with both backend and db.json
        // axios

        //   .post("http://localhost:2050/employees", {
        //     title: data.title,

        //     content: data.content,

        //     categories: data.selectedcategories[0],

        //     tags: data.selectedtags[0],
        //   })
        //   .then(() => {
        //     axios.post(" http://localhost:5550/blogs", {
        //       title: data.title,

        //       content: data.content,

        //       categories: data.selectedcategories[0],

        //       tags: data.selectedtags[0],
        //     });
        //   }).then(() => nav("/view"));
        // this is to only work with db.json
        axios
          .post(" http://localhost:5550/blogs", {
            title: data.title,

            content: data.content,

            categories: data.selectedcategories[0],

            tags: data.selectedtags[0],
          })
          .then(() => nav("/view"));
      } catch (error) {}
    }, scheduleTime);
  }

  console.log(scheduleTime + "hello");

  function togglePreview() {
    setShowPreview(!showPreview);
  }

  const toggleThemeContainer = () => {
    setThemeContainer((prevTheme) =>
      prevTheme === "light" ? "dark" : "light"
    );
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
    // <div className="container mt-5">

    // <div className="row justify-content-center">

    // <div className="col-md-8 shadow p-3 mb-5 bg-white rounded">

    // <div className="card">

    <div>
      <Navbar />

      <div className="row">
        <div className="col col-lg-2">
          <button className="btn btn-secondary " onClick={toggleThemeContainer}>
            {themeContainer === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>

        <div className="col col-lg-1" style={{ marginLeft: "-110px" }}>
          <select
            className="form-control form-control-secondary"
            style={{ backgroundColor: "grey", color: "white" }}
            onChange={(e) => handleFontColor(e)}
          >
            <option value="">--Select--</option>

            <option value="black">black</option>

            <option value="red">red</option>

            <option value="blue">blue</option>

            <option value="green">green</option>
          </select>
        </div>
      </div>

      <div className="container ">
        <div className="row justify-content-center">
          {showPreview && (
            <Preview
              title={data.title}
              content={data.content}
              state={setShowPreview}
            />
          )}

          {schedule && (
            <Schedule showTogler={setSchedule} setTime={setScheduleTime} />
          )}

          <div className="col-md-8 shadow p-3 mb-5 bg-white rounded ">
            <h4 className="text-center mb-4">Enter Your Blog</h4>

            <div
              className={`card p-4 ${
                themeContainer === "dark" ? "bg-dark text-white" : ""
              }`}
            >
              <form style={styles} onSubmit={submitHandler}>
                Title :
                <input
                  type="text"
                  name="title"
                  onChange={dataHandler}
                  className="form-control"
                ></input>
                <p className="text-danger">{errorField.title}</p>
                <br></br>
                Content :
                <textarea
                  type="text"
                  name="content"
                  onChange={dataHandler}
                  className="form-control"
                ></textarea>
                <p className="text-danger">{errorField.content}</p>
                <br></br>
                Categories :{" "}
                <select
                  name="categories"
                  className="form-control"
                  onChange={dataHandler}
                >
                  <option value="">--Select--</option>

                  {data.categories.map((opt) => (
                    <option value={opt}>{opt}</option>
                  ))}
                </select>
                <p className="text-danger">{errorField.categories}</p>
                <br></br>
                Tags :{" "}
                <select
                  name="tags"
                  className="form-control"
                  onChange={dataHandler}
                >
                  <option value="">--Select--</option>

                  {data.tags.map((opt) => (
                    <option value={opt}>{opt}</option>
                  ))}
                </select>
                <p className="text-danger">{errorField.tags}</p>
                <br></br>
                <button
                  disabled={!formVaild.btnActive}
                  className="btn btn-primary"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="btn btn-primary mx-3"
                  type="button"
                  onClick={togglePreview}
                >
                  Preview
                </button>
                <button
                  className="btn btn-primary "
                  type="button"
                  onClick={() => setSchedule(true)}
                >
                  Want to Schedule it later
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Preview = ({ title, content, state }) => {
  return (
    <div
      className="preview-card card border-0 shadow-lg"
      style={{
        backgroundColor: "#f5f5f5",

        borderRadius: "10px",

        height: "calc(100vh - 100px)",
      }}
    >
      <div className="card-header bg-primary text-light d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">{title}</h5>

        <button
          type="button"
          onClick={() => state(false)}
          className="btn btn-light btn-sm"
        >
          Edit
        </button>
      </div>

      <div className="card-body">
        <p className="card-text">{content}</p>
      </div>
    </div>
  );
};

const Schedule = ({ setTime, showTogler }) => {
  const [minutes, setMinutes] = useState();

  function clickHandler() {
    setTime(minutes);

    showTogler(false);
  }

  return (
    <div
      className="preview-card card border-dark mb-3 "
      style={{ width: "500px" }}
    >
      <div className="card-header bg-primary text-light d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">Will be posted in Scheduled Time</h5>
      </div>

      <div className="card-body">
        <input
          placeholder="Give Values in Minutes"
          type="number"
          name="title"
          className="form-control"
          onChange={(e) => {
            setMinutes(e.target.value);
          }}
        ></input>

        <br />

        <button
          type="button "
          onClick={clickHandler}
          className="btn btn-primary btn-sm"
        >
          Submit
        </button>

        {minutes}
      </div>
    </div>
  );
};

export default BlogPost;
