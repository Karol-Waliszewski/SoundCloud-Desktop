import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Actions
import { PLAY_TRACK } from "../actions/playerActions";

// Assets
import dots from "../assets/dots.svg";
import { ReactComponent as PlayIcon } from "../assets/play.svg";

class Track extends Component {
  constructor() {
    super();

    this.state = { options: false };
  }

  playTrack() {
    let { props } = this;
    if (props.id) {
      props.playTrack(props.id, true);
    }
  }

  addToQueue() {
    let { props } = this;
    if (props.id) {
      props.addToQueue(props.id);
    }
    alert("TODO: add notification");
  }

  toggleOptions() {
    setTimeout(() => {
      this.setState({ options: !this.state.options });
    }, 100);
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  render() {
    let { props, state } = this;
    let image = props.artwork_url || props.user.avatar_url;
    if (typeof image == "string") {
      image = image.replace("large", "t300x300");
    }

    return (
      <div className="queueTrack">
        <button className="queueTrack__drag"></button>
        <div className="queueTrack__image" onClick={this.playTrack.bind(this)}>
          <img className="queueTrack__thumbnail" src={image} alt="" />
          <div className="queueTrack__hover">
            <button className="queueTrack__play">
              <PlayIcon className="queueTrack__icon"></PlayIcon>
            </button>
          </div>
        </div>
        <div className="queueTrack__data">
          <h4 className="queueTrack__title" onClick={this.playTrack.bind(this)}>
            {props.title}
          </h4>
          <Link className="queueTrack__author" to={`/profile/${props.user.id}`}>
            {props.user.username}
          </Link>
        </div>
        <div className="queueTrack__more">
          <button
            type="button"
            className="queueTrack__dots"
            title="More"
            onClick={this.stopPropagation}
            onFocus={this.toggleOptions.bind(this)}
            onBlur={this.toggleOptions.bind(this)}
          >
            <img src={dots} alt="3 dots" />
          </button>
          {state.options && (
            <ul className="queueTrack__options" onClick={this.stopPropagation}>
              <li>
                <button
                  className="queueTrack__option"
                  onClick={this.addToQueue.bind(this)}
                >
                  <img src="" alt="" className="queueTrack__icon--option" />
                  Add to Next up
                </button>
              </li>
              <li>
                <button className="queueTrack__option">
                  <img src="" alt="" className="queueTrack__icon--option" />
                  Add to playlists
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  }
}

Track.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  artwork_url: PropTypes.string,
  duration: PropTypes.number.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  playTrack: (id, play) => {
    dispatch(PLAY_TRACK(id, play));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Track);
