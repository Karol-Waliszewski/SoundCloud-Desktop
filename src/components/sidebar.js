import React, { Component } from "react";

class Sidebar extends Component {
  render() {
    return (
      <nav className="sidebar">
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <a href="" className="sidebar__link active">
              Overview
            </a>
          </li>
          <li className="sidebar__item">
            <a href="" className="sidebar__link">
              Likes
            </a>
          </li>
          <li className="sidebar__item">
            <a href="" className="sidebar__link">
              Playlists
            </a>
          </li>
          <li className="sidebar__item">
            <a href="" className="sidebar__link">
              Stations
            </a>
          </li>
          <li className="sidebar__item">
            <a href="" className="sidebar__link">
              Albums
            </a>
          </li>
          <li className="sidebar__item">
            <a href="" className="sidebar__link">
              Followings
            </a>
          </li>
          <li className="sidebar__item">
            <a href="" className="sidebar__link">
              History
            </a>
          </li>
        </ul>

        <ul className="sidebar__list">
          <li className="sidebar__item">
            <a href="" className="sidebar__link">
              About
            </a>
          </li>
          <li className="sidebar__item">
            <a href="" className="sidebar__link">
              Support
            </a>
          </li>
          <li className="sidebar__item">
            <a href="" className="sidebar__link">
              Settings
            </a>
          </li>
          <li className="sidebar__item">
            <a href="" className="sidebar__link">
              Sign out
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Sidebar;
