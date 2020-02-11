import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import { TransitionGroup, CSSTransition } from "react-transition-group";

// Actions
import { ADD_AND_PLAY_TRACK, ADD_TO_QUEUE } from "./actions/playerActions";

// Layout
import Topbar from "./components/topbar";
import Sidebar from "./components/sidebar";
import Player from "./components/player";

// Routes
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Likes from "./routes/Likes";
import Search from "./routes/Search";

class App extends React.Component {
  componentDidMount() {
    this.props.playTrack("496922577");
    this.props.addToQueue("204957649");
    this.props.addToQueue("504437034");
  }

  render() {
    return (
      <div className="app">
        <Topbar></Topbar>
        <div className="app__row">
          <Sidebar></Sidebar>
          <main className="app__main" id="main">
            <Switch>
              <Route path="/profile/:username" component={Profile} />
              <Route path="/likes" component={Likes} />
              <Route path="/search" component={Search} />
              {/* Home has to be last path in switch */}
              <Route path="/" component={Home} />
            </Switch>
          </main>
        </div>
        <Player></Player>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  playTrack: (id, play) => {
    dispatch(ADD_AND_PLAY_TRACK(id, play));
  },
  addToQueue: id => {
    dispatch(ADD_TO_QUEUE(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
