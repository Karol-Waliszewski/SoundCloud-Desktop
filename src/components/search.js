import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import search from "../assets/search.svg";
import { CHANGE_QUERY } from "../actions/searchActions";

class Search extends Component {
  onInputChange(event) {
    this.props.changeQuery(event.target.value);
  }

  render() {
   
    return (
      <form className="search">
        <input
          type="text"
          className="search__input"
          placeholder="Search"
          value={this.props.query}
          onChange={this.onInputChange.bind(this)}
        />
        <Link to="/search" className="search__submit">
          <img src={search} alt="search icon" />
        </Link>
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
