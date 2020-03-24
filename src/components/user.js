import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Assets
import followIcon from "../assets/follow-outline.svg";
import followingIcon from "../assets/followed.svg";

class User extends Component {
  render() {
    let { props } = this;

    //TODO: following prop
    let followButton = false ? (
      <button className="user__following">
        <img src={followingIcon} alt="person with checkmark" />
        <span>Following</span>
      </button>
    ) : (
      <button className="user__follow">
        <img src={followIcon} alt="person with plus sign" />
        <span>Follow</span>
      </button>
    );

    return (
      <div className="user">
        <Link to={`/profile/${props.id}`} className="user__image">
          <img src={props.avatar_url.replace("large", "t300x300")} alt="" />
        </Link>
        <Link to={`/profile/${props.id}`} className="user__link">
          <h4 className="user__name">{props.username}</h4>
        </Link>
        {followButton}
      </div>
    );
  }
}

User.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  avatar_url: PropTypes.string.isRequired
};

export default User;
