import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../Images/FlipkartLogo.png";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const OrderItems = () => {
  const orderItems = useSelector((state) => state.orderItems);
  console.log(orderItems)
  return (
    <>
      <div className="order-wrap">
        <div
          style={{
            backgroundColor: "black",
            padding: "15px 20px",
            boxShadow: "5px 0px 5px 5px lightGray",
          }}
        >
          <Link to="/">
            <img src={logo} width="100px" />
          </Link>
        </div>
        {orderItems?.map((item, index) => {
          return (
            <section key={index}>
              <Card
                sx={{
                  display: "flex",
                  padding: "2rem",
                  position: "relative",
                  mb: "10px",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={item.thumbnail}
                  alt="Product Thumbnail"
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    height: "22vh",
                  }}
                >
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography
                      variant="h5"
                      sx={{ textTransform: "uppercase" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="subtitle1">{item.brand}</Typography>
                    <Typography
                      sx={{
                        mt: "20px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <AttachMoneyIcon fontSize="smaller" />
                      {item.price}
                      <Typography
                        variant="caption"
                        sx={{ color: "#26a541", ml: "10px" }}
                      >
                        {item.discountPercentage}%
                      </Typography>
                    </Typography>
                    <span>
                    </span>
                  </CardContent>
                </Box>
              </Card>
            </section>
          );
        })}
      </div>
    </>
  );
};

export default OrderItems;
