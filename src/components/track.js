import React, { Component } from "react";
import PropTypes from "prop-types";

class Track extends Component {
  render() {
    let { props } = this;

    return (
      <div className="track">
        <div className="track__image">
          <img src={props.image} alt="" />
        </div>
        <h4 className="track__title">{props.title}</h4>
        <p className="track__author">{props.author}</p>
      </div>
    );
  }
}

Track.propTypes = {
  name: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string
};

export default Track;
