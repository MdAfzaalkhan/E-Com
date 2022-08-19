import { AppBar, Badge, Button, IconButton, Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Logo from "../Images/FlipkartLogo.png";
import "./nav.css";
import Drawers from "./Drawer";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { auth } from "../Pages/firebaseconfig";
import { signOut } from "firebase/auth";

const Nav = ({ userState }) => {
  const mediaTheme = useTheme();
  const isMatch = useMediaQuery(mediaTheme.breakpoints.down("md")); // ismatch will return boolean value when screen size is reduced it will show true else it wil be false
  const cartNumber = useSelector((state) => state.cartItem);
  const Signout = () => {
    signOut(auth)
      .then(() => {
        alert("success");
      })
      .catch((error) => {
        alert("Error");
      });
  };

  return (
    <>
      <AppBar sx={{ zIndex: "1" }}>
        <Toolbar
          className="toolbar"
          sx={{
            background: "#000",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Link to={"/"}>
            <img className="image" src={Logo} alt="Logo" />
          </Link>
          {isMatch ? (
            <>
              <Drawers />
            </>
          ) : (
            <div className="search-tabs">
              <section className="search-btn">
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search for products, brands and more"
                />
                <IconButton>
                  <SearchIcon color="primary" />
                </IconButton>
              </section>
              <section className="tabs">
                {userState ? (
                  <Link to={"/login"} style={{ textDecoration: "none" }}>
                    <Button variant="contained">Login</Button>
                  </Link>
                ) : (
                  <p style={{ marginTop: "7px" }}>{userState}</p>
                )}
                <Link
                  to={"/cart"}
                  className="cart-logo"
                  style={{ textDecoration: "none" }}
                >
                  <IconButton>
                    <Badge badgeContent={cartNumber.length} color="primary">
                      <ShoppingCartIcon color="primary" />
                    </Badge>
                    <span className="cart" style={{ marginLeft: "5px" }}>
                      Cart
                    </span>
                  </IconButton>
                </Link>
                <IconButton onClick={Signout}>
                  <LogoutIcon color="primary" />
                </IconButton>
              </section>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Nav;
