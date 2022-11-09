import React, { useState } from "react";
import styles from "../styles/Contact.module.css";

const Contact = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [desc, setdesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { phone, name, email, desc };

    fetch("http://localhost:3000/api/postcontact", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((data) => {
        alert("Thanks for contacting us");
        setphone("");
        setname("");
        setdesc("");
        setemail("");
      })
      .catch((error) => {
      });
  };
  const handleChange = (e) => {
    if (e.target.name == "phone") {
      setphone(e.target.value);
    } else if (e.target.name == "email") {
      setemail(e.target.value);
    } else if (e.target.name == "desc") {
      setdesc(e.target.value);
    } else if (e.target.name == "name") {
      setname(e.target.value);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1>Contact Us</h1>
          <div className={styles.mb3}>
            <label htmlFor="name" className={styles.formlabel}>
              Full name
            </label>
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={handleChange}
              id="name"
              name="name"
              aria-describedby="emailHelp"
            />
          </div>
          <div className={styles.mb3}>
            <label htmlFor="email" className={styles.formlabel}>
              Email address
            </label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={handleChange}
              name="email"
              id="email"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className={styles.formtext}>
              We will never share your email with anyone else.
            </div>
          </div>
          <div className={styles.mb3}>
            <label htmlFor="phone" className={styles.formlabel}>
              Phone Number
            </label>
            <input
              className={styles.input}
              type="phone"
              value={phone}
              onChange={handleChange}
              name="phone"
              id="phone"
              required
            />
          </div>
          <div className={styles.mb3}>
            <label className={styles.formlabel} htmlFor="desc">
              Elaborate your concern
            </label>
            <textarea
              className={styles.input}
              value={desc}
              onChange={handleChange}
              name="desc"
              id="desc"
            />
          </div>
          <div className={styles.btndiv}>
            <button type="submit" className={styles.btn}>
              Submit
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Contact;
