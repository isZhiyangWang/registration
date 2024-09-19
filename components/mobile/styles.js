import { FlexCenterStyle, WholeContainer, HideScrollBar } from "@/styles/common";
import styled from "styled-components";

export const Container = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};
  ${HideScrollBar};

  justify-content: flex-start;
  // align-items: center;
  // justify-content: center;

  flex-direction: column;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x pan-y;
  position: fixed;

  overflow-y: scroll;

  font-family: "Raleway", sans-serif;
  transition: all 0.1s;
  color: white;
  background: black;
`;

export const Single = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1.5rem;
  width: 70vw;

  p {
    font-size: 1.2rem;
    text-align: left;
    margin-bottom: 1rem;
  }

  select {
    margin-right: 1rem;
    padding: 0;
    padding-bottom: 0.2rem;
    outline: 0;
    border: none;

    font-family: "Raleway", sans-serif;

    border-bottom: 2px solid #aaa;
    border-radius: 0;
    font-size: 1.2rem;
    width: 70vw;
    font-weight: 400;
    background: black;
    outline: none;
    margin: 0 !important;
    padding: 0 !important;
    text-indent: 0;
    color: white;

    // -webkit-appearance: none;

    &::-ms-expand {
      display: block;
    }
  }

  option {
    font-size: 1.2rem;
    font-weight: 400;
    color: white;

    font-family: "Raleway", sans-serif;

    background: transparent;
    outline: none;
    margin: 0 !important;
    padding: 0 !important;
  }
`;

export const Input = styled.input.attrs({
  type: "text",
  autoComplete: "off",
  autocomplete: "off",
})`
  position: relative;
  text-indent: 0.25rem;
  autocomplete: off;
  background: transparent !important;
  margin-right: 1rem;
  padding: 0;
  padding-bottom: 0.2rem;
  outline: 0;
  border: none;
  border-bottom: 2px solid #aaa;
  font-size: 1.5rem;
  width: 70vw;
  font-weight: 400;
  color: white;
  font-family: "Raleway", sans-serif;

  transition: all 0.3s;

  &:focus {
    border-bottom: 2px solid white;
  }

  ${({ highlighted }) => highlighted && `border-bottom: 2px solid #aaa;`}

  &::placeholder {
    font-size: 1.2rem;
    color: #aaa;
  }
`;

export const Photo = styled.div`
  width: 13rem;
  height: 5rem;
  border-radius: 1rem;
  border: 1px dashed white;
  ${FlexCenterStyle}

  input {
    width: 13rem;
    height: 5rem;
    opacity: 0;
  }
`;

export const Loading = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  ${FlexCenterStyle}
`;

export const Indicator = styled.div`
  position: absolute;
  color: #aaa;
  font-size: 1.2rem;
  pointer-events: none;
  margin-left: 0.3rem;
`;

export const Checkbox = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  color: white;
  ${FlexCenterStyle}
  font-size: 1.5rem;
  border-radius: 0.3rem;
  font-weight: bold;
  margin-right: 0.8rem;

  background: ${({ checked }) => (!checked ? "white" : "hsl(180, 100%, 40%)")};
`;

export const Consent = styled.div`
  width: calc(80vw - 3.5rem);
  font-size: 0.9rem;
`;

export const Button = styled.div`
  background: transparent;
  color: white;
  border: 1px solid hsl(180, 100%, 40%);
  width: 50%;
  box-shadow: 0 0 1rem hsl(180, 100%, 40%);

  padding: 0.4rem 0;
  ${FlexCenterStyle}
  margin-bottom: 10rem;
  margin-top: 2rem;
`;

export const Overlay = styled.div`
  ${WholeContainer}
  z-index: 100;
  pointer-events: none;
  position: fixed;
`;
