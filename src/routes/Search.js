import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import Soundcloud from "../actions/playerActions";

// Components
import Section from "../components/section";
import Track from "../components/track";
import Playlist from "../components/playlist";
import User from "../components/user";

class Search extends Component {
  constructor() {
    super();
    this.state = { tracks: [], playlists: [], users: [] };
  }

  componentDidMount() {
    this.searchQuery(this.props.query);
  }

  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.searchQuery(this.props.query);
    }
  }

  searchQuery(query) {
    Soundcloud.get("/tracks", {
      q: query,
      limit: 12
    }).then(t => {
      this.setState({ tracks: [...t.filter(track => track.streamable)] });
    });
    Soundcloud.get("/playlists", {
      q: query,
      limit: 12
    }).then(p => {
      this.setState({
        playlists: [...p.filter(playlist => playlist.streamable)]
      });
    });
    Soundcloud.get("/users", {
      q: query,
      limit: 8
    }).then(u => {
      this.setState({ users: [...u] });
    });
  }

  render() {
    let { props, state } = this;
    let tracks = state.tracks.map(track => (
      <Track
        key={track.id}
        id={track.id}
        title={track.title}
        author={track.user}
        image={track.artwork_url}
        duration={track.duration}
      ></Track>
    ));

    let users = state.users.map(user => (
      <User
        key={user.id}
        id={user.id}
        name={user.username}
        avatar={user.avatar_url}
      ></User>
    ));

    let playlists = state.playlists.map(playlist => (
      <Playlist
        key={playlist.id}
        id={playlist.id}
        title={playlist.title}
        tracks={playlist.track_count}
        author={playlist.user}
        duration={playlist.duration}
        image={
          playlist.artwork_url != null
            ? playlist.artwork_url
            : playlist.user.avatar_url
        }
      ></Playlist>
    ));

    return (
      <div className="route">
        <h4 className="search-result">
          Search results for: "
          <span className="color--primary">{props.query}</span>"
        </h4>

        {tracks.length > 0 && (
          <Section title="Tracks">
            <div className="row--start">{tracks}</div>
          </Section>
        )}

        {playlists.length > 0 && (
          <Section title="Playlists">
            <div className="row--start">{playlists}</div>
          </Section>
        )}

        {users.length > 0 && (
          <Section title="Users">
            <div className="row--start">{users}</div>
          </Section>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  query: state.search.query
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
