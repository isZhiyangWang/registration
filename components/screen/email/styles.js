import { FlexCenterStyle, WholeContainer } from "@/styles/common";
import styled from "styled-components";

export const Emails = styled.div`
  ${WholeContainer}
  transform-origin: center center;
  mix-blend-mode: difference;
`;

export const Email = styled.div`
  color: black;

  width: 25vw;
  height: 25vh;
  ${FlexCenterStyle}
`;

export const Contents = styled.div`
  font-family: "Raleway", sans-serif;
  margin: 0;
  padding: 0;
  width: 25vw;
  height: 25vh;

  margin: 0vw;
  padding: 0;
  font-size: 1vw;

  h2 {
    color: #0066cc;
  }

  p {
    line-height: 1.2;
  }

  a {
    color: #0066cc;
    text-decoration: none;
    font-weight: bold;
  }

  a:hover {
    text-decoration: underline;
  }

  b {
    text-shadow: 0 0 1vw white;
  }
`;

export const Header = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.5vw;
  font-weight: bold;
  position: relative;
  height: 4vw;
  background: red;

  ${FlexCenterStyle}
`;

export const Icon = styled.div`
  font-size: 3vw;
  position: absolute;
  left: 1vw;
  top: 0;
  bottom: 0;
  height: 4vw;
  ${FlexCenterStyle}
`;

export const Inner = styled.div`
  width: 22.5vw;
  margin-left: 1.25vw;
  height: 19vw;
  margin-top: 1.5vw;
`;
