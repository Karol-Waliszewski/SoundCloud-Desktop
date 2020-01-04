import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
// import { TransitionGroup, CSSTransition } from "react-transition-group";

// Layout
import Topbar from "./components/topbar";
import Sidebar from "./components/sidebar";
import Player from "./components/player";

// Routes
import Home from "./routes/Home";
import Profile from "./routes/Profile";

class App extends React.Component {
  render() {
    let { location } = this.props;
    console.log(location);
    return (
      <div className="app">
        <Topbar></Topbar>
        <div className="app__row">
          <Sidebar></Sidebar>
          <main className="app__main">
                <Switch>
                  <Route path="/profile/:username" component={Profile} />
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

export default withRouter(App);
