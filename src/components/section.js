import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Section extends Component {
  render() {
    let { props } = this;

    return (
      <section className="section">
        <header className="section__header">
          <h3 className="section__title">{props.title}</h3>
          {props.link && (
            <Link to={props.link} className="section__more">
              Browse all
            </Link>
          )}
        </header>
        <hr className="section__line" />
        {props.children}
      </section>
    );
  }
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string
};

export default Section;
