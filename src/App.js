import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import OrderItems from "./Pages/OrderItems";
import ProDetails from "./Pages/ProDetails";
import Register from "./Pages/Register";

function App() {
  return (
    <>
      <div className="App"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path="/product-details/:id" element={<ProDetails />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/orders" element={<OrderItems/>}/>
      </Routes>
    </>
  );
}

export default App;
