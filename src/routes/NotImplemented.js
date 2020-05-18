import React, { Component } from "react";
import Section from "../components/section";
import Track from "../components/track";
import User from "../components/user";

class NotImplemented extends Component {
  render() {
    return (
      <div className="route home">
        <h2 className="home__heading">I'm sorry</h2>
        <div className="home__content">
          <p>I wasn't able to implement this feature yet.</p>
        </div>
      </div>
    );
  }
}

export default NotImplemented;
