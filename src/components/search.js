import React, { Component } from "react";
import { connect } from "react-redux";
import { push as PUSH } from "connected-react-router";

import search from "../assets/search.svg";
import { CHANGE_QUERY } from "../actions/searchActions";

class Search extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(event) {
    this.props.changeQuery(event.target.value);
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.props.query.length) {
      // Redirect to Search page (Search.js)
      this.props.push("/search");
    }
  }

  render() {
    return (
      <form className="searchInput" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="searchInput__input"
          placeholder="Search"
          value={this.props.query}
          onChange={this.onInputChange}
        />
        <button type="submit" className="searchInput__submit">
          <img src={search} alt="search icon" />
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  query: state.search.query
});

const mapDispatchToProps = dispatch => ({
  changeQuery: query => {
    dispatch(CHANGE_QUERY(query));
  },
  push: path => {
    dispatch(PUSH(path))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
