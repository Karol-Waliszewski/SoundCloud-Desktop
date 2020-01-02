import React, { Component } from "react";
import Section from "../components/section";
import Track from "../components/track";
import User from "../components/user";

class Home extends Component {
  render() {
    return (
      <div className="route">
        <Section title="Recently played" link="/history">
          <div className="row">
            <Track title="lorem" author="ipsum"></Track>
            <Track title="lorem" author="ipsum"></Track>
            <Track title="lorem" author="ipsum"></Track>
            <Track title="lorem" author="ipsum"></Track>
          </div>
        </Section>
        <Section title="Your favourite" link="/likes">
          <div className="row">
            <Track title="lorem" author="ipsum"></Track>
            <Track title="lorem" author="ipsum"></Track>
            <Track title="lorem" author="ipsum"></Track>
            <Track title="lorem" author="ipsum"></Track>
            <Track title="lorem" author="ipsum"></Track>
            <Track title="lorem" author="ipsum"></Track>{" "}
          </div>
        </Section>
        <Section title="Playlists" link="/playlists">
          <div className="row">
            <Track title="lorem" author="ipsum"></Track>
            <Track title="lorem" author="ipsum"></Track>
          </div>
        </Section>
        <Section title="Albums" link="/albums">
          <div className="row">
            <Track title="lorem" author="ipsum"></Track>
            <Track title="lorem" author="ipsum"></Track>
            <Track title="lorem" author="ipsum"></Track>
          </div>
        </Section>
        <Section title="Followings" link="/followings">
          <div className="row">
            <User name="Lorem ipsum"></User>
            <User name="Lorem ipsum"></User>
            <User name="Lorem ipsum"></User>
          </div>
        </Section>
      </div>
    );
  }
}

export default Home;
