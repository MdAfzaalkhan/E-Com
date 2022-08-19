import React from "react";
import StarIcon from "@mui/icons-material/Star";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import "./Offers.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Offers = ({ bestPrice, offerTitle }) => {
  // console.log(bestPrice)
  return (
    <div className="offer-wrap">
      <section className="offer-up">
        <h1 className="text-offer">{offerTitle}</h1>

        <Button variant="contained">View More</Button>
      </section>
      <section className="card-wrap">
        {/* <section className="text-offer"></section> */}
        {bestPrice?.map((item, index) => {
          return (
            <Link to={`/product-details/${item.id}`} className="offer-card" key={index}>
              <img src={item.thumbnail} alt="Product thumb" />
              <p>{item.title}</p>
              <section className="rating-offer">
                {item.rating}
                <StarIcon fontSize="smaller" />
              </section>
              <span className="price-offer">
                <span className="rate-offer">
                  <AttachMoneyIcon fontSize="smaller" />
                  {item.price}
                </span>
                <span className="disc-offer">
                  {item.discountPercentage}% Off
                </span>
              </span>
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default Offers;
