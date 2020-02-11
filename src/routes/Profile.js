import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import InfiniteScroll from "react-infinite-scroll-component";

// Actions
import {
  FETCH_USER,
  FETCH_TRACKS,
  FETCH_FAVOURITES,
  FETCH_PLAYLISTS,
  FETCH_FOLLOWINGS
} from "../actions/profileActions";

// Components
import Baner from "../components/baner";
import Section from "../components/section";
import Track from "../components/track";
import User from "../components/user";
import Playlist from "../components/playlist";
import List from "../components/list";
import InfiniteList from "../components/infiniteList";
import ProfileNav from "../components/profileNav";

// Assets
import LinkIcon from "../assets/link.svg";
import FollowIcon from "../assets/follow.svg";

var Tracks = function(props) {
  if (props.list)
    return <InfiniteList {...props} component={Track}></InfiniteList>;

  return null;
};

var Reposts = function(props) {
  if (props.list)
    return <InfiniteList {...props} component={Track}></InfiniteList>;
  return null;
};

var Favourites = function(props) {
  if (props.list)
    return <InfiniteList {...props} component={Track}></InfiniteList>;
  return null;
};

var Playlists = function(props) {
  if (props.list)
    return <InfiniteList {...props} component={Playlist}></InfiniteList>;
  return null;
};

var Followings = function(props) {
  if (props.list)
    return <InfiniteList {...props} component={User}></InfiniteList>;
  return null;
};

class Profile extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.match.params.username !== prevProps.match.params.username) {
      // Fetch user
      this.props.fetchUser(this.props.match.params.username);
    }
  }

  componentDidMount() {
    // Fetch user
    this.props.fetchUser(this.props.match.params.username);
  }

  render() {
    let { props } = this;
    let { match, user } = props;

    if (user != null) {
      return (
        <>
          <Baner
            avatar={user.avatar_url}
            username={user.username}
            name={user.full_name}
            country={user.country}
          ></Baner>
          <div className="route">
            <ProfileNav match={match}></ProfileNav>
            <hr className="profile__line" />
            <Switch>
              <Route
                path="/profile/:username/playlists"
                render={() => <Playlists playlists={[]}></Playlists>}
              />
              <Route
                path="/profile/:username/tracks"
                render={() => (
                  <Tracks
                    list={props.tracks}
                    more={props.tracksMore}
                    fetchFn={props.fetchTracks}
                  ></Tracks>
                )}
              />
              <Route
                path="/profile/:username/reposts"
                render={() => (
                  <Reposts
                    list={[]}
                    more={props.tracksMore}
                    fetchFn={() => {
                      console.log("TODO: Make reposts");
                    }}
                  ></Reposts>
                )}
              />
              <Route
                path="/profile/:username/followings"
                render={() => (
                  <Followings
                    list={props.followings}
                    more={props.followingsMore}
                    fetchFn={props.fetchFollowings}
                  ></Followings>
                )}
              />
              <Route
                path="/profile/:username/likes"
                render={() => (
                  <Favourites
                    list={props.favourites}
                    more={props.favouritesMore}
                    fetchFn={props.fetchFavourites}
                  ></Favourites>
                )}
              />
              <Route
                path="/profile/:username"
                render={() => (
                  <>
                    <section className="profile__about">
                      <div className="profile__content">
                        <h4 className="profile__heading">About</h4>
                        <div className="profile__description">
                          {user.description
                            ? user.description
                            : "No description found."}
                        </div>
                      </div>
                      <div className="profile__info">
                        <div className="profile__stats">
                          <div className="stat">
                            <p className="stat__title">Followers</p>
                            <span className="stat__value">
                              {user.followers_count}
                            </span>
                          </div>
                          <div className="stat">
                            <p className="stat__title">Followings</p>
                            <span className="stat__value">
                              {user.followings_count}
                            </span>
                          </div>
                          <div className="stat">
                            <p className="stat__title">Tracks</p>
                            <span className="stat__value">
                              {user.track_count}
                            </span>
                          </div>
                        </div>
                        {user.website && (
                          <div className="profile__link">
                            <div className="profile__icon">
                              <img src={LinkIcon} alt="globe" />
                            </div>
                            {user.website_title ? (
                              <a href={user.website}>{user.website_title}</a>
                            ) : (
                              <a href={user.website}>{user.website}</a>
                            )}
                          </div>
                        )}

                        <button className="profile__follow">
                          <img src={FollowIcon} alt="person with plus sign" />
                          <span>follow</span>
                        </button>
                      </div>
                    </section>

                    {props.tracks.length > 0 && (
                      <Section
                        title="Tracks"
                        link={"/profile/" + match.params.username + "/tracks"}
                      >
                        <div className="row--start">
                          <List
                            list={props.tracks}
                            component={Track}
                            limit={8}
                          ></List>
                        </div>
                      </Section>
                    )}

                    {props.favourites.length > 0 && (
                      <Section
                        title="Favourites"
                        link={"/profile/" + match.params.username + "/likes"}
                      >
                        <div className="row--start">
                          <List
                            list={props.favourites}
                            component={Track}
                            limit={8}
                          ></List>
                        </div>
                      </Section>
                    )}

                    {props.playlists.length > 0 && (
                      <Section
                        title="Playlists"
                        link={
                          "/profile/" + match.params.username + "/playlists"
                        }
                      >
                        <div className="row--start">
                          <List
                            list={props.playlists}
                            component={Playlist}
                            limit={8}
                          ></List>
                        </div>
                      </Section>
                    )}

                    {props.followings.length > 0 && (
                      <Section
                        title="Followings"
                        link={
                          "/profile/" + match.params.username + "/followings"
                        }
                      >
                        <div className="row--start">
                          <List
                            list={props.followings}
                            component={User}
                            limit={8}
                          ></List>
                        </div>
                      </Section>
                    )}
                  </>
                )}
              />
            </Switch>
          </div>
        </>
      );
    }
    return <h1>TODO: LOADER</h1>;
  }
}
const mapStateToProps = state => ({
  user: state.profile.user,
  tracks: state.profile.tracks.collection,
  tracksMore: state.profile.tracks.more,
  playlists: state.profile.playlists.collection,
  playlistsMore: state.profile.playlists.more,
  followings: state.profile.followings.collection,
  followingsMore: state.profile.followings.more,
  favourites: state.profile.favourites.collection,
  favouritesMore: state.profile.favourites.more
});

const mapDispatchToProps = dispatch => ({
  fetchUser: id => {
    dispatch(FETCH_USER(id));
  },
  fetchTracks: () => {
    console.log("fetching??");
    dispatch(FETCH_TRACKS());
  },
  fetchFavourites: () => {
    dispatch(FETCH_FAVOURITES());
  },
  fetchPlaylists: () => {
    dispatch(FETCH_PLAYLISTS());
  },
  fetchFollowings: () => {
    dispatch(FETCH_FOLLOWINGS());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
