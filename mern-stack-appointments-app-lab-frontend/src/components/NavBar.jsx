import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "./context/user";

const NavBar = (props) => {
  const { accessToken, setAccessToken } = useContext(UserContext);
  return (
    <>
      <ul className="navBar">
        <li>
          {props.showLogin && accessToken.length === 0 && (
            <Link to="/" onClick={() => props.setShowLogin(false)}>
              Register
            </Link>
          )}
        </li>
        <li>
          {!props.showLogin && accessToken.length === 0 && (
            <Link to="/" onClick={() => props.setShowLogin(true)}>
              Login
            </Link>
          )}
        </li>
        <li>
          {accessToken.length > 0 && (
            <Link to="/addappt">Add new appointment</Link>
          )}
        </li>
        <li>
          {accessToken.length > 0 && <Link to="/apptlist">Dashboard</Link>}
        </li>
        <li>
          {accessToken.length > 0 && (
            <Link to="/" onClick={() => setAccessToken("")}>
              Logout
            </Link>
          )}
        </li>
      </ul>
    </>
  );
};

export default NavBar;
