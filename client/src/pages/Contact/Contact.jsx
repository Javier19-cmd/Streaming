import React, { useEffect } from "react";
import NavBar from "../../components/Navbar";
import "./Contact.css";

const Contact = () => {
  useEffect(() => {
    document.body.style.removeProperty("background-color");
    document.body.style.removeProperty("background-image");
  }, []);
  return (
    <React.Fragment>
        <NavBar />
    <div className="form-container" style={{ maxWidth: "800px" }}>
      <h1 className="main-h1">Charts</h1>
      <div style={{ display: "flex", justifycontent: "center" }}>
        <iframe
          style={{
            background: "#21313C",
            border: "none",
            borderRadius: "2px",
            boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
          }}
          width="640"
          height="480"
          src="https://charts.mongodb.com/charts-project-0-mzpih/embed/charts?id=63eac9f3-0a6e-4598-8df0-348c0360314b&maxDataAge=3600&theme=dark&autoRefresh=true"
        />
      </div>
    </div>
    </React.Fragment>
  );
};

export default Contact;
