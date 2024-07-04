import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BlogPost from "./components/BlogPost";

import BlogView from "./components/BlogView";

import Signin from "./components/Signin";

import Signup from "./components/Signup";

import Edit from "./components/Edit";

import LandingPage from "./components/LandingPage";

import SingleView from "./components/SingleView";

function App() {
  return (
    <Router>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>

          <Route path="/signin" element={<Signin />}></Route>

          <Route path="/signup" element={<Signup />}></Route>

          <Route path="/blogpost" element={<BlogPost />}></Route>

          <Route path="/view" element={<BlogView />}></Route>

          <Route path="/edit/:id" element={<Edit />}></Route>
          <Route path="/singleview/:id" element={<SingleView />}></Route>
        </Routes>
      </React.Fragment>
    </Router>
  );
}

export default App;
