import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Carousel from "../Components/Carousel";
import CategoryBarr from "../Components/CategoryBarr";
import Footer from "../Components/Footer";
import Nav from "../Components/Nav";
import Offers from "../Components/Offers";

function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [bestPrice, setBestPrice] = useState([]);
  const [bestDiscounts, setBestDiscounts] = useState([]);
  const [highRating, setHighRating] = useState([]);
  const [fastSelling, setFastSelling] = useState([]);
  const {state} = useLocation();
  // console.log(state);

  const productsApi = () => {
    axios
      .get("https://dummyjson.com/products?limit=100")
      .then((response) => {
        setAllProducts(response.data.products);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const filteredProducts = () => {
    let price = allProducts.filter((item) => {
      return item.price > 400 && item.price < 800;
    });
    setBestPrice([...price]);

    let discounts = allProducts.filter((item) => {
      return item.discountPercentage > 17;
    });
    setBestDiscounts([...discounts]);

    let rating = allProducts.filter((item) => {
      return item.rating > 4.9;
    });
    setHighRating([...rating]);

    let selling = allProducts.filter((item) => {
      return item.stock < 20;
    });
    setFastSelling([...selling]);
  };
  useEffect(() => {
    productsApi();
  }, []);
  useEffect(() => {
    filteredProducts();
  }, [allProducts])
  

  return (
    <>
      <div>
        <Nav userState = {state} />
        <CategoryBarr />
        <Carousel />
        <Offers bestPrice={bestPrice} offerTitle={"Best Price For Today"}/>
        <Offers bestPrice={bestDiscounts} offerTitle={"Best Discounts For You"}/>
        <Offers bestPrice={highRating} offerTitle={"Top rated Products"}/>
        <Offers bestPrice={fastSelling} offerTitle={"Fast Selling"}/>
        <Footer/>

      </div>
    </>
  );
}

export default Home;
