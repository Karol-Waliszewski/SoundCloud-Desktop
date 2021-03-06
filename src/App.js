import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import { TransitionGroup, CSSTransition } from "react-transition-group";

// Actions
import { ADD_AND_PLAY_TRACK, ADD_TO_QUEUE } from "./actions/playerActions";
import { ADD_POPUP } from "./actions/layoutActions";

// Layout
import Topbar from "./layout/topbar";
import Sidebar from "./layout/sidebar";
import Player from "./layout/player";
import Queue from "./layout/queue";
import Popups from "./layout/popups";

// Routes
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Likes from "./routes/Likes";
import Search from "./routes/Search";
import About from "./routes/About";
import NotImplemented from "./routes/NotImplemented";

class App extends React.Component {
  componentDidMount() {
    this.props.playTrack(496922577);
    this.props.addToQueue(204957649);
    this.props.addToQueue(504437034);
  }

  render() {
    return (
      <div className="app">
        <Topbar></Topbar>
        <Popups></Popups>
        <div className="app__row">
          <Sidebar></Sidebar>
          <main className="app__main" id="main">
            <Switch>
              <Route path="/profile/:username" component={Profile} />
              {/* <Route path="/likes" component={Likes} /> */}
              <Route path="/search" component={Search} />
              <Route path="/about" component={About} />
              <Route path="/" exact={true} component={Home} />
              <Route path="/" component={NotImplemented} />
            </Switch>
          </main>
        </div>
        <Queue></Queue>
        <Player></Player>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  playTrack: (id, play) => {
    dispatch(ADD_AND_PLAY_TRACK(id, play));
  },
  addToQueue: (id) => {
    dispatch(ADD_TO_QUEUE(id));
  },
  addPopup: (msg) => {
    dispatch(ADD_POPUP(msg));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
