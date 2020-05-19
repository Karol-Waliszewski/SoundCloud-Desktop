import React, { Component } from "react";
import { Link } from "react-router-dom";
import Search from "../components/search";

import logo from "../assets/soundcloud.svg";
import user from "../assets/user.svg";

class Topbar extends Component {
  render() {
    return (
      <nav className="topbar">
        <h1 className="topbar__logo">
          <Link to="/">
            <img src={logo} alt="soundcloud logo" />
          </Link>
        </h1>
        <div className="topbar__search">
          <Search></Search>
        </div>
        <Link to="/profile/someusername" className="topbar__account">
          <img src={user} alt="user's avatar" />
        </Link>
      </nav>
    );
  }
}

export default Topbar;
