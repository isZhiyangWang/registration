import { Suspense, Fragment, useState, useMemo } from "react";
import * as S from "./styles";
import * as Tone from "tone";

import useRandomInterval from "@/utils/hooks/useRandomInterval";

const getRandomInt = (a, b) => Math.floor(Math.random() * (b + 1 - a) + a);
const getRandomFromArr = (arr) => arr[Math.floor(Math.random() * arr.length)];

function playTone(synth, tone = "C3") {
  try {
    synth.triggerAttackRelease(tone, "16n");
  } catch (e) {
    console.log(e);
  }
}

export default function ConsentEl({ consentChecked, lang }) {
  return (
    <div
      style={{
        mixBlendMode: "difference",
      }}
    >
      {consentChecked[2] && (
        <SingleEl
          idx={2}
          lang={lang}
          style={{
            transform: "rotate(90deg)",
            marginLeft: "calc(50vw - 50vh)",
          }}
        />
      )}
      {consentChecked[0] && (
        <SingleEl
          idx={0}
          lang={lang}
          style={{
            transform: "rotate(0deg)",
          }}
        />
      )}
      {consentChecked[2] && (
        <SingleEl
          idx={2}
          lang={lang}
          style={{
            transform: "rotate(-90deg)",
            marginLeft: "calc(50vh - 50vw)",
          }}
        />
      )}
      {consentChecked[1] && (
        <SingleEl
          idx={1}
          lang={lang}
          style={{
            transform: "rotate(180deg)",
          }}
        />
      )}

      {consentChecked[4] && (
        <SingleEl
          idx={4}
          lang={lang}
          style={{
            transform: "rotate(-45deg)",
            marginLeft: "calc(50vw - 50vh)",
          }}
        />
      )}
      {consentChecked[3] && (
        <SingleEl
          idx={3}
          lang={lang}
          style={{
            transform: "rotate(45deg)",
          }}
        />
      )}
      {consentChecked[5] && (
        <SingleEl
          idx={5}
          lang={lang}
          style={{
            transform: "rotate(135deg)",
            marginLeft: "calc(50vh - 50vw)",
          }}
        />
      )}
      {consentChecked[6] && (
        <SingleEl
          idx={6}
          lang={lang}
          style={{
            transform: "rotate(-135deg)",
          }}
        />
      )}
    </div>
  );
}

function SingleEl({ style, idx, lang }) {
  useRandomInterval(handleAddToaster, 10, 100);

  const synth = useMemo(() => new Tone.MembraneSynth().toDestination(), []);

  const [toasters, setToasters] = useState([]);

  const ARR =
    lang === "ko"
      ? [
          "동의해주셔서 감사합니다!",
          "선호 사항이 저장되었습니다!",
          "개인화된 경험을 즐기세요!",
          "동의가 완료되어 기능이 활성화되었습니다!",
          "귀하의 데이터는 더 나은 서비스를 제공합니다!",
          "귀하의 여정을 개인화하게 되어 기쁩니다!",
          "맞춤형 콘텐츠를 준비하세요!",
          "귀하의 신뢰는 저희에게 모든 것입니다!",
          "귀하는 통제하고 있습니다!",
          "귀하의 경험을 최적화하고 있습니다!",
        ]
      : [
          "Thank you for your consent!",
          "Your preferences are saved!",
          "Enjoy personalized experiences!",
          "Consent granted, unlocking features!",
          "Your data helps us serve you better!",
          "We're excited to personalize your journey!",
          "Get ready for tailored content!",
          "Your trust means everything to us!",
          "You're in control!",
          "Optimizing your experience!",
        ];

  function handleAddToaster() {
    playTone(synth, `C${idx}`);
    setToasters((t) =>
      [
        {
          text: getRandomFromArr(ARR),
        },
        ...t,
      ].slice(0, getRandomInt(10, 40))
    );
  }

  return (
    <S.Container style={{ ...style }}>
      <S.ToasterColumn>
        {toasters.map((el, i) => (
          <CustomToaster el={el} key={i} />
        ))}
      </S.ToasterColumn>
    </S.Container>
  );
}

function CustomToaster({ el }) {
  return <S.SingleToaster>{el.text}</S.SingleToaster>;
}
