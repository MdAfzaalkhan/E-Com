import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Fade,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux/es/exports";
import logo from "../Images/FlipkartLogo.png";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { cartManipulate } from "../Redux/Cart-redux/Action";
import EmptyCart from "../Images/Empty Cart.webp";
import "./cart.css";
import {
  EMPTY_CART,
  ORDER_ITEMS,
  REMOVE_ITEM,
  UPDATE_QTY,
} from "../Redux/Cart-redux/Action-type";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItem = useSelector((state) => state.cartItem);
  const dispatch = useDispatch();
  const [totalCal, setTotalCal] = useState({
    price: 0.0,
    discount: 0.0,
    deliveryCharge: 4,
    total: 0.0,
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "white",
    color: "black",
    boxShadow: 24,
    padding: 4,
  };
  const [addressData, setAddressData] = useState({
    name: "",
    number: "",
    pinCode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (cartItem.length) {
      cartItem.map((item) => {
        return (item.qty = 1);
      });
    }
  }, []);
  useEffect(() => {
    if (cartItem.length) {
      var totalTemp = 0;
      var priceTemp = 0;
      var discountTemp = 0;

      cartItem.map((item) => {
        discountTemp =
          (discountTemp + (item.price * item.discountPercentage) / 100) *
          item.qty;
        totalTemp = (totalTemp + item.price) * item.qty;
        priceTemp = (totalTemp + discountTemp) * item.qty;
      });

      setTotalCal((prevState) => ({
        ...prevState,
        price: Math.floor(priceTemp).toFixed(2),
        discount: Math.floor(discountTemp).toFixed(2),
        total: Math.floor(totalTemp).toFixed(2),
      }));
    }
    console.log(cartItem);
  }, [cartItem]);

  const removeItemCart = (item) => {
    dispatch(cartManipulate(REMOVE_ITEM, item.id));
  };

  const handleUpdateQty = (index, isIncrease) => {
    var tempData = cartItem;
    if (isIncrease) {
      tempData[index].qty = tempData[index].qty + 1;
    } else {
      if (tempData[index].qty > 1) {
        tempData[index].qty = tempData[index].qty - 1;
      } else {
        removeItemCart(tempData[index]);
        return;
      }
    }
    dispatch(cartManipulate(UPDATE_QTY, tempData));
  };

  const placeOrder = () => {
    dispatch(cartManipulate(ORDER_ITEMS, ...cartItem));
    dispatch(cartManipulate(EMPTY_CART));
    navigate("/orders");
  };

  return (
    <>
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
      {cartItem.length === 0 ? (
        <div
          style={{ textAlign: "center", lineHeight: "50px", marginTop: "30px" }}
        >
          <img src={EmptyCart} width={"250px"} />
          <p style={{ fontSize: "40px", fontFamily: "initial" }}>
            Your Cart is empty
          </p>
          <p>Add Items Now</p>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Button variant="contained">Shop Now</Button>
          </Link>
        </div>
      ) : (
        <div
          className="cart-wrapper"
          style={{
            marginTop: "100px",
            marginLeft: "50px",
          }}
        >
          <section className="left-cards" style={{ width: "60%" }}>
            {cartItem?.map((item, index) => {
              return (
                <Card
                  key={index}
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
                        <Button>Save For Later</Button>
                        <Button onClick={() => removeItemCart(item)}>
                          Remove
                        </Button>
                      </span>
                    </CardContent>

                    <CardContent
                      sx={{ position: "absolute", right: "0", bottom: "5px" }}
                    >
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <IconButton onClick={() => handleUpdateQty(index)}>
                          <RemoveIcon />
                        </IconButton>
                        <p style={{ fontSize: "25px" }}>{item.qty}</p>

                        <IconButton
                          onClick={() => handleUpdateQty(index, true)}
                        >
                          <AddIcon />
                        </IconButton>
                      </span>
                    </CardContent>
                  </Box>
                </Card>
              );
            })}
          </section>
          <section
            className="right-price"
            style={{
              width: "30%",
              padding: "1rem",
              position: "fixed",
              top: "80px",
              right: "50px",
            }}
          >
            <Paper sx={{ padding: "15px" }}>
              <Box>
                <Typography
                  variant="h4"
                  sx={{ borderBottom: "1px solid lightgray", color: "gray" }}
                >
                  PRICE DETAILS
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ mt: "10px", mb: "20px", fontFamily: "sans-serif" }}
                >
                  Price({cartItem.length}Item)
                  <span style={{ float: "right" }}>
                    <AttachMoneyIcon fontSize="smaller" />
                    {+totalCal.price}
                  </span>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ mb: "20px", fontFamily: "sans-serif" }}
                >
                  Delivery Charges
                  <span style={{ float: "right", color: "green" }}>FREE</span>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ mb: "20px", fontFamily: "sans-serif" }}
                >
                  Discount
                  <span style={{ float: "right" }}>{totalCal.discount}</span>
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mt: "70px",
                    borderTop: "1px dotted lightgray",
                    paddingTop: "10px",
                    fontFamily: "sans-serif",
                  }}
                >
                  TOTAL AMOUNT
                  <span style={{ float: "right" }}>
                    <AttachMoneyIcon fontSize="smaller" />
                    {totalCal.total}
                  </span>
                </Typography>
              </Box>
            </Paper>
            <Button
              className="order-btn"
              sx={{
                background: "#fb641b",
                mt: "10px",
                padding: ".5rem 0",
                fontSize: "large",
              }}
              variant="contained"
              fullWidth
              onClick={handleOpen}
            >
              PLACE ORDER
            </Button>
          </section>
          <div>
            <Modal open={open} onClose={handleClose}>
              <Fade in={open}>
                <Box sx={style}>
                  <Typography
                    variant="h5"
                    sx={{
                      textAlign: "center",
                      fontFamily: "revert",
                      bgcolor: "#2874f0",
                      color: "white",
                      mb: "20px",
                      padding: "8px 0",
                    }}
                  >
                    Delivery Address
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "auto auto",
                      gap: "20px",
                      mb: "15px",
                    }}
                  >
                    <TextField
                      label="Name"
                      type={"text"}
                      onChange={(e) =>
                        setAddressData((prevState) => ({
                          ...prevState,
                          name: e.target.value,
                        }))
                      }
                    />
                    <TextField
                      label="Mobile Number"
                      type={"tel"}
                      onChange={(e) =>
                        setAddressData((prevState) => ({
                          ...prevState,
                          number: e.target.value,
                        }))
                      }
                    />
                    <TextField
                      label="PinCode"
                      type={"number"}
                      onChange={(e) =>
                        setAddressData((prevState) => ({
                          ...prevState,
                          pinCode: e.target.value,
                        }))
                      }
                    />
                    <TextField
                      label="Locality"
                      type={"text"}
                      onChange={(e) =>
                        setAddressData((prevState) => ({
                          ...prevState,
                          locality: e.target.value,
                        }))
                      }
                    />
                  </Box>
                  <TextField
                    label="Address(Area and Street)"
                    fullWidth
                    sx={{ mb: "15px" }}
                    type={"text"}
                    onChange={(e) =>
                      setAddressData((prevState) => ({
                        ...prevState,
                        address: e.target.value,
                      }))
                    }
                  />
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "auto auto",
                      gap: "20px",
                    }}
                  >
                    <TextField
                      label="City/District/Town"
                      type={"text"}
                      onChange={(e) =>
                        setAddressData((prevState) => ({
                          ...prevState,
                          city: e.target.value,
                        }))
                      }
                    />
                    <TextField
                      label="State"
                      type={"text"}
                      onChange={(e) =>
                        setAddressData((prevState) => ({
                          ...prevState,
                          state: e.target.value,
                        }))
                      }
                    />
                    <TextField
                      label="LandMark (Optional)"
                      type={"text"}
                      onChange={(e) =>
                        setAddressData((prevState) => ({
                          ...prevState,
                          landmark: e.target.value,
                        }))
                      }
                    />
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: "20px" }}
                    onClick={() => placeOrder()}
                    disabled={
                      !addressData.name ||
                      !addressData.address ||
                      !addressData.city ||
                      !addressData.pinCode ||
                      !addressData.number
                    }
                  >
                    SUBMIT
                  </Button>
                </Box>
              </Fade>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
