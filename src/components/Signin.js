import axios from "axios";

import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const url = "http://localhost:5550/signin";

  const [data, setData] = useState({
    email: "",

    password: "",
  });

  const [errorField, setErrorField] = useState({
    email: "",

    password: "",
  });

  const [formVaild, setFormVaild] = useState({
    email: false,

    password: false,
  });

  const [errMsg, setErrMsg] = useState("");

  const [themeContainer, setThemeContainer] = useState("dark");

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

    if (fieldName == "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(fieldValue)) {
        copyErrorField.email = "plz enter valid email";

        copyFormVaild.email = false;
      } else {
        copyErrorField.email = "";

        copyFormVaild.email = true;
      }
    }

    if (fieldName == "password") {
      if (fieldValue.length < 5) {
        copyErrorField.password = "plz enter more content length more than 5";

        copyFormVaild.password = false;
      } else {
        copyErrorField.password = "";

        copyFormVaild.password = true;
      }
    }

    setErrorField({ ...errorField, copyErrorField });

    setFormVaild({ ...formVaild, copyFormVaild });

    const btnActDatv = formVaild.email && formVaild.password;

    setFormVaild({ ...formVaild, btnActive: btnActDatv });
  }

  const [signInData, setSignInData] = useState([]);

  const [isMatch, setIsMatch] = useState(false);

  function dataHandler(e) {
    const name = e.target.name;

    const value = e.target.value;

    setData({ ...data, [name]: value });

    validation(name, value);
  }

  const toggleThemeContainer = () => {
    setThemeContainer((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  async function signUpData() {
    try {
      await axios.get("http://localhost:5550/signin").then((data) => {
        setSignInData(data.data);

        console.log(data.data);
      });

      // setSignInData(response.data.result);
    } catch (error) {
      console.error("Error fetching blogs:", error); // Handle errors gracefully
    }

    if (isMatch) {
      window.location.href = "/blogpost";

      // navigate("/blogpost");
    }

    console.log("hiii");
  }

  function signInValidation(e) {
    e.preventDefault();

    const matchFound = signInData.some(
      (user) => user.email === data.email && user.password === data.password
    );

    setIsMatch(matchFound);

    if (!matchFound) {
      setErrMsg("invalid credentails");
    }
  }

  useEffect(
    () => signUpData(),

    [isMatch]
  );

  console.log(isMatch);

  return (
    <div>
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

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div
              className={`card ${
                themeContainer === "dark" ? "bg-dark text-white" : ""
              }`}
            >
              <div className="card-body mt-3" style={styles}>
                <div className="card-head bg-primary text-center py-1 rounded">
                  Sign In
                </div>

                <form>
                  <div className="form-group">
                    <label>Email</label>

                    <input
                      type="email"
                      className="form-control"
                      id="email"
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

                    <spam className="text-danger">{errorField.password}</spam>
                  </div>

                  <br></br>

                  <button
                    className="btn btn-danger"
                    onClick={signInValidation}
                    disabled={!formVaild.btnActive}
                  >
                    Login
                  </button>
                </form>

                <p className="mt-3">
                  Not registered?
                  <a href="/signup">Create an account</a>
                </p>

                <span className="text-danger">{errMsg}</span>

                {/* {JSON.stringify(signInData)} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
