import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import One from "../Images/Two-carousel.webp";
import Two from "../Images/Five-carousel.webp";
import Three from "../Images/Four-carousel.webp";
import Four from "../Images/One-carousel.webp";
import Five from "../Images/Three-carousel.webp";
import Six from "../Images/six-carouse;.webp"

const Carousel = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const images = [Three, Two,One,Four,Five,Six];

  const goToPrev = () => {
    const length = images.length;
    setImgIndex(imgIndex === 0 ? +length - 1 : +imgIndex - 1);
    console.log(imgIndex);

  };
  const goToNext = () => {
    const length = images.length;
    let next = imgIndex === +length - 1 ? 0 : +imgIndex + 1;
    setImgIndex(next);
  };

  useEffect(() => {
    let interval = setInterval(() => {
      goToNext();
      clearInterval(interval);
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  }, [imgIndex]);

  return (
    <div className="carousel-wrap" style={{display:"flex",width:"100%"}}>
      <section className="left-arrow" style={{ position: "relative"}}>
        <IconButton
          sx={{
            position: "absolute",
            backgroundColor: "black",
            opacity: "0.3",
            color: "white",
            top: "6rem",
            left: "0",
            zIndex: "1",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          onClick={goToPrev}
        >
          <ArrowBackIosIcon fontSize="large" />
        </IconButton>
      </section>
      <section className="images">
        <img src={images[imgIndex]} alt="" width={"100%"} height={"100%"} />
      </section>
      <section className="right-arrow" style={{ position: "relative" }}>
        <IconButton
          sx={{
            position: "absolute",
            color: "white",
            backgroundColor: "black ",
            opacity: "0.3",
            top: "6rem",
            right: "0",
            zIndex: "1",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          onClick={goToNext}
        >
          <ArrowForwardIosIcon fontSize="large" />
        </IconButton>
      </section>
    </div>
  );
};

export default Carousel;
