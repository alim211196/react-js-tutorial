import * as fs from "fs";
import React, { useState } from "react";
import styles from "../styles/Docs.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import AccordionPage from "../component/AccordionPage";
import Fuse from "fuse.js";
import Link from "next/link";
import GetAppIcon from "@material-ui/icons/GetApp";
const Docs = (props) => {
  const [docs, setDocs] = useState(props.allDocs);
const [query, setQuery] = useState("");
  const [count, setCount] = useState(5);
 const [expanded, setExpanded] = React.useState(false);

 const handleChange = (panel) => (event, isExpanded) => {
   setExpanded(isExpanded ? panel : false);
 };

 const fuse = new Fuse(docs, {
   keys: ["title"],
   includeScore: true,
   threshold: 0.3,
 });
 const results = query ? fuse.search(query) : [];

 const newResults = query ? results.map((result) => result.item) : docs;
 function handleSearch({ currentTarget = [] }) {
   setQuery(currentTarget.value);
 }


  const fetchData = async () => {
    let d = await fetch(
      `http://localhost:3000/api/documents/?count=${count + 5}`
    );
    setCount(count + 5);
    let data = await d.json();
    setDocs(data);
  };
  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.search}>
            <h1 className={styles.center}>React JS Topics</h1>
            <div className={styles.mydiv}>
              <Link href="/docsFiles/Questions.docx" target="_blank" download>
                <button
                  className={styles.btncss}
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                >
                  <GetAppIcon /> Download Questions
                </button>
              </Link>{" "}
              <input
                className={styles.input}
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="search..."
                id="query"
                name="query"
              />
            </div>
          </div>

          <InfiniteScroll
            dataLength={docs.length} //This is important field to render the next data
            next={fetchData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {newResults &&newResults.length >0 ?
              newResults.map((item, index) => {
                return (
                  <div key={index}>
                    <AccordionPage
                      title={item.title}
                      subtitles={item.content}
                      filename={item.filename}
                      handleChange={handleChange}
                      expanded={expanded}
                    />
                  </div>
                );
              }):
              "No Record Found..."}
          </InfiniteScroll>
        </main>
      </div>
    </>
  );
};
export async function getServerSideProps(context) {
  let data = await fs.promises.readdir("docsDetails");
  let allCount = data.length;
  let myfile;
  let allDocs = [];
  for (let index = 0; index < 5; index++) {
    const item = data[index];
    myfile = await fs.promises.readFile("docsDetails/" + item, "utf-8");
    allDocs.push(JSON.parse(myfile));
  }

  return {
    props: { allDocs, allCount }, // will be passed to the page component as props
  };
}
export default Docs;
