import React, { Component } from "react";


class Home extends Component {
  render() {
    return (
      <div className="route home">
        <h2 className="home__heading">Hello world</h2>
        <div className="home__content">
          <p>
            If you want to search for a track, playlist or an user, use
            searchbar at the top.
          </p>
          <p>
            Please keep in mind that the app is in early alpha and it is still
            impossible to sign in, because SoundCloud disabled new application
            registration due to high amount of request. Therefore I will try to
            implement it as soon as they renew applications.
          </p>

          <p>
            If you found a bug, you can report it <a href="#">here</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
