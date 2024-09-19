import { FlexCenterStyle, WholeContainer } from "@/styles/common";
import styled from "styled-components";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
  flex-direction: column;
  font-size: 3vw;
  background: black;
  color: white;
  cursor: pointer;

  p {
    font-size: 4vw;
    max-width: 80%;
    text-align: center;
    margin-top: 5vw;
  }
`;
