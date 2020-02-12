import React from "react";
import { NavLink } from "react-router-dom";

const ProfileNav = ({ match }) => (
  <nav className="profile-nav">
    <NavLink
      className="profile-nav__link"
      activeClassName="active"
      exact={true}
      to={"/profile/" + match.params.username}
    >
      Overview
    </NavLink>
    <NavLink
      className="profile-nav__link"
      activeClassName="active"
      to={"/profile/" + match.params.username + "/tracks"}
    >
      Tracks
    </NavLink>
    <NavLink
      className="profile-nav__link"
      activeClassName="active"
      to={"/profile/" + match.params.username + "/playlists"}
    >
      Playlists
    </NavLink>
    <NavLink
      className="profile-nav__link"
      activeClassName="active"
      to={"/profile/" + match.params.username + "/followings"}
    >
      Followings
    </NavLink>
    <NavLink
      className="profile-nav__link"
      activeClassName="active"
      to={"/profile/" + match.params.username + "/followers"}
    >
      Followers
    </NavLink>
    <NavLink
      className="profile-nav__link"
      activeClassName="active"
      to={"/profile/" + match.params.username + "/likes"}
    >
      Favourites
    </NavLink>
  </nav>
);

export default ProfileNav;
