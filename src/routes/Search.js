import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import Soundcloud from "../actions/playerActions";

// Components
import Section from "../components/section";
import Track from "../components/track";
import User from "../components/user";

class Search extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.searchQuery(this.props.query);
    }
  }

  searchQuery(query) {
    console.log(query);
  }

  render() {
    return (
      <div className="route">
        <Section title="Tracks">
          <div className="row--start">
            <Track title="lorem" author="ipsum"></Track>
            <Track title="lorem" author="ipsum"></Track>
            <Track title="lorem" author="ipsum"></Track>
          </div>
        </Section>
        <Section title="Playlists">
          <div className="row--start">
            <Track title="lorem" author="ipsum"></Track>
            <Track title="lorem" author="ipsum"></Track>
          </div>
        </Section>
        <Section title="Albums">
          <div className="row--start">
            <Track title="lorem" author="ipsum"></Track>
            <Track title="lorem" author="ipsum"></Track>
            <Track title="lorem" author="ipsum"></Track>
          </div>
        </Section>
        <Section title="Users">
          <div className="row--start">
            <User name="Lorem ipsum"></User>
            <User name="Lorem ipsum"></User>
            <User name="Lorem ipsum"></User>
            <User name="Lorem ipsum lorem ipsum"></User>
          </div>
        </Section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  query: state.search.query
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
