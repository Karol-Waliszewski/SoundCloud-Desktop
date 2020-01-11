import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Actions
import { ADD_AND_PLAY_TRACK, ADD_TO_QUEUE } from "../actions/playerActions";

class Track extends Component {
  playTrack() {
    let { props } = this;
    if (props.id) {
      props.playTrack(props.id, true);
    }
  }

  render() {
    let { props } = this;

    return (
      <div className="track">
        <div className="track__image" onClick={this.playTrack.bind(this)}>
          <img src={props.image} alt="" />
        </div>
        <h4 className="track__title" onClick={this.playTrack.bind(this)}>
          {props.title}
        </h4>
        <p className="track__author">{props.author}</p>
      </div>
    );
  }
}

Track.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  playTrack: (id, play) => {
    dispatch(ADD_AND_PLAY_TRACK(id, play));
  },
  addToQueue: id => {
    dispatch(ADD_TO_QUEUE(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Track);
