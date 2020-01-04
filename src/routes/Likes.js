import React from "react";
import Soundcloud from "soundcloud";

class Likes extends React.Component {
  constructor() {
    super();
    // Soundcloud.initialize({
    //   client_id: "fa791b761f68cafa375ab5f7ea51927a",
    //   redirect_uri: "https://example.com/callback"
    // });
  }

  render() {
    // console.log(
    //   Soundcloud.resolve(
    //     "https://soundcloud.com/peachyperidots/fujitsu-awaiting"
    //   ).then(track=>track)
    // );

    // Soundcloud.get("/playlists", {
    //   q: "aestral",
    //   limit: 30
    // }).then(function(tracks) {
    //   console.log(tracks);
    // });

    // Soundcloud.stream("/tracks/337213956").then(function(player) {
    //   player.play();
    //   player.seek(123 * 1000);
    //   player.on("finish", () => {
    //     console.log("finished");
    //   });
    //   console.log(player.getState());
    // });

    return <div className="sandbox">SANDBOXIK</div>;
  }
}

export default Likes;
