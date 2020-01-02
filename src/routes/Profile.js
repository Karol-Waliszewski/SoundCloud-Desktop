import React, { Component } from "react";
import Baner from "../components/baner";

class Profile extends Component {
  render() {
    return (
      <Baner
        username="lorem ipsum"
        name="@ipsum"
        description="hello world"
      ></Baner>
    );
  }
}

export default Profile;
