import * as S from "./styles";

export default function Intro({ handleIntroClick, guidance = "" }) {
  return (
    <S.Container onClick={handleIntroClick}>
      <h1>Enter</h1>
      {guidance !== "" && <p>{guidance}</p>}
    </S.Container>
  );
}
