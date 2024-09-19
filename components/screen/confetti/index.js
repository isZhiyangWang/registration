import { useCallback, useState, useEffect, useRef } from "react";
import * as S from "./styles";

import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

export default function ConfettiEl({ triggerConfetti }) {
  const [conductor, setConductor] = useState();
  const [crossFire, setCrossFire] = useState();

  useEffect(() => {
    if (triggerConfetti) {
      conductor?.run({ speed: 10 });
    }
  }, [triggerConfetti, conductor, crossFire]);

  return (
    <div
      style={
        {
          // mixBlendMode: "difference",
        }
      }
    >
      <S.Container>
        <Fireworks onInit={({ conductor }) => setConductor(conductor)} />
      </S.Container>
    </div>
  );
}
