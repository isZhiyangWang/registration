import { FlexCenterStyle, WholeContainer } from "@/styles/common";
import styled from "styled-components";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
  width: 100vw;

  transform-origin: center center;
  font-family: Raleway;

  // mix-blend-mode: difference;
  // background: linear-gradient(blue, yellow);
`;

export const ToasterColumn = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;

  justify-content: flex-end;
`;

export const SingleToaster = styled.div`
  background: radial-gradient(rgba(255, 0, 0, 1), rgba(200, 0, 0, 1));
  width: 40vw;
  height: 3vw;
  margin: 0.3vw 0;

  ${FlexCenterStyle}
  font-size: 1.8vw;
  // @keyframes appear {
  //   from {
  //     height: 0;
  //   }
  //   to {
  //     height: 3vw;
  //   }
  // }
  border-radius: 0.5vw;

  // animation: appear 0.5s both;
`;
