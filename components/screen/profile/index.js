import * as S from "./styles";

export default function ProfileEl({ pic }) {
  return (
    <S.Container>
      {new Array(10).fill(0).map((_, i) => (
        <img
          src={pic}
          style={{
            width: `${(i + 1) * 10 + 10}vw`,
            height: `${(10 - i) * 10 + 10}vw`,
            animationDelay: `${1 - Math.abs(i - 4) * 0.2}s`,
          }}
        />
      ))}
    </S.Container>
  );
}
