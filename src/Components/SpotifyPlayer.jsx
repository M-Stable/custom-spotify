import React, { useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";

const Container = styled.div`
  width: 400px;
  height: 650px;
  //   border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  background: #222e58;

`;

const ImageContainer = styled.div`
  width: 100%;
  height: 70%;
  background: ${(props) => props.theme.gray};
  background: ${(props) => `url(${props.image})`};
  //   border-radius: 20px 20px 0 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  //   border-radius: 20px 20px 0 0;
  filter: blur(1px);
  -webkit-filter: blur(1px);

  position: absolute;
  top: 0;
  left: 0;
`;

const TrackInfoContainer = styled.div`
  min-width: 50%;
  max-width: 90%;
  border: 5px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(90deg, rgba(255,103,0,1) 0%, rgba(216,49,91,1) 100%);
  box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.2);
  color: white;
  padding: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  position: relative;
`;

const InfoBackground = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.navy};
  opacity: 0.8;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Title = styled.h1`
  font-style: italic;
  font-weight: 400;
  text-align: center;
  text-shadow: 5px 5px 3px rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

const Artist = styled.h4`
  font-style: italic;
  font-weight: 400;
  text-align: center;
  text-shadow: 5px 5px 3px rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

const BottomContainer = styled.div`
  width: 100%;
  height: 30%;
  background: rgb(4, 17, 61);
  background: rgb(4, 17, 61);
  background: linear-gradient(
    180deg,
    rgba(4, 17, 61, 1) 0%,
    rgba(37, 40, 61, 1) 70%
  );
  //   border-radius: 0 0 20px 20px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlaybackContainer = styled.div`
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

function SpotifyPlayer({ spotify }) {
  const [{ item, playing }, dispatch] = useStateValue();

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((track) => {
      dispatch({
        type: "SET_PLAYING",
        playing: track.is_playing,
      });

      dispatch({
        type: "SET_ITEM",
        item: track.item,
      });
    });
  }, [spotify, dispatch]);

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }
  };

  const skipNext = () => {
    spotify.skipToNext().then(() => {
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

  const skipPrevious = () => {
    spotify.skipToPrevious().then(() => {
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

  return (
    <Container>
      <ImageContainer image={item?.album?.images[0]?.url}>
        <Image src={item?.album?.images[0]?.url} alt={item?.album?.name} />
        <TrackInfoContainer>
          <InfoBackground />
          <Title>{item ? item?.name : "Select a playlist on the left"}</Title>
          <Artist>{item?.artists?.map((a) => a.name).join(", ")}</Artist>
        </TrackInfoContainer>
      </ImageContainer>
      <BottomContainer>
        <PlaybackContainer>
          <IconWrapper>
            <SkipPreviousIcon onClick={skipPrevious} style={{ fontSize: 80 }} />
          </IconWrapper>
          <IconWrapper>
            {playing ? (
              <PauseCircleOutlineIcon
                onClick={handlePlayPause}
                style={{ fontSize: 100 }}
              />
            ) : (
              <PlayCircleOutlineIcon
                onClick={handlePlayPause}
                style={{ fontSize: 100 }}
              />
            )}
          </IconWrapper>
          <IconWrapper>
            <SkipNextIcon onClick={skipNext} style={{ fontSize: 80 }} />
          </IconWrapper>
        </PlaybackContainer>
      </BottomContainer>
    </Container>
  );
}

export default SpotifyPlayer;
