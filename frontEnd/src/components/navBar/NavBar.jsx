// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // For route navigation
import { HashLink } from "react-router-hash-link"; // For smooth in-page scrolling
import "./Navbar.css";
import { assets } from "../assets/assets";
import { StoreContext } from "../Context/StoreContext";


const Navbar = ({ setShowLogin }) => {
  const [menu, setmenu] = useState("menu");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }
  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => {
            setmenu("home");
          }}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <HashLink
          smooth
          to="#explore-menu"
          onClick={() => {
            setmenu("menu");
          }}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </HashLink>
        <HashLink
          smooth
          to="#app-download"
          onClick={() => {
            setmenu("mobile-app");
          }}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </HashLink>
        <HashLink
          smooth
          to="#footer"
          onClick={() => {
            setmenu("contact-us");
          }}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </HashLink>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" />
        <div className="navbar-search_icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Basket" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

