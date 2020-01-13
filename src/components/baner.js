import React, { Component } from "react";
import PropTypes from "prop-types";

class Baner extends Component {
  render() {
    let { props } = this;

    return (
      <div className="baner">
        <div
          className="baner__background"
          style={{ backgroundImage: `url(${props.avatar})` }}
        ></div>
        <div className="baner__info">
          <div className="baner__avatar">
            <img src={props.avatar} alt="" />
          </div>
          <div className="baner__text">
            <h4 className="baner__username">{props.username}</h4>
            {props.name && <h5 className="baner__additional">{props.name}</h5>}
            {props.country && (
              <p className="baner__additional">{props.country}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Baner.propTypes = {
  username: PropTypes.string.isRequired,
  name: PropTypes.string,
  country: PropTypes.string,
  avatar: PropTypes.string,
  background: PropTypes.string
};

export default Baner;
