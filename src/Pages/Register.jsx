import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./reg.css";
import { auth } from "./firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mobNo, setMobNo] = useState("");
  const [pass, setPass] = useState("");
  const [user, setUser] = useState(false);
  const [err, setErr] = useState("");
  const [authentication, setAuthentication] = useState({
    isEmailValid: true,
    isPassValid: true,
  });

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const emailValidation = () => {
    if (emailRegex.test(email)) {
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
    if (passRegex.test(pass)) {
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
  const navigate = useNavigate();
  const registration = () => {
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        console.log(userCredential.user);
        setUser(true);
        navigate("/login");
        setUserName("");
        setEmail("");
        setMobNo("");
        setPass("");
      })
      .catch((err) => {
        console.log(err.code);
        setErr(err.code);
      });
    // if (user) {

    // }
   
  };
  return (
    <>
      <div className="reg-wrapper">
        <div className="reg-wrap">
          <section className="left">
            <Typography
              variant="h4"
              sx={{
                mt: "2rem",
                color: "whitesmoke",
                textAlign: "left",
                ml: "1rem",
              }}
            >
              Looks like you're new here!
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                mt: "1rem",
                color: "whitesmoke",
                textAlign: "left",
                ml: "1rem",
              }}
            >
              Sign up with your Email & Mobile number to get Started
            </Typography>
          </section>
          <section className="right">
            <TextField
              label={"Username"}
              type={"text"}
              sx={{ width: "70%" }}
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <Typography
              variant="caption"
              sx={{ mb: "1rem", color: "lightgray" }}
            >
              *Username Must be more than 3 characters
            </Typography>
            <TextField
              label={"Email"}
              sx={{ mb: "1rem", width: "70%" }}
              type={"email"}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              error={!authentication.isEmailValid}
              helperText={!authentication.isEmailValid && "Invalid Email"}
              onBlur={emailValidation}
            />
            <TextField
              label={"Mobile No."}
              sx={{ mb: "1rem", width: "70%" }}
              type={"number"}
              value={mobNo}
              onChange={(e) => {
                setMobNo(e.target.value);
              }}
            />
            <TextField
              label={"Password"}
              sx={{ width: "70%" }}
              type={"password"}
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
              }}
              error={!authentication.isPassValid}
              helperText={!authentication.isPassValid && "Invalid Password"}
              onBlur={passValidation}
            />
            <Typography
              variant="caption"
              sx={{ mb: "1rem", color: "lightgray" }}
            >
              *Password must be atleast 8 characters
            </Typography>
            <Button
              variant="contained"
              sx={{ background: "#fb641b" }}
              disabled={!userName || !email || !pass || !mobNo}
              onClick={registration}
            >
              Submit
            </Button>
            <Typography variant="caption" sx={{ color: "red" }}>
              {user ? "Registration successful" : err}
            </Typography>
            <Typography variant="caption" sx={{ mt: "1rem" }}>
              Already have an account?{" "}
              <Link style={{ textDecoration: "none" }} to={"/login"}>
                SignIn
              </Link>
            </Typography>
          </section>
        </div>
      </div>
    </>
  );
}

export default Register;
