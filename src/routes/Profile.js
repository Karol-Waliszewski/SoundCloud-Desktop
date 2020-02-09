import React, { Component } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
// import { TransitionGroup, CSSTransition } from "react-transition-group";

// Actions
import Soundcloud from "../actions/playerActions";

// Components
import Baner from "../components/baner";
import Section from "../components/section";
import Track from "../components/track";
import User from "../components/user";

// Assets
import LinkIcon from "../assets/link.svg";
import FollowIcon from "../assets/follow.svg";

var Tracks = function(props) {
  let tracks = props.tracks.map(track => (
    <Track
      title={track.title}
      author={track.author}
      image={track.image}
    ></Track>
  ));
  return (
    <div className="row--start">
      {tracks}
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
    </div>
  );
};

var Albums = function(props) {
  let albums = props.albums.map(track => (
    <Track
      title={track.title}
      author={track.author}
      image={track.image}
    ></Track>
  ));
  return (
    <div className="row--start">
      {albums}
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
    </div>
  );
};

var Reposts = function(props) {
  let tracks = props.tracks.map(track => (
    <Track
      title={track.title}
      author={track.author}
      image={track.image}
    ></Track>
  ));
  return (
    <div className="row--start">
      {tracks}
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
    </div>
  );
};

var Favourites = function(props) {
  let tracks = props.tracks.map(track => (
    <Track
      title={track.title}
      author={track.author}
      image={track.image}
    ></Track>
  ));
  return (
    <div className="row--start">
      {tracks}
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
    </div>
  );
};

var Playlists = function(props) {
  let playlists = props.playlists.map(track => (
    <Track
      title={track.title}
      author={track.author}
      image={track.image}
    ></Track>
  ));
  return (
    <div className="row--start">
      {playlists}
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
      <Track title="lorem" author="ipsum"></Track>
    </div>
  );
};

var Followings = function(props) {
  let users = props.users.map(track => (
    <Track
      title={track.title}
      author={track.author}
      image={track.image}
    ></Track>
  ));
  return (
    <div className="row--start">
      {users}
      <User name="Lorem ipsum"></User>
      <User name="Lorem ipsum"></User>
      <User name="Lorem ipsum"></User>
      <User name="Lorem ipsum lorem ipsum"></User>
      <User name="Lorem ipsum"></User>
      <User name="Lorem ipsum"></User>
      <User name="Lorem ipsum"></User>
      <User name="Lorem ipsum lorem ipsum"></User>
    </div>
  );
};

class Profile extends Component {
  constructor() {
    super();
    this.state = { user: null };
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.username !== prevProps.match.params.username) {
      // Fetch user
      this.fetchUser(this.props.match.params.username);
    }
  }

  componentDidMount() {
    // Fetch user
    this.fetchUser(this.props.match.params.username);
  }

  fetchUser(id) {
    Soundcloud.get(`/users/${id}`).then(user => {
      console.log(user);
      this.setState({ user });
    });
  }

  render() {
    let { props, state } = this;
    let { match } = props;
    let { user } = state;
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
            <nav className="profile-nav">
              <NavLink
                className="profile-nav__link"
                activeClassName="active"
                exact={true}
                to={"/profile/" + match.params.username}
              >
                Overview
              </NavLink>
              <NavLink
                className="profile-nav__link"
                activeClassName="active"
                to={"/profile/" + match.params.username + "/tracks"}
              >
                Tracks
              </NavLink>
              <NavLink
                className="profile-nav__link"
                activeClassName="active"
                to={"/profile/" + match.params.username + "/playlists"}
              >
                Playlists
              </NavLink>
              <NavLink
                className="profile-nav__link"
                activeClassName="active"
                to={"/profile/" + match.params.username + "/albums"}
              >
                Albums
              </NavLink>
              <NavLink
                className="profile-nav__link"
                activeClassName="active"
                to={"/profile/" + match.params.username + "/reposts"}
              >
                Reposts
              </NavLink>
              <NavLink
                className="profile-nav__link"
                activeClassName="active"
                to={"/profile/" + match.params.username + "/followings"}
              >
                Followings
              </NavLink>
              <NavLink
                className="profile-nav__link"
                activeClassName="active"
                to={"/profile/" + match.params.username + "/likes"}
              >
                Likes
              </NavLink>
            </nav>
            <hr className="profile__line" />
            <Switch>
              <Route
                path="/profile/:username/playlists"
                render={() => <Playlists playlists={[]}></Playlists>}
              />
              <Route
                path="/profile/:username/tracks"
                render={() => <Tracks tracks={[]}></Tracks>}
              />
              <Route
                path="/profile/:username/albums"
                render={() => <Albums albums={[]}></Albums>}
              />
              <Route
                path="/profile/:username/reposts"
                render={() => <Reposts tracks={[]}></Reposts>}
              />
              <Route
                path="/profile/:username/followings"
                render={() => <Followings users={[]}></Followings>}
              />
              <Route
                path="/profile/:username/likes"
                render={() => <Favourites tracks={[]}></Favourites>}
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
                    <Section
                      title="Favourites"
                      link={"/profile/" + match.params.username + "/likes"}
                    >
                      <div className="row--start">
                        <Track title="lorem" author="ipsum"></Track>
                        <Track title="lorem" author="ipsum"></Track>
                        <Track title="lorem" author="ipsum"></Track>
                        <Track title="lorem" author="ipsum"></Track>
                      </div>
                    </Section>
                    <Section
                      title="Playlists"
                      link={"/profile/" + match.params.username + "/playlists"}
                    >
                      <div className="row--start">
                        <Track title="lorem" author="ipsum"></Track>
                        <Track title="lorem" author="ipsum"></Track>
                      </div>
                    </Section>
                    <Section
                      title="Albums"
                      link={"/profile/" + match.params.username + "/albums"}
                    >
                      <div className="row--start">
                        <Track title="lorem" author="ipsum"></Track>
                        <Track title="lorem" author="ipsum"></Track>
                        <Track title="lorem" author="ipsum"></Track>
                      </div>
                    </Section>
                    <Section
                      title="Followings"
                      link={"/profile/" + match.params.username + "/followings"}
                    >
                      <div className="row--start">
                        <User name="Lorem ipsum"></User>
                        <User name="Lorem ipsum"></User>
                        <User name="Lorem ipsum"></User>
                        <User name="Lorem ipsum lorem ipsum"></User>
                      </div>
                    </Section>
                  </>
                )}
              />
            </Switch>
          </div>
        </>
      );
    }
    return <h1>No user found</h1>;
  }
}

export default Profile;
