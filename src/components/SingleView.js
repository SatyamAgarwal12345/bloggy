import axios from "axios";

import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import "./SingleView.css";

import img from '../assets/OIP.jpg'

const SingleView = () => {

 const param = useParams();

 const [data, setData] = useState({

  title: "",

  content: "",

  categories: ["cat1", "cat2"],

  tags: ["tag1", "tag2"],

 });

 useEffect(() => {

  async function fetchDataOfId() {

   try {

    const response = await axios

     .get(`http://localhost:5550/blogs/${param.id}`)

     .then((response) => setInpFie(response.data));

   } catch (error) {}

  }

  fetchDataOfId();

 }, []);

 function setInpFie(obj) {

  setData({ ...data, title: obj.title, content: obj.content });

  console.log(obj);

 }

 return (

  <div className="bodyy">

   <div className="containerr">

    <div className="cardd">

     <div className="img-containerr">

      <img src={img}></img>

     </div>

     <div className="card-contentt">

      <h2 className="h22">Hello</h2>

      <h1 className="h11">{data.title}</h1>

      <p className="excerpt">

       {data.content}

      </p>

      <p className="authorr">By Satyam</p>

     </div>

    </div>

   </div>

  </div>

 );

};

export default SingleView;















