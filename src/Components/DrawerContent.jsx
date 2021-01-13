import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const ListContainer = styled.div`
  max-height: 28%;
  overflow-y: scroll;
  width: 250px;
  margin-bottom: 20px;

  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.gray};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.pink};
`;

const Item = styled.div`
  display: flex;
  width: auto;
  align-items: center;
  color: ${(props) =>
    props.isplaying ? props.theme.orange : props.theme.white};
  margin: 10px;
  padding: 5px;
  border: 2px solid
    ${(props) => (props.isplaying ? props.theme.orange : props.theme.white)};

  p {
    margin-left: 10px;
    font-style: italic;
    text-transform: uppercase;
  }

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.orange};
    border-color: ${(props) => props.theme.orange};
  }
`;

const Name = styled.h2`
  font-style: italic;
  color: ${(props) => props.theme.orange};
  background-color: rgb(255, 103, 0);
  background-image: linear-gradient(
    90deg,
    rgba(255, 103, 0, 1) 0%,
    rgba(216, 49, 91, 1) 100%
  );
  background-size: 100%;
  background-repeat: repeat;

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
`;

const UserImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 100px;
  margin-right: 10px;
`;

const Close = styled.button`
  position: absolute;
  top: 25px;
  right: 10px;
  height: 30px;
  width: 30px;
  background: transparent;
  color: ${(props) => props.theme.white};
  border-radius: 100px;
  border: 3px solid;
  opacity: 0.8;
  transition: 0.1s;
  outline: none;
  z-index: 5;

  display: flex;
  justify-content: center;

  &:hover {
    opacity: 1;
    color: ${(props) => props.theme.pink};
  }
`;

function DrawerContent({ setOpen, setDeviceExist }) {
  const [
    { user, playlists, artists, tracks, spotify, item },
    dispatch,
  ] = useStateValue();
  const [uri, setUri] = useState(null);

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      r.context ? setUri(r?.context?.uri) : setUri(r?.item?.uri);
    });
  }, [spotify, item]);

  const handlePlay = (uri) => {
    spotify.getMyDevices().then((devices) => {
      devices.devices.length === 0
        ? setDeviceExist(false)
        : setDeviceExist(true);
      const options = {
        device_id: devices.devices[0]?.id,
      };
      if (uri.includes("track")) {
        options.uris = [uri];
      } else if (uri.includes("artist") || uri.includes("playlist")) {
        options.context_uri = uri;
      }
      spotify.play(options).then(() => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
    });
  };

  const renderPlaylists = playlists.map((playlist) => {
    return (
      <Item
        key={playlist?.id}
        onClick={() => handlePlay(playlist?.uri)}
        isplaying={playlist.uri === uri ? 1 : 0}
      >
        <PlayCircleOutlineIcon />
        <p>{playlist?.name}</p>
      </Item>
    );
  });

  const renderArtists = artists.map((artist) => {
    return (
      <Item
        key={artist?.id}
        onClick={() => handlePlay(artist?.uri)}
        isplaying={artist.uri === uri ? 1 : 0}
      >
        <PlayCircleOutlineIcon />
        <p>{artist?.name}</p>
      </Item>
    );
  });

  const renderTracks = tracks.map((track) => {
    return (
      <Item
        key={track?.id}
        onClick={() => handlePlay(track?.uri)}
        isplaying={track.uri === uri ? 1 : 0}
      >
        <PlayCircleOutlineIcon />
        <p>{track?.name}</p>
      </Item>
    );
  });
  return (
    <div style={{ color: "white", height: "calc(100vh - 80px)" }}>
      <Close onClick={() => setOpen(false)}>
        <ChevronLeftIcon />
      </Close>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <UserImage src={user?.images[0]?.url} />
        <Name>{user?.display_name}</Name>
      </div>
      <h1>Playlists</h1>
      <ListContainer>{renderPlaylists}</ListContainer>
      <h1>Top Artists</h1>
      <ListContainer>{renderArtists}</ListContainer>
      <h1>Top Tracks</h1>
      <ListContainer>{renderTracks}</ListContainer>
    </div>
  );
}

export default DrawerContent;
