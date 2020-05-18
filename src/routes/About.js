import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div className="route about">
        <p className="about__text">
          SoundCloud desktop is a hobby made project created by{" "}
          <a href="https://github.com/Karol-Waliszewski">me</a>.
        </p>
        <p className="about__text">
          I was tired of my SoundCloud drowning in my browsers tab, but
          unfortunetely there is no official desktop application. So I decided
          to give it a try and with available API do one by myself.
        </p>
        <p className="about__text">
          <a href="https://github.com/Karol-Waliszewski/SoundCloud-Desktop">
            Project on Github.
          </a>
        </p>
        <p className="about__text">
          <a href="https://github.com/Karol-Waliszewski">My Github.</a>
        </p>
      </div>
    );
  }
}

export default About;
