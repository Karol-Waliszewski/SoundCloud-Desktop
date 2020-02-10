import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class User extends Component {
  render() {
    let { props } = this;

    return (
      <div className="user">
        <Link to={`/profile/${props.id}`} className="user__image">
          <img src={props.avatar_url.replace("large", "t300x300")} alt="" />
        </Link>
        <Link to={`/profile/${props.id}`}  className="user__name">
          <h4>{props.username}</h4>
        </Link>
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
