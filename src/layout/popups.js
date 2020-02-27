import React from "react";
import { connect } from "react-redux";

// Actions
import { REMOVE_POPUP } from "../actions/layoutActions";

// Assets
import close from "../assets/close.svg";

var Popup = props => (
  <div className="popup">
    <button className="popup__close" onClick={props.remove}>
      <img src={close} alt="X, closing the popup" />
    </button>
    <p className="popup__message">{props.message}</p>
  </div>
);

class Popups extends React.Component {
  constructor() {
    super();

    this.removePopup = this.removePopup.bind(this);
  }

  removePopup(id) {
    return () => {
      this.props.remove(id);
    };
  }

  renderPopups(popups) {
    return popups.map(([id, message]) => (
      <Popup message={message} remove={this.removePopup(id)}></Popup>
    ));
  }

  render() {
    return <div className="popups">{this.renderPopups(this.props.popups)}</div>;
  }
}
const mapStateToProps = state => ({
  popups: [...state.layout.popups]
});

const mapDispatchToProps = dispatch => ({
  remove: id => {
    dispatch(REMOVE_POPUP(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Popups);
