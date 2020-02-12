import React, { Component } from "react";
import { connect } from "react-redux";

// Components

class Queue extends Component {
  render() {
    let { props } = this;
    return (
      <div className={`queue ${props.active ? "active" : ""}`}>TODO: Body</div>
    );
  }
}

const mapStateToProps = state => ({
  active: state.layout.queueActive
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Queue);
