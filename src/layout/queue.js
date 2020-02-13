import React, { Component } from "react";
import { connect } from "react-redux";
import SoundCloud from "../soundcloud";

// Components
import Track from "../components/queueTrack";

// Assets
import close from "../assets/close.svg";

class Queue extends Component {
  render() {
    let { props } = this;

    let list = [];
    let track = {
      id: 13158665,
      created_at: "2011/04/06 15:37:43 +0000",
      user_id: 3699101,
      duration: 18109,
      commentable: true,
      state: "finished",
      sharing: "public",
      tag_list: "soundcloud:source=iphone-record",
      permalink: "munching-at-tiannas-house",
      description: null,
      streamable: true,
      downloadable: true,
      genre: null,
      release: null,
      purchase_url: null,
      label_id: null,
      label_name: null,
      isrc: null,
      video_url: null,
      track_type: "recording",
      key_signature: null,
      bpm: null,
      title: "Munching at Tiannas house",
      release_year: null,
      release_month: null,
      release_day: null,
      original_format: "m4a",
      original_content_size: 10211857,
      license: "all-rights-reserved",
      uri: "https://api.soundcloud.com/tracks/13158665",
      permalink_url:
        "https://soundcloud.com/user2835985/munching-at-tiannas-house",
      artwork_url: null,
      waveform_url: "https://w1.sndcdn.com/fxguEjG4ax6B_m.png",
      user: {
        id: 3699101,
        permalink: "user2835985",
        username: "user2835985",
        uri: "https://api.soundcloud.com/users/3699101",
        permalink_url: "https://soundcloud.com/user2835985",
        avatar_url:
          "https://a1.sndcdn.com/images/default_avatar_large.png?142a848"
      },
      stream_url: "https://api.soundcloud.com/tracks/13158665/stream",
      download_url: "https://api.soundcloud.com/tracks/13158665/download",
      playback_count: 0,
      download_count: 0,
      favoritings_count: 0,
      comment_count: 0,
      attachments_uri: "https://api.soundcloud.com/tracks/13158665/attachments"
    };

    for (let i = 0; i < 10; i++) {
      list.push(<Track key={i} {...track}></Track>);
    }

    return (
      <section className={`queue ${props.active ? "active" : ""}`}>
        <header className="queue__header">
          <h3 className="queue__heading">Next up</h3>
          <div className="queue__buttons">
            <button className="queue__clear">Clear</button>
            <button className="queue__close">
              <img src={close} alt="x (close)" />
            </button>
          </div>
        </header>
        <div className="queue__list">{list}</div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  active: state.layout.queueActive,
  queue: state.player.queue
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Queue);
