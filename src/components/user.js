import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class User extends Component {
  render() {
    let { props } = this;

    return (
      <div className="user">
        <Link to={`/profile/${props.id}`} className="user__image">
          <img src={props.avatar} alt="" />
        </Link>
        <Link to={`/profile/${props.id}`}  className="user__name">
          <h4>{props.name}</h4>
        </Link>
      </div>
    );
  }
}

User.propTypes = {
  name: PropTypes.string.isRequired
};

export default User;
