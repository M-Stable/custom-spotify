import React from "react";
import styled from "styled-components";
import anime_castle from "../Images/anime_castle.jpg";
import { useStateValue } from "../StateProvider";

const Container = styled.section`
  height: 30vh;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;

const CoverImage = styled.div`
  height: 30vh;
  width: 100%;
  background: url(${anime_castle});
  filter: blur(2px);
  -webkit-filter: blur(2px);

  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const ImageContainer = styled.div`
  height: 200px;
  width: 200px;
  position: relative;
  margin-left: 100px;
`;

const ImageDecorator = styled.div`
  height: calc(100% - 10px);
  width: calc(100% - 10px);
  border: 5px solid #FF6700;
  box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: ${props => props.yOffset};
  left: ${props => props.xOffset};
  z-index: -1;
`;

const ProfileImage = styled.img`
  height: 100%;
  width: 100%;
  box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.2);
`;

const NameContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: -1;
  height: 80px;
`;

const NameBorder = styled.hr`
  height: 5px;
  border: 0;
  background: #D8315B;
  box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.2);
  z-index: 2;
  width: 100%;

  position: absolute;
  top: ${props => props.position === "top" && 0};
  bottom: ${props => props.position === "bottom" && 0};
`;

const Name = styled.h1`
  font-style: italic;
  font-size: 48px;
  font-weight: 400;
  color: white;
  text-shadow: 5px 5px 3px rgba(0, 0, 0, 0.2);

  position: absolute;
  left: 350px;
  top: 50%;
  transform: translateY(-50%);
`;

function CoverSection(props) {
  const [{ user }] = useStateValue();

  return (
    <Container>
      <CoverImage />
      <ImageContainer>
        <ImageDecorator xOffset={"15px"} yOffset={"-15px"}/>
        <ImageDecorator xOffset={"-15px"} yOffset={"15px"}/>
        <ProfileImage src={user?.images[0]?.url} alt="profile-picture" />
      </ImageContainer>
      <NameContainer>
        <NameBorder position={"top"}/>
        <Name>{user?.display_name}</Name>
        <NameBorder position={"bottom"}/>
      </NameContainer>
    </Container>
  );
}

export default CoverSection;
