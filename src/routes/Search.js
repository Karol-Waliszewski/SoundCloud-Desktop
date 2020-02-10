import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import Soundcloud from "../soundcloud";

// Components
import Section from "../components/section";
import Track from "../components/track";
import Playlist from "../components/playlist";
import User from "../components/user";
import List from "../components/list";

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

    return (
      <div className="route">
        <h4 className="search-result">
          Search results for: "
          <span className="color--primary">{props.query}</span>"
        </h4>

        {state.tracks.length > 0 && (
          <Section title="Tracks">
            <div className="row--start">
              <List component={Track} list={state.tracks}></List>
            </div>
          </Section>
        )}

        {state.playlists.length > 0 && (
          <Section title="Playlists">
            <div className="row--start">
              <List component={Playlist} list={state.playlists}></List>
            </div>
          </Section>
        )}

        {state.users.length > 0 && (
          <Section title="Users">
            <div className="row--start">
              <List component={User} list={state.users}></List>
            </div>
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
