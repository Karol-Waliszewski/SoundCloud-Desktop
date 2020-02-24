import React from "react";
import { connect } from "react-redux";

class SearchNotFound extends React.Component {
  render() {
    return (
      <p className="search__notfound">
        Sorry we didn't find any results for “ <span className="color--primary">{this.props.query}</span>”. Check the spelling, or try a different search.
      </p>
      
    );
  }
}
const mapStateToProps = state => ({
  query: state.search.query
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SearchNotFound);
