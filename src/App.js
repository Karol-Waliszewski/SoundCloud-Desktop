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
import Likes from "./routes/Likes";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Topbar></Topbar>
        <div className="app__row">
          <Sidebar></Sidebar>
          <main className="app__main">
            <Switch>
              <Route path="/profile/:username" component={Profile} />
              <Route path="/likes" component={Likes} />
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
