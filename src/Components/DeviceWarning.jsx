import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background: ${(props) => props.theme.pink};
  color: ${(props) => props.theme.white};
  border-radius: 100px;
  padding: 5px 10px;

  position: absolute;
  top: 30px;
  left: 50%;
  transform: translate(-50%, 0);

  h2 {
      font-weight: 200;
  }
`;

function DeviceWarning(props) {
  return (
    <Container>
      <h2>No device found. Open Spotify and try again.</h2>
    </Container>
  );
}

export default DeviceWarning;
