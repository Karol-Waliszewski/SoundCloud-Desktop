import Soundcloud from "soundcloud";

Soundcloud.initialize({
  client_id: "fa791b761f68cafa375ab5f7ea51927a",
  redirect_uri: "https://example.com/callback"
});

// console.log(
//   Soundcloud.resolve("https://soundcloud.com/dimo-yankov-1/last-airbender-lo-fi").then(
//     track => track
//   )
// );

export default Soundcloud;