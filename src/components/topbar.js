import React, { Component } from "react";
import Search from "./search";

import logo from "../assets/soundcloud.svg";

class Topbar extends Component {
  render() {
    return (
      <nav className="topbar">
        <h1 className="topbar__logo">
          <a href="/">
            <img src={logo} alt="soundcloud logo" />
          </a>
        </h1>
        <div className="topbar__search">
          <Search></Search>
        </div>
        <a href="" className="topbar__account">
          <img src="" alt="user's avatar" />
        </a>
      </nav>
    );
  }
}

export default Topbar;
