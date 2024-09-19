import * as S from "./styles";
import { MdOutlineEmail } from "react-icons/md";

const EMAIL_LOCS = [
  { top: 1, left: 1 },
  { top: 1, left: 2 },
  { top: 2, left: 2 },
  { top: 2, left: 1 },
  { top: 2, left: 0 },
  { top: 1, left: 0 },
  { top: 0, left: 0 },
  { top: 0, left: 1 },
  { top: 0, left: 2 },
  { top: 0, left: 3 },
  { top: 1, left: 3 },
  { top: 2, left: 3 },
  { top: 3, left: 3 },
  { top: 3, left: 2 },
  { top: 3, left: 1 },
  { top: 3, left: 0 },
];

export default function EmailEl({ emailValues, finalValue, lang }) {
  const totalEmails = Math.min(Math.floor(emailValues.length ** 1.2), 32);

  const emailsToRender = Array.from({ length: totalEmails }, (_, i) => {
    const isFirstSet = i < 16;
    const index = isFirstSet ? i : i - 16;
    const position = isFirstSet
      ? {
          left: `${EMAIL_LOCS[index].left * 25}vw`,
          top: `${EMAIL_LOCS[index].top * 25}vh`,
        }
      : {
          left: `${Math.floor(index / 4) * 25}vw`,
          top: `${(index % 4) * 25}vh`,
          transform: "rotate(90deg)",
        };

    const contentProps = {
      finalValue,
      lang,
      background: isFirstSet ? `linear-gradient(hsl(${90 + index * 10}, 100%, 50%), hsl(${270 + index * 10}, 100%, 50%))` : "linear-gradient(hsl(0, 100%, 50%), hsl(180, 100%, 50%))",
      mainBackground: isFirstSet ? `rgba(0, 255, 0, 0.5)` : "blue",
      height: isFirstSet ? "25vh" : "25vw",
    };

    return (
      <S.Email key={i} style={{ position: "absolute", ...position }}>
        <SingleContent {...contentProps} />
      </S.Email>
    );
  });

  return <S.Emails>{emailsToRender}</S.Emails>;
}

function SingleContent({ height, finalValue, background = "linear-gradient(hsl(90, 100%, 50%), hsl(270, 100%, 50%))", mainBackground = "rgba(0, 255, 0, 0.4)", lang }) {
  return (
    <S.Contents style={{ background: mainBackground, height }}>
      <S.Header style={{ background }}>
        <S.Icon>
          <MdOutlineEmail />
        </S.Icon>
        {finalValue.email}
        {lang === "ko" ? "님, 50% 할인 받으세요" : ", get 50% off"}
      </S.Header>
      <S.Inner>
        <p>
          {lang === "ko" ? "친애하는" : "Dear"}{" "}
          <b>
            {finalValue.firstName} {finalValue.lastName}
          </b>
          {lang === "ko" ? "님," : ","}
        </p>
        <p>
          {lang === "ko" ? "이메일을 남겨주셔서 감사합니다:" : "Thank you for leaving your email:"} <strong>{finalValue.email}</strong>!
        </p>
        <p>
          {lang === "ko"
            ? "저희 열정적인 커뮤니티에 가입해주셔서 매우 기쁩니다. 🚀 감사의 표시로, 당신만을 위한 특별한 선물을 준비했습니다. 저희의 모든 신제품에 대해 독점적으로 50% 할인을 받으세요!"
            : "We're thrilled to have you join our community of enthusiasts. 🚀 As a token of our appreciation, we've prepared a special surprise just for you. Get an exclusive 50% off on every new product we have!"}
        </p>
        <p>{lang === "ko" ? "더 많은 놀라움이 다가오니 계속 지켜봐주세요! 🌈" : "Stay tuned for more surprises coming your way! 🌈"}</p>
      </S.Inner>
    </S.Contents>
  );
}
