import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Link } from "react-router-dom";

// Actions
import { fetchUser } from "../soundcloud";
import {
  FETCH_TRACKS,
  FETCH_FAVOURITES,
  FETCH_PLAYLISTS,
  FETCH_FOLLOWINGS,
  FETCH_FOLLOWERS
} from "../actions/profileActions";

// Components
import Loader from "react-loader-spinner";
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

// var ProfileList = props => {
//   if (props.list)
//     return <InfiniteList {...props} component={props.tag}></InfiniteList>;
//   return null;
// };

class ProfileList extends Component {
  render() {
    let { props } = this;
    if (props.list)
      return <InfiniteList {...props} component={props.tag}></InfiniteList>;
    return null;
  }
}

class ProfileHome extends Component {
  render() {
    let { props } = this;
    let { match, user } = props;
    return (
      <>
        <section className="profile__about">
          <div className="profile__content">
            <h4 className="profile__heading">About</h4>
            <div className="profile__description">
              {user.description ? user.description : "No description found."}
            </div>
          </div>
          <div className="profile__info">
            <div className="profile__stats">
              <div className="stat">
                <Link to={"/profile/" + match.params.username + "/followers"}>
                  <p className="stat__title">Followers</p>
                  <span className="stat__value">{user.followers_count}</span>
                </Link>
              </div>
              <div className="stat">
                <Link to={"/profile/" + match.params.username + "/followings"}>
                  <p className="stat__title">Followings</p>
                  <span className="stat__value">{user.followings_count}</span>
                </Link>
              </div>
              <div className="stat">
                <Link to={"/profile/" + match.params.username + "/tracks"}>
                  <p className="stat__title">Tracks</p>
                  <span className="stat__value">{user.track_count}</span>
                </Link>
              </div>
            </div>
            {user.website && (
              <div className="profile__link">
                <div className="profile__icon">
                  <img src={LinkIcon} alt="globe" />
                </div>

                {user.website_title ? (
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.website_title}
                  </a>
                ) : (
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.website}
                  </a>
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
              <List list={props.tracks} component={Track} limit={8}></List>
            </div>
          </Section>
        )}

        {props.favourites.length > 0 && (
          <Section
            title="Favourites"
            link={"/profile/" + match.params.username + "/likes"}
          >
            <div className="row--start">
              <List list={props.favourites} component={Track} limit={8}></List>
            </div>
          </Section>
        )}

        {props.playlists.length > 0 && (
          <Section
            title="Playlists"
            link={"/profile/" + match.params.username + "/playlists"}
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
            link={"/profile/" + match.params.username + "/followings"}
          >
            <div className="row--start">
              <List list={props.followings} component={User} limit={8}></List>
            </div>
          </Section>
        )}
      </>
    );
  }
}

class Profile extends Component {
  scrollTo(selector) {
    let $wrapper = document.querySelector("#main");
    let $element = document.querySelector(selector);
    if ($wrapper.scrollTop > $element.scrollTop) {
      $wrapper.scrollTo({
        top: $element.offsetTop - 46,
        behavior: "smooth"
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.username !== prevProps.match.params.username) {
      // Fetch user
      fetchUser(Number(this.props.match.params.username));
    }
    
    if (this.props.location.pathname !== prevProps.location.pathname && this.props.match.params.username === prevProps.match.params.username) {
      this.scrollTo("#profile__route");
    }
  }

  componentDidMount() {
    // Fetch user
    fetchUser(Number(this.props.match.params.username));
  }

  render() {
    let { props } = this;
    let { match, user } = props;

    if (user != null) {
      return (
        <>
          <Baner
            avatar={user.avatar_url.replace("large", "t300x300")}
            username={user.username}
            name={user.full_name}
            country={user.country}
          ></Baner>
          <div className="route" id="profile__route">
            <ProfileNav match={match}></ProfileNav>
            <hr className="profile__line" />
            <Switch>
              <Route
                path="/profile/:username/playlists"
                render={() => (
                  <ProfileList
                    list={props.playlists}
                    more={props.playlistsMore}
                    fetchFn={props.fetchPlaylists}
                    tag={Playlist}
                  ></ProfileList>
                )}
              />
              <Route
                path="/profile/:username/tracks"
                render={() => (
                  <ProfileList
                    list={props.tracks}
                    more={props.tracksMore}
                    fetchFn={props.fetchTracks}
                    tag={Track}
                  ></ProfileList>
                )}
              />
              <Route
                path="/profile/:username/followers"
                render={() => (
                  <ProfileList
                    list={props.followers}
                    more={props.followersMore}
                    fetchFn={props.fetchFollowers}
                    tag={User}
                  ></ProfileList>
                )}
              />
              <Route
                path="/profile/:username/followings"
                render={() => (
                  <ProfileList
                    list={props.followings}
                    more={props.followingsMore}
                    fetchFn={props.fetchFollowings}
                    tag={User}
                  ></ProfileList>
                )}
              />
              <Route
                path="/profile/:username/likes"
                render={() => (
                  <ProfileList
                    list={props.favourites}
                    more={props.favouritesMore}
                    fetchFn={props.fetchFavourites}
                    tag={Track}
                  ></ProfileList>
                )}
              />
              <Route
                path="/profile/:username"
                render={() => (
                  <ProfileHome
                    user={user}
                    match={match}
                    tracks={props.tracks}
                    playlists={props.playlists}
                    favourites={props.favourites}
                    followers={props.followers}
                    followings={props.followings}
                  ></ProfileHome>
                )}
              />
            </Switch>
          </div>
        </>
      );
    }
    return (
      <div className="loader">
        <Loader type="Bars" color="#FF7700" height={36} width={36}></Loader>
      </div>
    );
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
  followers: state.profile.followers.collection,
  followersMore: state.profile.followers.more,
  favourites: state.profile.favourites.collection,
  favouritesMore: state.profile.favourites.more
});

const mapDispatchToProps = dispatch => ({
  fetchTracks: () => {
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
  },
  fetchFollowers: () => {
    dispatch(FETCH_FOLLOWERS());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
