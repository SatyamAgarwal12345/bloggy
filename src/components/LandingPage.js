import React, { useEffect, useState } from "react";

import "./LandingPage.css";

import { Link } from "react-router-dom";

import axios from "axios";

const LandingPage = () => {
  const [data, setData] = useState([]);

  const fetchAllBlogs = async () => {
    try {
      const val = await axios

        .get("http://localhost:5550/blogs")

        .then((data) => {
          setData(data.data);
        });
    } catch (error) {
      console.error("Error fetching blogs:", error); // Handle errors gracefully
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  return (
    <div>
      <header>
        <div className="container container-flex">
          <div className="site-title">
            <h1>Living The Social Life</h1>

            <p className="subtitle">A blog exploring minimalism in life.</p>
          </div>

          <nav>
            <ul>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>

              <li>
                {" "}
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container container-flex">
        <main role="main">
          <article className="article-featured">
            <h2 className="article-title"></h2>

            <img
              src="https://raw.githubusercontent.com/kevin-powell/reponsive-web-design-bootcamp/master/Module%202-%20A%20simple%20life/img/life.jpg"
              alt="simple white desk on a white wall with a plant on the far right side"
              className="article-image"
            ></img>

            <p className="article-info">
              {data.length && JSON.stringify(data.date)}
            </p>

            <p className="article-body">
              {data.length && JSON.stringify(data.content)}
            </p>
          </article>

          {data.map((data) => (
            <article className="article-recent">
              <div className="article-recent-main">
                <h2 className="article-title">{data.title}</h2>

                <p className="article-body">{data.content}</p>

                <Link to={`/singleview/${data.id}`}>CONTINUE READING</Link>
              </div>

              <div className="article-recent-secondary">
                <img
                  src="https://raw.githubusercontent.com/kevin-powell/reponsive-web-design-bootcamp/master/Module%202-%20A%20simple%20life/img/food.jpg"
                  alt="two dumplings on a wood plate with chopsticks"
                  className="article-image"
                ></img>

                <p className="article-info">{data.date}</p>
              </div>
            </article>
          ))}
        </main>

        <aside className="sidebar">
          <div className="sidebar-widget">
            <h2 className="widget-title">ABOUT ME</h2>

            <img
              src="https://raw.githubusercontent.com/kevin-powell/reponsive-web-design-bootcamp/master/Module%202-%20A%20simple%20life/img/about-me.jpg"
              alt="Satyam Agarwal"
              className="widget-image"
            ></img>

            <p className="widget-body">
              I find life better, and I'm happier, when things are nice and
              simple.
            </p>
          </div>
        </aside>
      </div>

      <footer>
        <p>
          <strong>Living the Simple Life</strong>
        </p>

        <p>
          Copyright 2024,{" "}
          <a href="akramnarejo.github.io" target="_blank">
            Satyam Agarwal
          </a>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
