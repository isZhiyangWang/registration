import { FlexCenterStyle, WholeContainer, HideScrollBar, Appear } from "@/styles/common";
import styled from "styled-components";

export const BigWrapper = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
${HideScrollBar}
`;

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
  flex-direction: column;

  font-family: EB Garamond, Times New Roman, Times, serif;
  font-size: 1vw;
  transition: all 0.5s;
  color: rgba(245, 245, 245, 1);
  background: blue;

  transform-origin: top left;
  cursor: none;

  ${HideScrollBar}
`;

export const InnerContainer = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}

transform-origin: center center;
`;

export const Wrapper = styled.div`
  ${WholeContainer}
`;

export const BackgroundGrid = styled.div`
  ${WholeContainer}
  display: flex;
  flex-direction: column;
  top: 0;
`;

export const Line = styled.div`
  width: 100vw;
  height: 2.5vh;
  box-sizing: border-box;
  border-bottom: 0.05vw solid white;
  animation: ${Appear} 0.4s ease-in-out;
`;

export const P = styled.div`
  position: absolute;
  width: 100%;
`;

export const Age = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
  font-size: 10vw;
  color: white;
  // mix-blend-mode: difference;
`;

export const Intro = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
  flex-direction: column;

  p {
    margin-top: 2vw;
  }
`;

export const Call = styled.div`
  width: 30vw;
  height: 30vh;
  backdrop-filter: blur(0.1vw);
  -webkit-backdrop-filter: blur(0.1vw);
  border-radius: 0.5vw;
  background: rgba(255, 255, 255, 0.2);
`;

export const Overlay = styled.div`
  ${WholeContainer}
  z-index: 100;
  pointer-events: none;
  position: fixed;
  mix-blend-mode: difference;
`;
