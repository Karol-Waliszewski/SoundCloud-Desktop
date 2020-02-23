import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
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
import InfiniteList from "../components/infiniteList";

class SearchHome extends Component {
  render() {
    let { props } = this;
    return (
      <>
        {props.tracks.length > 0 && (
          <Section
            title="Tracks"
            link={props.tracks.length == 12 ? "/search/tracks" : null}
          >
            <div className="row--start">
              <List component={Track} list={props.tracks} limit={12}></List>
            </div>
          </Section>
        )}

        {props.playlists.length > 0 && (
          <Section
            title="Playlists"
            link={props.playlists.length == 12 ? "/search/playlists" : null}
          >
            <div className="row--start">
              <List
                component={Playlist}
                list={props.playlists}
                limit={12}
              ></List>
            </div>
          </Section>
        )}

        {props.users.length > 0 && (
          <Section
            title="Users"
            link={props.users.length == 12 ? "/search/users" : null}
          >
            <div className="row--start">
              <List component={User} list={props.users} limit={12}></List>
            </div>
          </Section>
        )}
      </>
    );
  }
}

var SearchSpecific = props => {
  if (props.list)
    return (
      <Section title={props.title}>
        <InfiniteList
          list={props.list}
          fetchFn={props.fetchMore}
          more={props.list.length % 12 === 0}
          component={props.tag}
        ></InfiniteList>
      </Section>
    );
  return null;
};

class Search extends Component {
  componentDidMount() {
    this.searchQuery(this.props.query);
  }

  componentDidUpdate(prevProps) {
    if (this.props.query.trim() !== prevProps.query.trim()) {
      this.searchQuery(this.props.query);
    }
  }

  findTracks() {
    this.props.findTracks(this.props.query);
  }
  findPlaylists() {
    this.props.findPlaylists(this.props.query);
  }
  findUsers() {
    this.props.findUsers(this.props.query);
  }

  searchQuery(query) {
    this.props.findTracks(query);
    this.props.findPlaylists(query);
    this.props.findUsers(query);
  }

  render() {
    let { props } = this;

    return (
      <div className="route">
        <h4 className="search-result">
          Search results for: "
          <span className="color--primary">{props.query}</span>"
        </h4>

        <Switch>
          <Route
            path="/search/tracks"
            render={() => (
              <SearchSpecific
                fetchMore={this.findTracks.bind(this)}
                list={props.tracks}
                tag={Track}
                title="Tracks"
              ></SearchSpecific>
            )}
          ></Route>
          <Route
            path="/search/playlists"
            render={() => (
              <SearchSpecific
                fetchMore={this.findPlaylists.bind(this)}
                list={props.playlists}
                tag={Playlist}
                title="Playlists"
              ></SearchSpecific>
            )}
          ></Route>
          <Route
            path="/search/users"
            render={() => (
              <SearchSpecific
                fetchMore={this.findUsers.bind(this)}
                list={props.users}
                tag={User}
                title="Users"
              ></SearchSpecific>
            )}
          ></Route>
          <Route
            path="/search"
            render={() => (
              <SearchHome
                tracks={props.tracks}
                playlists={props.playlists}
                users={props.users}
              ></SearchHome>
            )}
          ></Route>
        </Switch>
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
