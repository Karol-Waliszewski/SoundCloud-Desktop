import React from "react";
import Topbar from "./components/topbar";
import Sidebar from "./components/sidebar";
import Player from "./components/player";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Topbar></Topbar>
        <div className="app__row">
          <Sidebar></Sidebar>
          <main className="app__main"></main>
        </div>
        <Player></Player>
      </div>
    );
  }
}

export default App;
