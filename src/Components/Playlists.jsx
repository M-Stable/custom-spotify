import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

const PlaylistContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // height: 650px;
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
`;

const TextContainer = styled.div`
  display: flex;
  height: 190px;
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

const PlaylistImage = styled.div`
  height: 180px;
  width: 180px;
  position: relative;
  border: 5px solid ${(props) => props.theme.white};
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  background: ${(props) => `url(${props.image})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;

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
  color: ${(props) => props.theme.pink};
  font-size: 80px !important;
  opacity: ${(props) => (props.isplaying ? "1" : "0")};
  z-index: 2;
`;

const Dimmer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: ${(props) => (props.isplaying ? "0.5" : "0")};
  z-index: 1;
`;

function Playlists({ spotify }) {
  const [{ playlists, item }, dispatch] = useStateValue();
  const [uri, setUri] = useState(null);

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      setUri(r?.context?.uri);
    });
  }, [spotify, item]);

  const handlePlay = (uri) => {
    spotify.play({ context_uri: uri }).then(() => {
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