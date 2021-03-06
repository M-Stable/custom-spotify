import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import RepeatOneIcon from "@material-ui/icons/RepeatOne";
import { fadeIn, slideUp } from "./TopArtists";

const Container = styled.div`
  width: 400px;
  min-height: 335px;
  flex-basis: 33.33%;
  flex: 1;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  background: ${(props) => props.theme.navy};
  margin: 20px;

  animation: ${slideUp} 1s, ${fadeIn} 1s;

  z-index: 5;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 70%;
  background: ${(props) => props.theme.gray};
  background: ${(props) => `url(${props.image})`};
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
  border-image-source: linear-gradient(
    90deg,
    rgba(255, 103, 0, 1) 0%,
    rgba(216, 49, 91, 1) 100%
  );
  box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.2);
  color: ${(props) => props.theme.white};
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
  background: ${(props) => props.theme.navy};
  background: linear-gradient(
    180deg,
    rgba(4, 17, 61, 1) 0%,
    rgba(37, 40, 61, 1) 70%
  );
  position: relative;

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

const ShuffleButton = styled(ShuffleIcon)`
  color: ${(props) =>
    props.isshuffle ? props.theme.orange : props.theme.white};
  z-index: 5;
`;

const RepeatButton = styled(RepeatIcon)`
  color: ${(props) =>
    props.isrepeat === "off"
      ? props.theme.white
      : props.isrepeat === "context" && props.theme.orange};
  z-index: 5;
`;

const RepeatOneButton = styled(RepeatOneIcon)`
  color: ${(props) => props.theme.orange};
  z-index: 5;
`;

function SpotifyPlayer({ spotify }) {
  const [{ item, playing }, dispatch] = useStateValue();
  const [isShuffle, setShuffle] = useState(false);
  const [isRepeat, setRepeat] = useState("off");

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

      setShuffle(track.shuffle_state);
      setRepeat(track.repeat_state);
    });
  }, [spotify, dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
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
    }, 5000);
    return () => clearInterval(interval);
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

  const handleShuffle = () => {
    spotify.setShuffle(!isShuffle);
    setShuffle(!isShuffle);
  };

  const handleRepeat = () => {
    if (isRepeat === "off") {
      spotify.setRepeat("context");
      setRepeat("context");
    } else if (isRepeat === "context") {
      spotify.setRepeat("track");
      setRepeat("track");
    } else {
      spotify.setRepeat("off");
      setRepeat("off");
    }
  };

  return (
    <Container>
      <ImageContainer image={item?.album?.images[0]?.url}>
        <Image src={item?.album?.images[0]?.url} alt={item?.album?.name} />
        <TrackInfoContainer>
          <InfoBackground />
          <Title>{item ? item?.name : "Select a playlist/artist/track"}</Title>
          <Artist>{item?.artists?.map((a) => a.name).join(", ")}</Artist>
        </TrackInfoContainer>
      </ImageContainer>
      <BottomContainer>
        <PlaybackContainer>
          <IconWrapper>
            <ShuffleButton
              isshuffle={isShuffle ? 1 : 0}
              onClick={handleShuffle}
            />
          </IconWrapper>
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
          <IconWrapper>
            {isRepeat === "track" ? (
              <RepeatOneButton isrepeat={isRepeat} onClick={handleRepeat} />
            ) : (
              <RepeatButton isrepeat={isRepeat} onClick={handleRepeat} />
            )}
          </IconWrapper>
        </PlaybackContainer>
      </BottomContainer>
    </Container>
  );
}

export default SpotifyPlayer;
