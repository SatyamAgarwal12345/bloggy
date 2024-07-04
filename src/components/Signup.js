import axios from "axios";

import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const url = "http://localhost:5550/signin";

  const [themeContainer, setThemeContainer] = useState("dark");

  const [data, setData] = useState({
    name: "",

    email: "",

    password: "",
  });

  const [errorField, setErrorField] = useState({
    name: "",

    email: "",

    password: "",
  });

  const [formVaild, setFormVaild] = useState({
    name: false,

    email: false,

    password: false,
  });

  const [errMsg, setErrMsg] = useState("");

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

  function validation(fieldName, fieldValue) {
    var copyErrorField = errorField;

    var copyFormVaild = formVaild;

    if (fieldName == "name") {
      if (fieldValue.length < 5) {
        copyErrorField.name = "plz enter more name length more than 5";

        copyFormVaild.name = false;
      } else {
        copyErrorField.name = "";

        copyFormVaild.name = true;
      }
    }

    if (fieldName == "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(fieldValue)) {
        copyErrorField.email = "plz enter correct email";

        copyFormVaild.email = false;
      } else {
        copyErrorField.email = "";

        copyFormVaild.email = true;
      }
    }

    if (fieldName == "password") {
      if (fieldValue.length < 5) {
        copyErrorField.password = "plz enter correct password ";

        copyFormVaild.password = false;
      } else {
        copyErrorField.password = "";

        copyFormVaild.password = true;
      }
    }

    setErrorField({ ...errorField, copyErrorField });

    setFormVaild({ ...formVaild, copyFormVaild });

    const btnActDatv = formVaild.email && formVaild.password && formVaild.name;

    setFormVaild({ ...formVaild, btnActive: btnActDatv });
  }

  function dataHandler(e) {
    const name = e.target.name;

    const value = e.target.value;

    setData({ ...data, [name]: value });

    validation(name, value);
  }

  async function signUp(e) {
    e.preventDefault();

    const matchFound = signInData.some((user) => user.email === data.email);

    if (matchFound) {
      setErrMsg("email already exist");

      return;
    }

    try {
      await axios.post("http://localhost:5550/signin", data);

      await axios

        .post(url, data)

        .then(() => {
          window.location.href = "/blogpost";

          // navigate("/blogpost");
        })

        .then(() => {
          sessionStorage.setItem("auth1", [data.email, data.password]);
        });
    } catch (error) {}
  }

  const toggleThemeContainer = () => {
    setThemeContainer((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  console.log(selectFontColor);

  const [signInData, setSignInData] = useState([]);

  async function signUpData() {
    try {
      const response = await axios
        .get("http://localhost:5550/signin")
        .then((data) => {
          setSignInData(data.data);
        });
    } catch (error) {
      console.error("Error fetching blogs:", error); // Handle errors gracefully
    }
  }

  useEffect(
    () => signUpData(),

    []
  );

  console.log(signInData);

  return (
    <div className="row ">
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

      <div
        className="container mt-5

   "
      >
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div
              className={`card ${
                themeContainer === "dark" ? "bg-dark text-white" : ""
              }`}
            >
              <div className="card-body mt-3" style={styles}>
                <div className="card-head bg-primary text-center py-1 rounded">
                  Sign Up
                </div>

                <form>
                  <div className="form-group">
                    <label>Name</label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      onChange={dataHandler}
                      name="name"
                    />

                    <span className="text-danger">{errorField.name}</span>
                  </div>

                  <div className="form-group">
                    <label>Email</label>

                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      onChange={dataHandler}
                      name="email"
                    />

                    <span className="text-danger">{errorField.email}</span>
                  </div>

                  <div class="form-group">
                    <label>Password</label>

                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={dataHandler}
                      name="password"
                    />

                    <span className="text-danger">{errorField.password}</span>
                  </div>

                  <br></br>

                  <button
                    className="btn btn-danger"
                    onClick={signUp}
                    disabled={!formVaild.btnActive}
                  >
                    SignUp
                  </button>
                </form>

                <span className="text-danger">{errMsg}</span>

                <p className="mt-3">
                  Log In?
                  <a href="/signin">Login</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
