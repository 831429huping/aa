import React from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import "./HeaderStyle.scss";
import { Link } from "react-router-dom";
import { firebaseAuth } from "../../firebase/firebaseUtil";

const Header = ({ currentUser }) => (
  <div className="header">
    <div className="logo-container">
      <Link to="/">
        <Logo></Logo>
      </Link>
    </div>
    <div className="options">
      <Link to="/shop" className="option">
        SHOP
      </Link>
      <Link to="/contact" className="option">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => firebaseAuth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link to="/signin" className="option">
          SIGN IN
        </Link>
      )}
    </div>
  </div>
);
export default Header;
