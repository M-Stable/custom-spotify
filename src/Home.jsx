import React from "react";
import styled from "styled-components";
import SpotifyPlayer from "./Components/SpotifyPlayer";
import Playlists from "./Components/Playlists";
import ProfileImage from "./Components/ProfileImage";
import anime_castle from "./Images/anime_castle.jpg";
import Playbar from "./Components/Playbar";
import TopArtists from "./Components/TopArtists";

const Wrapper = styled.div`
  display: flex;
`;

const SideBar = styled.section`
  width: calc(20vw - 100px);
  min-width: 280px;
  height: calc(100vh - 20px);
  padding: 20px 50px 0 50px;
  background: ${(props) => props.theme.navy};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const MainContent = styled.section`
  width: calc(80vw - 40px);
  min-height: calc(100vh - 40px);
  padding: 20px;
  position: relative;
`;

const CardContainer = styled.div`
  display: flex;
  width: calc(100% - 200px);
  justify-content: space-between;

  // overflow-x: scroll;

  position: absolute;
  bottom: 60px;
  left: 100px;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${(props) => props.theme.gray};
  background: #FFCE51;
`;

const Image = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;
  transform: scale(1.1);
  filter: blur(2px);
  -webkit-filter: blur(2px);
`;

function Home({ spotify }) {
  return (
    <Wrapper>
      <SideBar>
        <ProfileImage />
        <Playlists spotify={spotify} />
      </SideBar>
      <MainContent>
        <BackgroundImage>
          {/* <Image src={anime_castle} alt="background_image" /> */}
        </BackgroundImage>
        <Playbar spotify={spotify} />
        <CardContainer>
          <TopArtists showArtists={true} />
          <SpotifyPlayer spotify={spotify} />

          <TopArtists showArtists={false} />
        </CardContainer>
      </MainContent>
    </Wrapper>
  );
}

export default Home;
