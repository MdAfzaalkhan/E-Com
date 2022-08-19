// import axios from "axios";
import React from "react";
import Electronics from "../Images/Electronics-1.webp";
import men from "../Images/Fashion.webp";
import women from "../Images/Fashion.webp";
import other from "../Images/Grocery.webp";
import "./category.css";

const CategoryBarr = () => {
  let categories = [
    { img: Electronics, title: "Electronics" },
    { img: men, title: "Men" },
    { img: women, title: "Women" },
    { img: other, title: "Others" },
  ];

  return (

      <div
        className="category-wrapper"
        style={{
          marginTop: "4rem",
          backgroundColor: "#f1f2f6",
        }}
      >
        <section
          className="cards-category"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          {categories?.map((item, index) => {
            return (
              <>
                <section
                  key={index}
                  className="card-cat"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "1rem",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={item.img}
                    alt="logo"
                    style={{
                      width: "7rem",
                      height: "7rem",
                    }}
                  />
                  <span>{item.title}</span>
                </section>
              </>
            );
          })}
        </section>
      </div>
      );
};

export default CategoryBarr;
