import React from "react";
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

  &:hover {
    > * {
      transition: all .2s ease;
      opacity: 1;
    }
  }
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

const PlaylistImage = styled.img`
  height: 180px;
  width: 180px;
  border: 5px solid ${(props) => props.theme.white};
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const PlayButton = styled(PlayCircleOutlineIcon)`
  color: ${(props) => props.theme.pink};
  font-size: 80px !important;
  opacity: 0;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-30%, -50%);
  z-index: 5;
`;

function Playlists({ spotify }) {
  const [{ playlists }, dispatch] = useStateValue();

  const renderPlaylists = playlists.map((playlist) => {
    return (
      <ImageContainer>
        <TextContainer>
          <p>{playlist?.name}</p>
        </TextContainer>

        <PlaylistImage src={playlist?.images[0]?.url} alt="test" />
        <PlayButton />
      </ImageContainer>
    );
  });
  console.log(playlists);

  return <PlaylistContainer>{renderPlaylists}</PlaylistContainer>;
}

export default Playlists;
