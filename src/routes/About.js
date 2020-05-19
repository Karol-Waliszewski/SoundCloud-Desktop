import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div className="route about">
        <h2 className="about__heading">About</h2>
        <div className="about__content">
          <p>
            SoundCloud desktop is a hobby made project created by{" "}
            <a
              href="https://github.com/Karol-Waliszewski"
              target="_blank"
              rel="noopener noreferrer"
            >
              Karol Waliszewski
            </a>
            .
          </p>
          <p>
            The reason why this application is being made is because I was tired
            of my SoundCloud page drowning into my browser's tabs, but
            unfortunately there is no official desktop application. So I decided
            to give it a try and with available API do one by myself.
          </p>
          <p>
            <a
              href="https://github.com/Karol-Waliszewski/SoundCloud-Desktop"
              target="_blank"
              rel="noopener noreferrer"
            >
              Project on Github.
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default About;
