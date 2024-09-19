import { Suspense, Fragment, useState, useMemo, useEffect, useRef } from "react";
import * as S from "./styles";
import useResize from "@/utils/hooks/useResize";

import { IoIosCall } from "react-icons/io";

const getRandom = (a, b) => Math.random() * (b - a) + a;

function playTone(synth) {
  try {
    synth.triggerAttackRelease("C2", "8n");
  } catch (e) {
    console.log(e);
  }
}

const AUDIO_URL = `https://operating-as-usual.vercel.app/INTERNETINENTAL/sounds/iphone/iphone-0.mp3`;

function playAudio() {
  const audio = new Audio(AUDIO_URL);
  audio.play();
}

export default function CallEl({ phoneValues, finalValue, synth, lang }) {
  const [windowWidth, windowHeight] = useResize();

  const [len, setLen] = useState(0);
  const lenRef = useRef(0);
  useEffect(() => {
    lenRef.current = len;
  }, [len]);

  useEffect(() => {
    let target = Math.min((phoneValues.length * (phoneValues.length + 1)) / 2, 200);
    const interval = setInterval(() => {
      if (lenRef.current >= target) {
        clearInterval(interval);
        return;
      }
      setLen((l) => l + 1);
    }, 20);
    playAudio();
    return () => clearInterval(interval);
  }, [phoneValues]);

  const pos = useMemo(() => {
    return new Array(len).fill(0).map((_, i) => ({
      r: Math.pow(i, 0.5) * windowWidth * 0.03,
      theta: (Math.PI * 2 * ((i * 1.1) % 10)) / 10,
    }));
  }, [len, windowWidth, windowHeight]);

  return (
    <S.Calls>
      {pos.map((p, i) => (
        <SingleCall
          key={i}
          lang={lang}
          style={{
            transform: `translate(${p.r * Math.cos(p.theta)}px, ${p.r * Math.sin(p.theta)}px)`,
          }}
        />
      ))}
    </S.Calls>
  );
}

function SingleCall({ style, lang }) {
  return (
    <S.Call style={{ ...style }}>
      <p>{lang === "ko" ? "특별 프로모션" : "Special Promotion"}</p>

      <S.Buttons>
        <S.SingleButton>
          <S.Button type={"decline"}>
            <IoIosCall />
          </S.Button>
          <p>Decline</p>
        </S.SingleButton>

        <S.SingleButton>
          <S.Button>
            <IoIosCall />
          </S.Button>
          <p>Accept</p>
        </S.SingleButton>
      </S.Buttons>
    </S.Call>
  );
}
