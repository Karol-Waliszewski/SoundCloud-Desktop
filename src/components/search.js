import React, { Component } from "react";

class Search extends Component {
  render() {
    return (
      <form className="search">
        <input type="text" className="search__input" placeholder="Search"/>
        <button className="search__submit">
          <img src="" alt="search icon" />
        </button>
      </form>
    );
  }
}

export default Search;
