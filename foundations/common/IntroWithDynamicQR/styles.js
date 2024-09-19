import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@/styles/common";

export const Container = styled.div`
  ${FlexCenterStyle};
  ${WholeContainer};
  // flex-direction: column;
  background: radial-gradient(white, #eee);
  font-family: Helvetica, sans-serif;
  cursor: none;
  color: black;

  opacity: ${({ clicked }) => (clicked ? 0 : 1)};
  transition: opacity 1s ease-in-out;
  font-size: 2vw;
  font-weight: lighter;
`;

export const Upper = styled.div`
  position: absolute;
  top: 5vw;
  left: 4vw;
  display: flex;
  width: 92vw;
  justify-content: space-between;
  // align-items: flex-end;
  // border-bottom: 0.1vw solid black;

  h1 {
    font-size: 5vw;
    margin: 0;
    margin-bottom: 1.5vw;
  }

  p {
    font-size: 2vw;
    font-weight: lighter;
  }
`;

export const UpperLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Inner = styled.div`
  position: absolute;
  bottom: 5vw;
  left: 4vw;
  width: 92vw;
  display: flex;
  flex-direction: row;

  // border-bottom: 0.1vw solid black;
`;

export const Texts = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 2vw;

  min-width: 50vw;
  height: 15vw;
  text-align: left;

  justify-content: flex-end;
`;

export const Button = styled.div`
  background: black;
  color: white;
  padding: 1vw 3vw;
  border-radius: 1vw;
  font-size: 2.5vw;
  cursor: pointer;
  margin-top: 2vw;
`;

export const ImgContainer = styled.div`
  width: 15vw;
  height: 15vw;
  margin-left: 0.2vw;

  z-index: 5;

  svg {
    width: 100%;
    height: 100%;
    margin-bottom: 0.5vw;
  }
`;
