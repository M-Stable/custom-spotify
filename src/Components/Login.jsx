import React from "react";
import styled from "styled-components";
import { accessUrl } from "../Helpers/spotify";

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background: rgb(57, 62, 96);
  background: radial-gradient(
    circle,
    rgba(57, 62, 96, 1) 0%,
    rgba(37, 40, 61, 1) 100%
  );
`;

const InfoContainer = styled.div`
  width: 550px;
  height: 500px;
  padding: 50px;
  margin: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;

  h1 {
    color: ${(props) => props.theme.orange};
    background-color: rgb(255, 103, 0);
    background-image: linear-gradient(
      90deg,
      rgba(255, 103, 0, 1) 0%,
      rgba(216, 49, 91, 1) 100%
    );
    background-size: 100%;
    background-repeat: repeat;
    font-size: 48px;
    text-align: center;

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
  }

  h2 {
    color: ${(props) => props.theme.white};
    font-weight: 200;
    font-style: italic;
    font-size: 20px;
  }
`;

const LoginButton = styled.a`
  background-color: #1db954;
  color: white;
  text-decoration: none;
  padding: 20px;
  border-radius: 100px;
  font-weight: light;

  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
`;

function Login(props) {
  return (
    <PageContainer>
      <InfoContainer>
        <h1>Custom Spotify Player</h1>

        <br />
        <LoginButton href={accessUrl}>
          <p>Login with Spotify</p>
        </LoginButton>

        <br />
        <h2>
          Note: This requires a Spotify instance open which is signed into your
          account. 
          This does NOT play through the browser.
        </h2>
      </InfoContainer>
    </PageContainer>
  );
}

export default Login;
