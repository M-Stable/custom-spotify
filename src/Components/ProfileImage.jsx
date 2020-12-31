import React from "react";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";

const ImageContainer = styled.div`
  height: 200px;
  width: 200px;
  position: relative;
  margin: 50px 0;
`;

const ImageDecorator = styled.div`
  height: calc(100% - 10px);
  width: calc(100% - 10px);
  border: 5px solid #ff6700;
  box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: ${(props) => props.yOffset};
  left: ${(props) => props.xOffset};
  z-index: 1;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 2;
`;

function ProfileImage(props) {
  const [{ user }] = useStateValue();

  return (
    <ImageContainer>
      <ImageDecorator xOffset={"15px"} yOffset={"-15px"} />
      <ImageDecorator xOffset={"-15px"} yOffset={"15px"} />
      <Image src={user?.images[0]?.url} alt="profile-picture" />
    </ImageContainer>
  );
}

export default ProfileImage;
