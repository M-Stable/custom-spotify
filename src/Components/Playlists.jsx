import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

const PlaylistContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70%;
  width: 100%;
  margin-left: -20px;

  overflow-y: scroll;
  overflow-x: hidden;

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
  }
`;

const ImageContainer = styled.div`
  display: flex;
  margin: 0 0 20px 0;
  position: relative;
  width: 70%;
`;

const TextContainer = styled.div`
  display: flex;
  height: 100%;
  margin-right: 5px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  p {
    color: ${(props) => props.theme.white};
    font-style: italic;
    text-transform: uppercase;

    transform: rotate(180deg);
    align-self: flex-end;
    writing-mode: vertical-lr;
  }
`;

export const PlaylistImage = styled.div`
  width: 100%;
  padding-top: 90%;
  position: relative;
  border: 5px solid ${(props) => props.theme.white};
  background: ${(props) => `url(${props.image})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

  &:hover {
    > * {
      transition: all 0.2s ease;
      opacity: 1;
    }

    div {
      transition: all 0.2s ease;
      opacity: 0.5;
    }
  }
`;

const PlayButton = styled(PlayCircleOutlineIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: ${(props) => props.theme.pink};
  font-size: 80px !important;
  opacity: ${(props) => (props.isplaying ? "1" : "0")};
  z-index: 2;
`;

export const Dimmer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: ${(props) => (props.isplaying ? "0.5" : "0")};
  z-index: 2;
`;

function Playlists({ spotify, setDeviceExist }) {
  const [{ playlists, item }, dispatch] = useStateValue();
  const [uri, setUri] = useState(null);

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      setUri(r?.context?.uri);
    });
  }, [spotify, item]);

  const handlePlay = (uri) => {
    spotify.getMyDevices().then((devices) => {
      devices.devices.length === 0
        ? setDeviceExist(false)
        : setDeviceExist(true);
      setTimeout(() => {
        setDeviceExist(false);
      }, 3000);

      spotify
        .play({ device_id: devices.devices[0]?.id, context_uri: uri })
        .then(() => {
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
      <ImageContainer key={playlist?.id}>
        <TextContainer>
          <p>{playlist?.name}</p>
        </TextContainer>

        <PlaylistImage
          onClick={() => handlePlay(playlist?.uri)}
          image={playlist?.images[0]?.url}
        >
          <Dimmer isplaying={playlist.uri === uri ? 1 : 0} />
          <PlayButton isplaying={playlist.uri === uri ? 1 : 0} />
        </PlaylistImage>
      </ImageContainer>
    );
  });

  return <PlaylistContainer>{renderPlaylists}</PlaylistContainer>;
}

export default Playlists;
