import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./prodetail.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import StarIcon from "@mui/icons-material/Star";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Nav from "../Components/Nav";
import { Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { cartManipulate } from "../Redux/Cart-redux/Action";
import { ADD_TO_CART } from "../Redux/Cart-redux/Action-type";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const ProDetails = () => {
  const [productDetail, setProductDetail] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const [goToCartbtn, setGoToCardBtn] = useState(false);
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cartItem);

  const singleProductApi = () => {
    axios
      .get(`https://dummyjson.com/products/${params.id}`)
      .then((prod) => {
        setProductDetail(prod.data);
        console.log(prod.data);
      })
      .catch((err) => {
        console.log("error");
      });
  };

  useEffect(() => {
    singleProductApi();
  }, []);

  useEffect(() => {
    // here we are checking if that particular item is added in cart then chng the btn to go to cart
    if (cartItem.filter((item) => item.id === productDetail.id).length) {
      setGoToCardBtn(true);
    } else {
      setGoToCardBtn(false);
    }
  }, [cartItem,productDetail]);
  const addToCart = () => {

    dispatch(cartManipulate(ADD_TO_CART, productDetail));
  };
  const handleGoToCart = () => {
    navigate("/cart");
  };

  return (
    <>
      <Nav />
      <div className="prod-detail-wrapper">
        <div className="left-carousel">
          <Carousel className="carousel">
            {productDetail?.images?.map((item, index) => {
              return (
                <section key={index}>
                  <img src={item} />
                </section>
              );
            })}
          </Carousel>
        </div>
        <div className="right-info">
          <h1>{productDetail?.title}</h1>
          <h3>Special price</h3>
          <p>
            <CurrencyRupeeIcon fontSize="smaller" />
            {productDetail?.price}
            <span className="discount-prod">
              {productDetail?.discountPercentage}%
            </span>
          </p>
          <span className="star-prod">
            {productDetail?.rating}
            <StarIcon fontSize="smaller" />
          </span>
          <h4>Available Offers</h4>
          <ul>
            <li>
              <LocalOfferIcon color="success" fontSize="smaller" /> Special
              PriceGet extra 14% off (price inclusive of cashback/coupon)
            </li>
            <li>
              <LocalOfferIcon color="success" fontSize="smaller" /> Combo
              OfferBuy 2 items save 5%; Buy 3 or more save 10%
            </li>
            <li>
              <LocalOfferIcon color="success" fontSize="smaller" /> Bank
              Offer10% off on Citi Credit and Debit Cards, up to ₹3,000. On
              orders of ₹1,500 and above
            </li>
          </ul>
          <span className="description">
            <span>
              <b> Description :</b>
            </span>
            <span>{productDetail?.description}</span>
            <p>*Hurry Only {productDetail?.stock} items left</p>
          </span>
          <div className="buttons-prod">
            {goToCartbtn ? (
              <Button
                variant="contained"
                sx={{ width: "40%", background: "orangered" }}
                onClick={handleGoToCart}
              >
                <ShoppingCartCheckoutIcon /> Go TO Cart
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{ width: "40%", background: "orangered" }}
                onClick={addToCart}
              >
                <AddShoppingCartIcon /> Add to Cart
              </Button>
            )}

            <Button
              variant="outlined"
              sx={{
                width: "40%",
                color: "orangered",
                border: "1px solid orangered",
              }}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProDetails;
