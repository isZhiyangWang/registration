import { FlexCenterStyle, WholeContainer } from "@/styles/common";
import styled from "styled-components";

export const MapEl = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  opacity: 1;
`;

export const SingleMap = styled.div`
  position: absolute;
  width: 25vw;
  height: 25vh;

  .gmnoprint {
    display: none;
  }

  img {
    display: none;
  }
`;
