import { FlexCenterStyle, WholeContainer } from "@/styles/common";
import styled from "styled-components";

export const Calls = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}

  transform-origin: center center;
  font-family: Raleway;
`;

export const Call = styled.div`
  width: 18vw;
  height: 18vw;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  ${FlexCenterStyle}
  flex-direction: column;
  font-size: 1.5vw;

  // mix-blend-mode: hard-light;
  // background: rgba(190, 190, 190, 0.13);

  mix-blend-mode: difference;
  background: rgba(190, 190, 190, 1);

  border-radius: 1vw;

  backdrop-filter: blur(0.1vw);
  -webkit-backdrop-filter: blur(0.1vw);

  p {
    margin-bottom: 4vw;
  }
`;

const COLOR1 = "hsl(0, 100%, 60%)";
const COLOR2 = "hsl(124, 60%, 60%)";

export const Buttons = styled.div`
  ${FlexCenterStyle}
`;

export const SingleButton = styled.div`
  ${FlexCenterStyle}
  flex-direction: column;
  width: 8vw;

  p {
    margin: 0.5vw 0;
    font-size: 1.1vw;
  }
`;

export const Button = styled.div`
  width: 3.5vw;
  height: 3.5vw;
  font-size: 1.9vw;
  border-radius: 50%;

  // mix-blend-mode: difference;
  z-index: 1000;
  background: ${({ type }) => (type === "decline" ? COLOR1 : COLOR2)};
  box-shadow: 0 0 1vw 0.2vw ${({ type }) => (type === "decline" ? COLOR1 : COLOR2)};
  transform: rotate(${({ type }) => (type === "decline" ? 135 : 0)}deg);

  ${FlexCenterStyle}
  flex-direction: column;
  text-align: center;
`;
