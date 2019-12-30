import React from "react";
import { Switch, Route } from "react-router-dom";

// Layout
import Topbar from "./components/topbar";
import Sidebar from "./components/sidebar";
import Player from "./components/player";

// Routes
import Home from "./routes/Home";
import Profile from "./routes/Profile";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Topbar></Topbar>
        <div className="app__row">
          <Sidebar></Sidebar>
          <main className="app__main">
            <Switch>
              <Route path="/profile" component={Profile} />
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

export default App;
