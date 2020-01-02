import React, { Component } from "react";
import PropTypes from "prop-types";

class User extends Component {
  render() {
    let { props } = this;

    return (
      <div className="user">
        <div className="user__image">
          <img src={props.avatar} alt="" />
        </div>
        <h4 className="user__name">{props.name}</h4>
      </div>
    );
  }
}

User.propTypes = {
  name: PropTypes.string.isRequired,
};

export default User;
