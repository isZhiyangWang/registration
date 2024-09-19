import * as S from "./styles";
import { useState, useEffect, useRef } from "react";

export default function TextAppear({ text, style, intervalms = 40, doNotAnimate = false }) {
  const [displayText, setDisplayText] = useState("");
  const displayTextLengthRef = useRef(0);
  const intervalMsRef = useRef(40);

  useEffect(() => {
    displayTextLengthRef.current = displayText.length;
  }, [displayText]);

  useEffect(() => {
    intervalMsRef.current = intervalms;
  }, [intervalms]);

  const intervalRef = useRef();

  useEffect(() => {
    if (text && doNotAnimate) {
      setDisplayText(text);
    }
    if (text && !doNotAnimate) {
      setDisplayText("");
      intervalRef.current = setInterval(() => {
        displayTextLengthRef.current++;
        setDisplayText(text.slice(0, displayTextLengthRef.current));
        if (displayTextLengthRef.current >= text.length && intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }, intervalMsRef.current || 50);
      return () => {
        intervalRef.current && clearInterval(intervalRef.current);
      };
    }
  }, [text, doNotAnimate]);

  return <S.P style={{ ...style }}>{displayText}</S.P>;
}
