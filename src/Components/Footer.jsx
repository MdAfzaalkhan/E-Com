import React from "react";

const Footer = () => {
  return (
    <>
      <div
        className="footer-wrapper"
        style={{
          textAlign: "center",
          padding: "40px 0",
          backgroundColor: "black",
          color: "azure",
          position:"relative",
          bottom:"0",
          right:"0",
          left:"0"
        }}
      >
        &copy; 2022{" "}
        <span
          style={{
            color: "burlywood",
            fontFamily: "cursive",
            fontSize: "larger",
          }}
        >
          Dummy Flipkart
        </span>{" "}
        All rights reserved.
      </div>
    </>
  );
};

export default Footer;
