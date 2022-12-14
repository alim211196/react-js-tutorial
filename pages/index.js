import Head from "next/head";
import styles from "../styles/Home.module.css";
import Script from "next/script";
import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Navbar from "../component/Navbar";
export default function Home(props) {
  const [blogs, setBlogs] = useState(props.allBlogs);

  const [count, setCount] = useState(3);

  const fetchData = async () => {
    let d = await fetch(`http://localhost:3000/api/blogs/?count=${count + 3}`);
    setCount(count + 3);
    let data = await d.json();
    setBlogs(data);
  };

  const handleChange = () => {
    if (typeof window !== "undefined") {
      window.location = "/docs";
    }
  };
  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <Head>
            <title> ReactJS Tutorial</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/logo4.jpg" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
          </Head>
          <Script src="https://example.com/script.js" />
          <div className={styles.myImg}>
            <h1 className={styles.blogItemh3}>Learn About React.js</h1>

            <div className={styles.blogdiv}>
              <p>
                ReactJS is a declarative, efficient, and flexible JavaScript
                library for building reusable UI components. It is an
                open-source, component-based front end library responsible only
                for the view layer of the application. It was created by Jordan
                Walke, who was a software engineer at Facebook. It was initially
                developed and maintained by Facebook and was later used in its
                products like WhatsApp & Instagram. Facebook developed ReactJS
                in 2011 in its newsfeed section, but it was released to the
                public in the month of May 2013.
              </p>
              <div className={styles.btnclass}>
                {" "}
                <button onClick={handleChange} className={styles.btn}>Get Started</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
