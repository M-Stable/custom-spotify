import React from "react";
import styled from "styled-components";
import { accessUrl } from "../Helpers/spotify";

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginButton = styled.a`
  background-color: #1db954;
  color: white;
  text-decoration: none;
  padding: 20px;
  border-radius: 100px;
  font-weight: bold;
`;

function Login(props) {
  return (
    <PageContainer>
      <LoginButton href={accessUrl}>Login with Spotify</LoginButton>
    </PageContainer>
  );
}

export default Login;
