import React from "react";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";

const Container = styled.div`
  width: 400px;
  height: 650px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  position: relative;
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
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;

  h1 {
    font-size: 32px;
    font-weight: 200;
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
  margin: 10px 0;
`;

const TextContainer = styled.div`
  white-space: wrap;
  width: 160px;
  text-align: center;

  p {
    font-style: italic;
    text-transform: uppercase;
  }
`;

const Image = styled.img`
  height: 150px;
  width: 150px;
  border: 5px solid ${(props) => props.theme.white};

  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

function TopArtists({ showArtists }) {
  const [{ artists, tracks }] = useStateValue();

  const renderArtists = artists.map((artist, index) => {
    return (
      <ImageContainer key={index}>
        <Image src={artist?.images[0]?.url} alt={artist?.name} />
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
        <Image src={track?.album?.images[0]?.url} alt={track?.name} />
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
