import React, { useEffect } from "react";
import "./App.css";
import Login from "./Components/Login";
import Home from "./Home";
import { getTokenFromResponse } from "./Helpers/spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useStateValue } from "./StateProvider";
import { ThemeProvider } from "styled-components";

const spotify = new SpotifyWebApi();

const theme = {
  white: "#E9ECF5",
  orange: "#FF6700",
  pink: "#D8315B",
  navy: "#25283D",
  gray: "#6B818C",
};

function App() {
  const [{ token }, dispatch] = useStateValue();

  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      spotify.setAccessToken(_token);

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      dispatch({
        type: "SET_SPOTIFY",
        spotify,
      });

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists.items,
        });
      });

      spotify.getMyTopArtists().then((artists) => {
        dispatch({
          type: "SET_ARTISTS",
          artists: artists.items,
        });
      });

      spotify.getMyTopTracks().then((tracks) => {
        dispatch({
          type: "SET_TRACKS",
          tracks: tracks.items,
        });
      });
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      {token ? <Home spotify={spotify} /> : <Login />}
    </ThemeProvider>
  );
}

export default App;
