import React, { useState } from "react";
import styled from "styled-components";
import SpotifyPlayer from "./Components/SpotifyPlayer";
import Playlists from "./Components/Playlists";
import ProfileImage from "./Components/ProfileImage";
import Playbar from "./Components/Playbar";
import TopArtists from "./Components/TopArtists";
import DeviceWarning from "./Components/DeviceWarning";
import { useMediaQuery } from "react-responsive";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import DrawerContent from "./Components/DrawerContent";
import ParticleBackground from "./Components/ParticleBackground";

const Wrapper = styled.div`
  display: flex;
`;

const SideBar = styled.section`
  width: calc(20vw - 100px);
  min-width: 200px;
  height: calc(100vh - 20px);
  padding: 20px 50px 0 50px;
  background: ${(props) => props.theme.navy};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const SideDrawer = styled.section`
  height: calc(100vh - 20px);
  padding: 20px 30px;
  background: ${(props) => props.theme.navy};
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.section`
  width: ${(props) =>
    props.isMobile ? "calc(100vw - 40px)" : "calc(80vw - 40px)"};
  height: calc(100vh - 270px);
  padding: 250px 20px 20px 20px;
  position: relative;
  display: flex;
  justify-content: center;

  background: #263a52;
  background: rgb(238,174,202);
  background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: auto;
  width: ${(props) => props.isMobile && "380px"};
  z-index: 5;

  /* width */
  ::-webkit-scrollbar {
    height: 16px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 30px;
    background: ${(props) => props.theme.gray};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 30px;
    background: ${(props) => props.theme.pink};
  }
`;

export const MenuButton = styled.button`
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translate(-50%, 0);
  height: 50px;
  width: 50px;
  background: transparent;
  color: ${(props) => props.theme.white};
  border-radius: 100px;
  border: 3px solid;
  opacity: 0.8;
  transition: 0.1s;
  outline: none;
  z-index: 5;

  &:hover {
    opacity: 1;
    color: ${(props) => props.theme.pink};
  }
`;

function Home({ spotify }) {
  const [deviceExist, setDeviceExist] = useState(true);
  const [open, setOpen] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <Wrapper>
      {!isTabletOrMobile && (
        <SideBar>
          <ProfileImage />
          <Playlists spotify={spotify} setDeviceExist={setDeviceExist} />
        </SideBar>
      )}
      {isTabletOrMobile && (
        <MenuButton onClick={() => setOpen(true)}>
          <MenuIcon />
        </MenuButton>
      )}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <SideDrawer>
          <DrawerContent setOpen={setOpen} setDeviceExist={setDeviceExist} />
        </SideDrawer>
      </Drawer>
      <MainContent isMobile={isTabletOrMobile}>
        <ParticleBackground />
        {!deviceExist && <DeviceWarning />}
        <Playbar spotify={spotify} />
        <CardContainer>
          <SpotifyPlayer spotify={spotify} />
          {!isTabletOrMobile && (
            <TopArtists
              showArtists={true}
              spotify={spotify}
              setDeviceExist={setDeviceExist}
            />
          )}
          {!isTabletOrMobile && (
            <TopArtists
              showArtists={false}
              spotify={spotify}
              setDeviceExist={setDeviceExist}
            />
          )}
        </CardContainer>
      </MainContent>
    </Wrapper>
  );
}

export default Home;
