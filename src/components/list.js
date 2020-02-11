import React from "react";
import PropTypes from "prop-types";

const List = props => {
  let Tag = props.component;
  let list = props.list.map((element, index) => (
    <Tag key={index} {...element}></Tag>
  ));

  if (props.limit) {
    list.splice(props.limit);
  }

  return <>{list}</>;
};

List.propTypes = {
  list: PropTypes.array.isRequired,
  limit: PropTypes.number,
  component: PropTypes.elementType.isRequired
};

export default List;
