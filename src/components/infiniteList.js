import React from "react";
import PropTypes from "prop-types";

// Components
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "react-loader-spinner";
import List from "./list";

const InfiniteList = props => {
  return (
    <InfiniteScroll
      scrollableTarget={props.target || "main"}
      dataLength={props.list.length}
      next={props.fetchFn}
      hasMore={props.more}
      loader={
        <div className="loader">
          <Loader type="Bars" color="#FF7700" height={36} width={36}></Loader>
        </div>
      }
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
        {props.children}
      </div>
    </InfiniteScroll>
  );
};

InfiniteList.propTypes = {
  list: PropTypes.array.isRequired,
  more: PropTypes.bool.isRequired,
  fetchFn: PropTypes.func.isRequired,
  component: PropTypes.elementType.isRequired,
  limit: PropTypes.number,
  target: PropTypes.string
};

export default InfiniteList;
