import React from "react";
import PropTypes from "prop-types";

// Components
import InfiniteScroll from "react-infinite-scroll-component";
import List from "./list";

const InfiniteList = props => {
  //TODO: loader~!!!!!
  return (
    <InfiniteScroll
      scrollableTarget={"main"}
      dataLength={props.list.length}
      next={props.fetchFn}
      hasMore={props.more}
      loader={<h4>Loading...</h4>}
    >
      <div className="row--start">
        {props.limit ? (
          <List
            list={props.list}
            component={props.component}
            limit={props.limit}
          ></List>
        ) : (
          <List list={props.list} component={props.component}></List>
        )}
      </div>
    </InfiniteScroll>
  );
};

InfiniteList.propTypes = {
  list: PropTypes.array.isRequired,
  more: PropTypes.bool.isRequired,
  fetchFn: PropTypes.func.isRequired,
  component: PropTypes.elementType.isRequired,
  limit: PropTypes.number
};

export default InfiniteList;
