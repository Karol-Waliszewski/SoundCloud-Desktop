import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Sidebar extends Component {
  render() {
    return (
      <nav className="sidebar">
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <NavLink
              to="/"
              className="sidebar__link"
              activeClassName="active"
              exact={true}
            >
              Overview
            </NavLink>
          </li>
          <li className="sidebar__item">
            <NavLink
              to="/likes"
              className="sidebar__link disabled"
              activeClassName="active"
            >
              Likes
            </NavLink>
          </li>
          <li className="sidebar__item">
            <NavLink
              to="/playlists"
              className="sidebar__link disabled"
              activeClassName="active"
            >
              Playlists
            </NavLink>
          </li>
          <li className="sidebar__item">
            <NavLink
              to="/stations"
              className="sidebar__link disabled"
              activeClassName="active"
            >
              Stations
            </NavLink>
          </li>
          <li className="sidebar__item">
            <NavLink
              to="/albums"
              className="sidebar__link disabled"
              activeClassName="active"
            >
              Albums
            </NavLink>
          </li>
          <li className="sidebar__item">
            <NavLink
              to="/followings"
              className="sidebar__link disabled"
              activeClassName="active"
            >
              Followings
            </NavLink>
          </li>
          <li className="sidebar__item ">
            <NavLink
              to="/history"
              className="sidebar__link disabled"
              activeClassName="active"
            >
              History
            </NavLink>
          </li>
        </ul>

        <ul className="sidebar__list">
          <li className="sidebar__item">
            <NavLink to="/about" className="sidebar__link">
              About
            </NavLink>
          </li>
          <li className="sidebar__item">
            <NavLink to="/settings" className="sidebar__link disabled">
              Settings
            </NavLink>
          </li>
          <li className="sidebar__item">
            <NavLink to="/singout" className="sidebar__link disabled">
              Sign out
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Sidebar;
