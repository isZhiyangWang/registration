import * as S from "./styles";
import { useState } from "react";

import useResize from "@/utils/hooks/useResize";
import { QRCodeSVG } from "qrcode.react";

const sampleData = {
  title: "Scrolling Times",
  medium: "2 Screens, 1 Mobile",
};

export default function Intro({ url, lang = "en", metaData = sampleData, handleClick = () => {} }) {
  const [clicked, setClicked] = useState(false);

  const [windowWidth, windowHeight] = useResize();

  return (
    <S.Container clicked={clicked} onClick={handleClick}>
      <S.Upper>
        <S.UpperLeft>
          <h1>{metaData.title}</h1>
          <p>Multi-Device Web Artwork</p>
          <p>{metaData.medium}</p>
        </S.UpperLeft>

        {lang === "en" ? <p>Jeanyoon Choi</p> : <p>최정윤</p>}
      </S.Upper>

      <S.Inner>
        <S.ImgContainer>
          <QRCodeSVG value={url + `?lang=${lang}`} size={windowWidth * 0.15} bgColor="transparent" />
        </S.ImgContainer>

        <S.Texts>
          {lang === "en" ? <p>Scan the QR code to start.</p> : <p>QR 코드를 스캔하여 시작하세요.</p>}
          {lang === "en" ? <p>This is an interactive artwork.</p> : <p>본 작품은 인터랙티브 작품입니다.</p>}
        </S.Texts>
      </S.Inner>
    </S.Container>
  );
}
