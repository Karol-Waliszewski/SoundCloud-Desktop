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
import Loader from "react-loader-spinner";
import Section from "../components/section";
import Track from "../components/track";
import Playlist from "../components/playlist";
import User from "../components/user";
import List from "../components/list";
import InfiniteList from "../components/infiniteList";
import SearchNotFound from "../components/searchNotFound";

class SearchHome extends Component {
  constructor() {
    super();

    this.renderList = this.renderList.bind(this);
  }

  renderList(list, tag) {
    let { props } = this;
    if (props.api[list].fetching) {
      return <SearchLoader></SearchLoader>;
    }

    if (!props.tracks.length && props.api[list].fullfilled) {
      return <SearchNotFound query={props.query}></SearchNotFound>;
    }

    return (
      <div className="row--start">
        <List component={tag} list={props[list]} limit={12}></List>
      </div>
    );
  }

  render() {
    let { props } = this;
    return (
      <>
        <Section
          title="Tracks"
          link={props.tracks.length === 12 ? "/search/tracks" : null}
        >
          {this.renderList("tracks", Track)}
        </Section>

        <Section
          title="Playlists"
          link={props.playlists.length === 12 ? "/search/playlists" : null}
        >
          {this.renderList("playlists", Playlist)}
        </Section>

        <Section
          title="Users"
          link={props.users.length === 12 ? "/search/users" : null}
        >
          {this.renderList("users", User)}
        </Section>
      </>
    );
  }
}

var SearchLoader = props => (
  <div className="loader">
    <Loader type="Bars" color="#FF7700" height={36} width={36}></Loader>
  </div>
);

var SearchSpecific = props => {
  if (!props.list.length && props.api.fullfilled && !props.api.fetching) {
    return (
      <Section title={props.title}>
        <SearchNotFound></SearchNotFound>
      </Section>
    );
  }
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
        <h4 className="search__result">
          Search results for: “
          <span className="color--primary">{props.query}</span>”
        </h4>

        <Switch>
          <Route
            path="/search/tracks"
            render={() => (
              <SearchSpecific
                fetchMore={this.findTracks.bind(this)}
                list={props.tracks}
                tag={Track}
                api={props.apiState.tracks}
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
                api={props.apiState.playlists}
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
                api={props.apiState.users}
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
                api={props.apiState}
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
  users: state.search.users.collection,
  apiState: state.search.apiState
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
