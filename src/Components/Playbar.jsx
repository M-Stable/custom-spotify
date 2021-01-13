import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";
import Slider from "@material-ui/core/Slider";
import { useMediaQuery } from "react-responsive";

const NameContainer = styled.div`
  width: ${props => props.isMobile ? "100%" : "calc(100% + 20vw)"};
  position: absolute;
  top: 130px;
  left:  ${props => props.isMobile ? "0" : "-20vw"};
  z-index: 1;
  height: 80px;
`;

const Bar = styled.div.attrs((props) => ({
  style: {
    width: props.progress,
  },
}))`
  height: 100%;
  background: rgb(255, 103, 0);
  background: linear-gradient(
    90deg,
    rgba(255, 103, 0, 1) 0%,
    rgba(216, 49, 91, 1) 100%
  );
  overflow: hidden;
`;

const NameBorder = styled.hr`
  height: 5px;
  border: 0;
  background: rgb(255, 103, 0);
  background: linear-gradient(
    90deg,
    rgba(255, 103, 0, 1) 0%,
    rgba(216, 49, 91, 1) 100%
  );
  box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.2);
  z-index: 2;
  width: 100%;

  position: absolute;
  top: ${(props) => props.position === "top" && 0};
  bottom: ${(props) => props.position === "bottom" && 0};
`;

const Name = styled.h1`
  font-style: italic;
  font-size: 48px;
  font-weight: 200;
  color: ${(props) => props.theme.white};
  text-shadow: 5px 5px 3px rgba(0, 0, 0, 0.2);

  position: absolute;
  left: calc(20vw + 20px);
  top: 50%;
  transform: translateY(-50%);
`;

const Time = styled.h1`
  font-style: italic;
  font-size: 48px;
  font-weight: 400;
  color: ${(props) => props.theme.navy};
  text-shadow: 5px 5px 3px rgba(0, 0, 0, 0.2);

  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
`;

const StyledSlider = styled(Slider)`
  height: 80px !important;
  width: calc(100% - 30px) !important;
  position: absolute;
  left: 0;
  bottom: 50%;
  transform: translateY(-50%);
  opacity: 0;
  z-index: 5;
`;

function Playbar({ spotify }) {
  const [{ user, item, playing }, dispatch] = useStateValue();
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const handleSliderChange = (event, newValue) => {
    setTime(newValue);
    spotify.seek(newValue);
  };

  function millisToMinutesAndSeconds(millis) {
    if (!millis) return "0:00";
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((track) => {
      setTime(track?.progress_ms);
      setDuration(track?.item?.duration_ms);
    });
  }, [spotify, item]);

  useEffect(() => {
    if (time >= duration) {
      setTime(0);
      spotify.getMyCurrentPlaybackState().then((track) => {
        setDuration(track?.item?.duration_ms);
      });
    }
    if (millisToMinutesAndSeconds(time) === "0:01") {
      spotify.getMyCurrentPlaybackState().then((track) => {
        if (millisToMinutesAndSeconds(time) === "0:01") {
          dispatch({
            type: "SET_ITEM",
            item: track.item,
          });
        }
      });
    }
    setProgress((time / duration) * 100);
    const interval = setInterval(() => {
      playing && setTime((prevState) => prevState + 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, [spotify, duration, time, dispatch, playing]);

  return (
    <NameContainer isMobile={isTabletOrMobile}>
      <Bar progress={progress + "%"} />
      {duration && (
        <StyledSlider
          value={time}
          min={0}
          step={1}
          max={duration}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
        />
      )}
      <NameBorder position={"top"} />
      {!isTabletOrMobile && <Name>{user?.display_name}</Name>}
      <Time>
        {millisToMinutesAndSeconds(time)}/{millisToMinutesAndSeconds(duration)}
      </Time>
      <NameBorder position={"bottom"} />
    </NameContainer>
  );
}

export default Playbar;
