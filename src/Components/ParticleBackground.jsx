import React from "react";
import Particles from "react-particles-js";
import styled from "styled-components";

const BackgroundImage = styled(Particles)`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
`;

function ParticleBackground(props) {
  return (
    <BackgroundImage
      params={{
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 1500,
            },
          },
          color: {
            value: "#E9ECF5",
          },
          line_linked: {
            enable: true,
            opacity: 0.08,
          },
          move: {
            direction: "right",
            speed: 0.1,
          },
          size: {
            value: 2,
          },
          opacity: {
            anim: {
              enable: true,
              speed: 2,
              opacity_min: 0.1,
            },
          },
        },
        interactivity: {
          events: {
            onclick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            push: {
              particles_nb: 1,
            },
          },
        },
        retina_detect: true,
      }}
    />
  );
}

export default ParticleBackground;
