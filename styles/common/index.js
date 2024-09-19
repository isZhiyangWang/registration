import styled, { css, keyframes } from "styled-components";

export const FlexCenterStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HideScrollBar = css`
  &::-webkit-scrollbar {
    display: none !important;
  }

  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    overflow: -moz-scrollbars-none; /* Firefox */
  }

  &::-webkit-scrollbar-track,
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
`;

export const WholeContainer = css`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
`;

export const WContainer = css`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: ${({ theme }) => theme.windowWidth / 3}px;
  height: ${({ theme }) => theme.windowHeight / 3}px;
  transform-origin: 0 0;
  transform: scale(3);
`;

export const MobileContainer = css`
  position: absolute;
  top: 0;
  left: ${({ theme }) => (theme.windowWidth > 768 ? (theme.windowWidth - 768) / 2 : 0)}px;
  overflow: hidden;
  overflow-y: scroll;
  width: ${({ theme }) => (theme.windowWidth > 768 ? 768 : theme.windowWidth)}px;
  height: ${({ theme }) => theme.windowHeight}px;
`;

export const MobileFlex = css`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const DefaultContainer = styled.div`
  ${WholeContainer};
`;

export const DefaultBlackContianer = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};
  background: black;
  color: white;
  font-size: 12px;
`;

export const Appear = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Projector = (isLeft) => css`
  position: absolute;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => (theme.windowWidth * 602) / (isLeft ? 1920 : 1675)}px;
  top: ${({ theme }) => (theme.windowHeight - (theme.windowWidth * 602) / (isLeft ? 1920 : 1675)) / 2}px;
  left: 0;
  overflow: hidden;
`;
