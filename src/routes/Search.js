import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import {
  FIND_TRACKS,
  FIND_PLAYLISTS,
  FIND_USERS
} from "../actions/searchActions";

// Components
import Section from "../components/section";
import Track from "../components/track";
import Playlist from "../components/playlist";
import User from "../components/user";
import List from "../components/list";

class Search extends Component {
  componentDidMount() {
    this.searchQuery(this.props.query);
  }

  componentDidUpdate(prevProps) {
    if (this.props.query.trim() !== prevProps.query.trim()) {
      this.searchQuery(this.props.query);
    }
  }

  searchQuery(query) {
    this.props.findTracks(query);
    this.props.findPlaylists(query);
    this.props.findUsers(query);
  }

  render() {
    let { props, state } = this;

    return (
      <div className="route">
        <h4 className="search-result">
          Search results for: "
          <span className="color--primary">{props.query}</span>"
        </h4>

        {props.tracks.length > 0 && (
          <Section title="Tracks">
            <div className="row--start">
              <List component={Track} list={props.tracks}></List>
            </div>
          </Section>
        )}

        {props.playlists.length > 0 && (
          <Section title="Playlists">
            <div className="row--start">
              <List component={Playlist} list={props.playlists}></List>
            </div>
          </Section>
        )}

        {props.users.length > 0 && (
          <Section title="Users">
            <div className="row--start">
              <List component={User} list={props.users}></List>
            </div>
          </Section>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  query: state.search.query,
  tracks: state.search.tracks.collection,
  playlists: state.search.playlists.collection,
  users: state.search.users.collection
});

const mapDispatchToProps = dispatch => ({
  findTracks: queue => {
    dispatch(FIND_TRACKS(queue));
  },
  findPlaylists: queue => {
    dispatch(FIND_PLAYLISTS(queue));
  },
  findUsers: queue => {
    dispatch(FIND_USERS(queue));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
