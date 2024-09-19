import { FlexCenterStyle, WholeContainer } from "@/styles/common";
import styled from "styled-components";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}


  img {
    width: 30vw;
    height: 30vw;
    mix-blend-mode: difference;
    position: absolute;

    animation: appear 0.2s both;
  }

  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
