import * as S from "./styles";

import React, { Fragment, useEffect, useRef, useState, useMemo } from "react";

import { LineLoading } from "loplat-ui";

import { useRouter } from "next/router";

import { TITLE, FIELDS, CONSENT_TEXTS, TITLE_KO, FIELDS_KO, CONSENT_TEXTS_KO } from "./constant";
import useSocket from "@/utils/hooks/socket/untitled/useSocketMobile";

export default function Mobile() {
  const router = useRouter();
  const { lang } = router.query;
  //disable pull-to-refresh
  const initTime = useMemo(() => Date.now(), []);

  useEffect(() => {
    const text = lang === "ko" ? "이 작품에는 깜박이는 불빛이 포함되어 있습니다. 시청자 주의를 권장합니다." : "This experience contains flashing lights, viewer discretion is advised.";
    window.alert(text);
  }, []);

  const [data, setData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    age: "",
    address: "",
    email: "",
    phoneNumber: "",
  });

  const dataRef = useRef(data);
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const [showState, setShowState] = useState(0);

  const socket = useSocket({ initTime });

  function handleChange(type, ev) {
    ///TO DO: DISABLE AUTO COMPLETE
    if (dataRef.current) {
      // if (Math.abs(dataRef.current[type].length - ev.target.value, length) >= 2) {
      //   return;
      // }
    }

    socket.current.emit("untitled-new-input", {
      initTime,
      data: {
        [type]: ev.target.value,
      },
    });
    setData((el) => ({
      ...el,
      [type]: ev.target.value,
    }));
  }

  function handleOnBlur(i, ev) {
    if (ev.target.value.length > 0) {
      if (showState === i) {
        setShowState((idx) => idx + 1);
      }
    }
  }

  //image
  const [imageStatus, setImageStatus] = useState("idle");
  const [image, setImage] = useState(null);

  async function handleImageChange(e) {
    //downsize image

    try {
      let targetFile = e.target.files[0];

      if (targetFile.size > 10000000) {
        alert("Image size is too big. Please upload an image less than 10MB");
        return;
      }

      //to data url
      const reader = new FileReader();
      reader.onload = function (e) {
        const image = new Image();
        image.src = e.target.result;

        //if it'

        image.onload = async function () {
          const canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          canvas.getContext("2d").drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);

          //data url
          const dataURL = canvas.toDataURL("image/jpeg", 0.25);
          setImage(dataURL);
          setImageStatus("complete");
          setShowState((s) => Math.max(s, 8));

          let blob = await (await fetch(dataURL)).blob();

          socket.current.emit("untitled-new-photo", {
            blob,
          });
        };
      };

      reader.readAsDataURL(e.target.files[0]);
    } catch (e) {
      console.log(e);
      window.alert("Try Again!");
      setImageStatus("idle");
    }
  }

  const [consentChecked, setConsentChecked] = useState([false, false, false, false, false, false, false, false, false]);

  useEffect(() => {
    if (!socket.current) return;
    socket.current.emit("untitled-new-consent", {
      checked: consentChecked,
    });

    let checkCount = consentChecked.reduce((acc, cur) => acc + (cur ? 1 : 0), 0);
    setShowState((s) => Math.max(s, 8 + checkCount));
  }, [consentChecked]);

  const containerRef = useRef();

  useEffect(() => {
    //scroll to bottom of ref
    if (containerRef.current) {
      //smooth scrolling
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [showState]);

  const [background, setBackground] = useState("transparent");
  const [bgBurst, setBgBurst] = useState(false);

  function handleRegisterClick() {
    setBgBurst(true);
    if (socket && socket.current) {
      socket.current.emit("untitled-new-register");
    }
  }

  useEffect(() => {
    if (bgBurst) {
      const interval = setInterval(() => {
        setBackground((bg) => {
          if (bg === "black") {
            return "white";
          } else {
            return "black";
          }
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [bgBurst]);

  return (
    <S.Container ref={containerRef}>
      <S.Single
        style={{
          marginTop: "20vw",
        }}
      >
        <select
          style={{
            marginLeft: "1rem",
            fontSize: "1.5rem",
          }}
          onBlur={(ev) => handleOnBlur(0, ev)}
          onChange={(ev) => {
            handleChange("title", ev);
            handleOnBlur(0, ev);
          }}
        >
          {(lang === "ko" ? TITLE_KO : TITLE).map((t, i) => (
            <option key={i} value={t.title}>
              {t.title}
            </option>
          ))}
        </select>
      </S.Single>
      {(lang === "ko" ? FIELDS_KO : FIELDS).map((field, i) => (
        <Fragment key={i}>
          {i <= showState && i >= 1 && (
            <S.Single key={i}>
              <S.Input
                type={"text"}
                autoComplete={"off"}
                autocomplete={"off"}
                // placeholder={field.name + "  "}
                value={data[field.id]}
                onBlur={(ev) => handleOnBlur(i, ev)}
                onChange={(ev) => handleChange(field.id, ev)}
                highlighted={data && data[field.id] && data[field.id].length > 0}
              />

              {data[field.id] == "" && <S.Indicator>{field.name}</S.Indicator>}
            </S.Single>
          )}
        </Fragment>
      ))}
      {showState >= 7 && (
        <S.Single>
          {imageStatus !== "complete" && (
            <S.Photo onClick={() => setImageStatus((status) => (status === "loading" ? "idle" : "loading"))}>
              <input type="file" accept="image/*" onChange={handleImageChange} onBlur={() => setImageStatus((status) => (status === "loading" ? "idle" : status))} />
              <S.Indicator>{lang === "ko" ? "+ 프로필 사진 업로드" : "+ Profile Photo"}</S.Indicator>
              {imageStatus === "loading" && (
                <S.Loading>
                  <LineLoading color="white" />
                </S.Loading>
              )}
            </S.Photo>
          )}

          {imageStatus === "complete" && <p>{lang === "ko" ? "프로필 사진 업로드 완료" : "Profile Image Uploaded"}</p>}
        </S.Single>
      )}

      {new Array(9).fill(0).map((_, i) => (
        <Fragment>
          {showState >= 8 + i && (
            <S.Single>
              <S.Checkbox
                checked={consentChecked[i]}
                onClick={() => {
                  setConsentChecked((arr) => {
                    const newArr = [...arr];
                    newArr[i] = !newArr[i];
                    return newArr;
                  });
                }}
              >
                O
              </S.Checkbox>
              <S.Consent>{(lang === "ko" ? CONSENT_TEXTS_KO : CONSENT_TEXTS)[i]}</S.Consent>
            </S.Single>
          )}
        </Fragment>
      ))}
      {showState >= 17 && <S.Button onClick={handleRegisterClick}>{lang === "ko" ? "회원가입 완료" : "Finish Register"}</S.Button>}
      <S.Overlay
        style={{
          backgroundColor: background,
        }}
      />
    </S.Container>
  );
}
