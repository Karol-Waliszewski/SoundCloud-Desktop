import React, { Component } from "react";
import PropTypes from "prop-types";

class List extends Component {
  render() {
    let { props, state } = this;
    let Tag = props.component;
    let list = props.list.map((element, index) => (
      <Tag key={index} {...element}></Tag>
    ));

    if (props.limit) {
      list.splice(props.limit);
    }

    return <>{list}</>;
  }
}

List.propTypes = {
  list: PropTypes.array.isRequired,
  limit: PropTypes.number
  //component: PropTypes.element.isRequired
};

export default List;
