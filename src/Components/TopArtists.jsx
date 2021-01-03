import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useStateValue } from "../StateProvider";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { PlaylistImage, Dimmer } from "./Playlists";

export const slideUp = keyframes`
  from {
    transform: translateY(-500px);
  }

  to {
    transform: translateY(0);
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  width: 400px;
  // min-width: 340px;
  // height: 650px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  position: relative;
  margin: 20px;

  animation: ${slideUp} 1s, ${fadeIn} 1s;
`;

const HeaderContainer = styled.section`
  width: 100%;
  height: 20%;
  background: ${(props) =>
    props.showArtists ? props.theme.orange : props.theme.pink};
  color: ${(props) => props.theme.white};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;

  h1 {
    font-size: 32px;
    font-weight: 200;
    text-align: center;
  }
`;

const ImageSection = styled.section`
  width: 100%;
  height: 80%;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  position: relative;
  z-index: 2;

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
    background: ${(props) =>
      props.showArtists ? props.theme.orange : props.theme.pink};
  }
`;

const SectionBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: ${(props) => props.theme.white};
  opacity: 0.5;
  z-index: 1;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  width: 150px;
  margin: 10px;
`;

const TextContainer = styled.div`
  white-space: wrap;
  width: 160px;
  text-align: center;

  p {
    font-style: italic;
    text-transform: uppercase;
  }

  z-index: 2;
`;

const StlyedPlaylistImage = styled(PlaylistImage)`
  height: 150px;
  width: 150px;
  margin-bottom: 5px;
  padding-top: 0;
`;

const PlayButton = styled(PlayCircleOutlineIcon)`
  color: ${(props) =>
    props.showartists ? props.theme.orange : props.theme.pink};
  font-size: 80px !important;
  opacity: ${(props) => (props.isplaying ? "1" : "0")};
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function TopArtists({ showArtists, spotify, setDeviceExist }) {
  const [{ artists, tracks, item }, dispatch] = useStateValue();
  const [uri, setUri] = useState(null);

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      r.context ? setUri(r?.context?.uri) : setUri(r?.item?.uri);
    });
  }, [spotify, item]);

  const handlePlay = (uri) => {
    spotify.getMyDevices().then((devices) => {
      devices.devices.length === 0 ? setDeviceExist(false) : setDeviceExist(true);
      const options = {
        device_id: devices.devices[0]?.id,
      };
      if (uri.includes("track")) {
        options.uris = [uri];
      } else if (uri.includes("artist")) {
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

  const renderArtists = artists.map((artist, index) => {
    return (
      <ImageContainer key={index}>
        <StlyedPlaylistImage
          onClick={() => handlePlay(artist?.uri)}
          image={artist?.images[0]?.url}
        >
          <Dimmer isplaying={artist.uri === uri ? 1 : 0} />
          <PlayButton
            isplaying={artist.uri === uri ? 1 : 0}
            showartists={showArtists ? 1 : 0}
          />
        </StlyedPlaylistImage>
        <TextContainer>
          <p>
            #{index + 1} {artist?.name}
          </p>
        </TextContainer>
      </ImageContainer>
    );
  });

  const renderTracks = tracks.map((track, index) => {
    return (
      <ImageContainer key={index}>
        <StlyedPlaylistImage
          onClick={() => handlePlay(track?.uri)}
          image={track?.album?.images[0]?.url}
        >
          <Dimmer isplaying={track.uri === uri ? 1 : 0} />
          <PlayButton
            isplaying={track.uri === uri ? 1 : 0}
            showartists={showArtists ? 1 : 0}
          />
        </StlyedPlaylistImage>
        <TextContainer>
          <p>
            #{index + 1} {track?.name}
          </p>
        </TextContainer>
      </ImageContainer>
    );
  });

  return (
    <Container>
      <HeaderContainer showArtists={showArtists}>
        {showArtists ? <h1>Your Top Artists</h1> : <h1>Your Top Tracks</h1>}
      </HeaderContainer>
      <ImageSection showArtists={showArtists}>
        {showArtists ? renderArtists : renderTracks}
      </ImageSection>
      <SectionBackground />
    </Container>
  );
}

export default TopArtists;
