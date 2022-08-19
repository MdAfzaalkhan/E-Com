import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
// import { Route, Routes } from "react-router-dom";

import { auth } from "./firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [authentication, setAuthentication] = useState({
    isEmailValid: true,
    isPassValid: true,
  });
  const navigate = useNavigate();
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const emailValidation = () => {
    if (emailRegex.test(login.email)) {
      setAuthentication((prevState) => ({
        ...prevState,
        isEmailValid: true,
      }));
    } else {
      setAuthentication((prevState) => ({
        ...prevState,
        isEmailValid: false,
      }));
    }
  };

  const passValidation = () => {
    if (passRegex.test(login.password)) {
      setAuthentication((prevState) => ({
        ...prevState,
        isPassValid: true,
      }));
    } else {
      setAuthentication((prevState) => ({
        ...prevState,
        isPassValid: false,
      }));
    }
  };

  const loginAuthentication = () => {
    signInWithEmailAndPassword(auth, login.email, login.password)
      .then((userInfo) => {
        console.log(userInfo);
        navigate("/", { replace: true, state: userInfo.user.email });
        setLogin({
          email: "",
          password: "",
        });
      })
      .error((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <div className="main-wrap">
        <div className="login-wrap">
          <section className="left">
            <p className="left-login">Login</p>
            <p className="left-txt">
              Get Access to your Orders, <br /> Wishlists and Recommendations
            </p>
          </section>
          <section className="right">
            <TextField
              error={!authentication.isEmailValid}
              helperText={!authentication.isEmailValid && "Invalid Email"}
              onBlur={emailValidation}
              type={"email"}
              label="Email"
              value={login.email}
              sx={{ marginBottom: "1rem", width: "60%" }}
              onChange={(e) => {
                setLogin((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }));
              }}
            />
            <TextField
              error={!authentication.isPassValid}
              helperText={!authentication.isPassValid && "Invalid Password"}
              onBlur={passValidation}
              type={"password"}
              label="Password"
              value={login.password}
              sx={{ marginBottom: "1rem", width: "60%" }}
              onChange={(e) =>
                setLogin((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
            />
            <Link
              to={"/login"}
              style={{
                marginBottom: "1rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              Forgot Password?
            </Link>
            <Button
              sx={{ marginBottom: "1rem", background: "#fb641b" }}
              variant={"contained"}
              disabled={!authentication.isEmailValid || !authentication.isPassValid}
              onClick={loginAuthentication}
            >
              Login
            </Button>

            <Typography variant="caption">
              Don't have an Account?{" "}
              <Link to={"/register"} style={{ textDecoration: "none" }}>
                SignUp
              </Link>
            </Typography>
          </section>
        </div>
      </div>
    </>
  );
}

export default Login;
