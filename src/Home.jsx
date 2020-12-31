import React from "react";
import CoverSection from "./Components/CoverSection";
import styled from "styled-components";
import SpotifyPlayer from "./Components/SpotifyPlayer";
import Playlists from "./Components/Playlists";
import ProfileImage from "./Components/ProfileImage";
import anime_castle from "./Images/anime_castle.jpg";

const MainSection = styled.div`
  min-height: calc(70vh - 40px);
  padding: 20px;
  background: #cedae1;
`;

const SpotifyContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 35vw;
`;

const Wrapper = styled.div`
  display: flex;
`;

const SideBar = styled.section`
  min-width: calc(20vw - 100px);
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
  // background: ${(props) => props.theme.white};
  background: ${(props) => `url(${props.image})`};
`;

function Home({ spotify }) {
  return (
    <Wrapper>
      <SideBar>
        <ProfileImage />
        <Playlists spotify={spotify} />
      </SideBar>
      <MainContent image={anime_castle}>
        <SpotifyPlayer spotify={spotify} />
      </MainContent>
      {/* <CoverSection />
      <MainSection>
        <SpotifyContainer>
          <SpotifyPlayer spotify={spotify} />
          <Playlists spotify={spotify} />
        </SpotifyContainer>
      </MainSection> */}
    </Wrapper>
  );
}

export default Home;
