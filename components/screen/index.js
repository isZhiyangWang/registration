import * as S from "./styles";
import * as Tone from "tone";

//userouter
import { useRouter } from "next/router";

import Intro from "@/foundations/common/IntroWithDynamicQR";

import { Fragment, Suspense, useState, useEffect, useRef, useMemo } from "react";

import MapEl from "./map";
import EmailEl from "./email";
import CallEl from "./call";
import ProfileEl from "./profile";
import ConsentEl from "./consent";
import ConfettiEl from "./confetti";
import TextAppear from "./text";

import useSocket from "@/utils/hooks/socket/untitled/useSocketScreen";

////////URL: TO BE ADJUSTED
const URL = `https://internetinental.herokuapp.com/mobile`;

function playTone(synth) {
  try {
    synth.triggerAttackRelease("C2", "8n");
  } catch (e) {
    console.log(e);
  }
}

export default function Untitled() {
  const router = useRouter();
  const { lang } = router.query;
  const [showIntro, setShowIntro] = useState(true);

  const socket = useSocket({
    handleNewMobileJoin,
    handleNewInput,
    handleNewPhoto,
    handleNewConsent,
    handleNewRegister,
  });

  function handleNewMobileJoin() {
    setShowIntro(false);
  }

  const [allValues, setAllValues] = useState({
    title: [],
    firstName: [],
    lastName: [],
    age: [],
    address: [],
    email: [],
    phoneNumber: [],
  });

  const [finalValue, setFinalValue] = useState({
    title: "",
    firstName: "",
    lastName: "",
    age: "",
    address: "",
    email: "",
    phoneNumber: "",
  });

  const [init, setInit] = useState({
    title: false,
    firstName: false,
    lastName: false,
    age: false,
    address: false,
    email: false,
    phoneNumber: false,
  });

  const synth = useMemo(() => new Tone.MembraneSynth().toDestination(), []);

  const resetTimeout = useRef();

  function handleNewInput({ initTime, data }) {
    if (Date.now() - initTime > 5 * 60 * 1000) return;

    setShowIntro(false);
    for (const [key, value] of Object.entries(data)) {
      setAllValues((obj) => ({
        ...obj,
        [key]: [...obj[key], value],
      }));
      setFinalValue((val) => ({ ...val, [key]: value }));
      setInit((val) => ({ ...val, [key]: true }));
    }

    if (resetTimeout.current) clearTimeout(resetTimeout.current);
    resetTimeout.current = setTimeout(() => {
      handleReset();
    }, 80 * 1000);
  }

  const [profilePic, setProfilePic] = useState(null);
  const [consentChecked, setConsentChecked] = useState([false, false, false, false, false, false, false, false, false]);

  async function handleNewPhoto({ blob }) {
    try {
      const profilePic = await arrayBufferToSrc(blob);
      setProfilePic(profilePic);
    } catch (e) {
      console.log(e);
    }

    if (resetTimeout.current) clearTimeout(resetTimeout.current);
    resetTimeout.current = setTimeout(() => {
      handleReset();
    }, 80 * 1000);
  }

  function handleNewConsent({ checked }) {
    setConsentChecked(checked);
    if (resetTimeout.current) clearTimeout(resetTimeout.current);
    resetTimeout.current = setTimeout(() => {
      handleReset();
    }, 100 * 1000);
  }

  const [triggerConfetti, setTriggerConfetti] = useState(false);
  function handleNewRegister() {
    setTriggerConfetti(true);
  }

  const [background, setBackground] = useState("transparent");
  useEffect(() => {
    if (triggerConfetti) {
      const interval = setInterval(() => {
        setBackground((bg) => {
          if (bg === "black") {
            return "white";
          } else {
            return "black";
          }
        });
      }, 10);

      const timeout = setTimeout(() => {
        handleReset();
      }, 100 * 1000);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [triggerConfetti]);

  /////TEXTS
  //FIRST NAME
  const [firstNameTexts, setFirstNameTexts] = useState([""]);
  const [lastNameTexts, setLastNameTexts] = useState([]);

  useEffect(() => {
    if (finalValue.firstName) {
      setBgColor("blue");
      setFirstNameTexts(lang === "ko" ? ["", "", `환영합니다, ${finalValue.firstName}님!`] : ["", "", `Welcome, ${finalValue.firstName}!`]);
    }
  }, [finalValue.firstName, lang]);

  useEffect(() => {
    if (!init.firstName) return;
    if (finalValue.lastName) {
      const newArr =
        lang === "ko"
          ? [
              `환영합니다, ${finalValue.firstName} ${finalValue.lastName}님! 당신만을 위한 특별한 제안을 확인하세요.`,
              `안녕하세요 ${finalValue.firstName} ${finalValue.lastName}님, 개인 맞춤형 추천을 준비했습니다!`,
              `${finalValue.title} ${finalValue.lastName}님, 오늘의 특별 할인을 확인하세요!`,
              `${finalValue.firstName} ${finalValue.lastName}님, 당신을 위한 새로운 상품이 도착했습니다!`,
              `놓치지 마세요, ${finalValue.firstName} ${finalValue.lastName}님! 지금 인기 상품을 확인하세요.`,
              `${finalValue.firstName} ${finalValue.lastName}님, 다음 여정이 여기에서 시작됩니다!`,
            ]
          : [
              `Welcome, ${finalValue.firstName} ${finalValue.lastName}! Discover exclusive offers just for you.`,
              `Hello ${finalValue.firstName} ${finalValue.lastName}, your personalized recommendations await!`,
              `${finalValue.title} ${finalValue.lastName}, unlock your special discounts today!`,
              `${finalValue.firstName} ${finalValue.lastName}, explore new arrivals curated for you!`,
              `Don't miss out, ${finalValue.firstName} ${finalValue.lastName}! Check out what's trending now.`,
              `${finalValue.firstName} ${finalValue.lastName}, your next adventure starts here!`,
            ];

      console.log(lang, newArr);
      let i = -1;
      const interval = setInterval(() => {
        setLastNameTexts((arr) => {
          i++;
          if (i < Math.min(allValues.lastName.length, newArr.length)) {
            return [...arr, newArr[i]];
          } else {
            if (interval) clearInterval(interval);
            return arr;
          }
        });
      }, 35);
      return () => clearInterval(interval);
    }
  }, [init.firstName, finalValue.firstName, finalValue.title, finalValue.lastName, lang]);

  function handleAge(age) {
    const newArr =
      lang === "ko"
        ? [
            // Korean translations
            `${finalValue.firstName}님, ${age}세를 위한 특별 프로모션!`,
            `${age}세를 스타일로 변신시키세요, 추천 상품을 확인하세요:`,
            `당신의 특별한 ${age}세를 위한 특별 큐레이션, ${finalValue.firstName}님`,
            `${age}세 그리고 멋짐! 맞춤형 프로모션이 도착했습니다, ${finalValue.firstName}님!`,
            `다른 ${age}세 분들이 사랑한 제품들:`,
            `${finalValue.firstName}님께 건배! ${age}세를 위한 맞춤형 딜을 즐기세요.`,
            `${finalValue.firstName}님, ${age}세를 위한 특별 프로모션이 있습니다!`,
            `오직 당신을 위해 준비했습니다, ${finalValue.firstName}님. 저희의 제안을 확인하세요.`,
            `당신의 ${age}세를 평범하게 보내지 마세요: 저희의 독점 제안을 확인하세요.`,
            `${finalValue.firstName}님, 오늘을 잡으세요! ${age}세를 위한 특별한 제안이 기다리고 있습니다!`,
            `${finalValue.firstName}님, ${age}세를 위한 큐레이션으로 스타일을 높이세요!`,
            `당신의 특별한 ${age}세를 축하합니다, ${finalValue.firstName}님! 특별히 준비된 컬렉션을 만나보세요!`,
            `${finalValue.firstName}님, ${age}세에 당신은 특별합니다! 맞춤형 프로모션을 즐기세요.`,
            `${finalValue.firstName}님, ${age}세 분들이 좋아하는 트렌드를 발견하세요! 이 인기 상품을 놓치지 마세요.`,
            `축배를 듭니다, ${finalValue.firstName}님! 멋진 ${age}세를 위한 독점 딜을 즐기세요.`,
            `${age}세의 마법을 열어보세요, ${finalValue.firstName}님! 당신만을 위한 프로모션이 준비되어 있습니다.`,
            `${finalValue.firstName}님, ${age}세를 위한 맞춤형 럭셔리를 즐겨보세요!`,
            `평범함에 만족하지 마세요, ${finalValue.firstName}님? ${age}세를 위한 특별한 제안을 탐험하세요.`,
            `${age}세에서의 당신의 여정은 특별합니다, ${finalValue.firstName}님. 저희의 독점 제안으로 잊지 못할 순간을 만들어보세요.`,
          ]
        : [
            // British English versions
            `${finalValue.firstName}, special promotion for ${age}-year-olds!`,
            `Transform ${age} into your style, here are our recommendations:`,
            `Our special curation for your remarkable ${age}, ${finalValue.firstName}`,
            `${age} and Fabulous! Your Personalised Promotions Have Arrived, ${finalValue.firstName}!`,
            `Other ${age}-year-olds loved these products:`,
            `Cheers to you ${finalValue.firstName}, enjoy customised deals for ${age}-year-olds.`,
            `We have a special promotion for ${age}-year-olds, ${finalValue.firstName}!`,
            `Tailored just for you, ${finalValue.firstName}. Check out our offers.`,
            `Don't let your ${age} be ordinary: check our exclusive offers.`,
            `${finalValue.firstName}, seize the day! Exclusive offers await you at ${age}!`,
            `Elevate your style, ${finalValue.firstName}, with our curated picks for ${age} years!`,
            `Celebrate your unique ${age} with our specially curated collection, ${finalValue.firstName}!`,
            `${finalValue.firstName}, at ${age}, you're not just fabulous – you're extraordinary! Enjoy your personalised promotions.`,
            `Discover what's trending among ${age}-year-olds, ${finalValue.firstName}! Don't miss out on these favourites.`,
            `Raise a glass, ${finalValue.firstName}! Savour exclusive deals crafted for the fabulous ${age}.`,
            `Unlock the magic of ${age}, ${finalValue.firstName}! Our promotions are designed just for you.`,
            `Indulge in personalised luxury, ${finalValue.firstName}, with our offers tailored to ${age}!`,
            `Why settle for ordinary, ${finalValue.firstName}? Explore our extraordinary offers for ${age}-year-olds.`,
            `Your journey at ${age} is special, ${finalValue.firstName}. Dive into our exclusive offers and make it unforgettable.`,
          ];

    setLastNameTexts((arr) => {
      return [...arr, ...newArr.slice(0, age % newArr.length)];
    });
  }

  useEffect(() => {
    if (!init.age) return;
    if (finalValue.age) {
      let currAge = -1;
      const interval = setInterval(() => {
        currAge++;

        if (currAge <= Math.min(parseInt(finalValue.age), 100)) {
          handleAge(currAge);
        } else {
          if (interval) clearInterval(interval);
        }
      }, 35);
      return () => clearInterval(interval);
    }
  }, [init.age, finalValue.age, finalValue.firstName, finalValue.lastName]);

  useEffect(() => {
    if (!init.address) return;
    if (finalValue.address) {
      const newArr =
        lang === "ko"
          ? [
              // Korean translations
              `${finalValue.firstName}님, ${finalValue.address}로 배송됩니다!`,
              `걱정 마세요, ${finalValue.firstName}님! ${finalValue.address}로 배송해드립니다.`,
              `좋은 소식입니다 - 이제 ${finalValue.address}로 배송 가능합니다!`,
              `${finalValue.address}로 배송되는 동안 편히 쉬세요.`,
              `흥미로운 소식이에요, ${finalValue.firstName}님!`,
              `선호하시는 상품을 이제 ${finalValue.address}로 바로 배송받으세요.`,
              `쇼핑이 더욱 쉬워졌습니다, 오직 당신을 위해!`,
              `속보: 배송 서비스가 확대되었습니다!`,
              `🌐 좋은 소식 - 이제 ${finalValue.address}로 배송 가능합니다.`,
              `당신의 편의가 저희의 우선입니다!`,
              `편히 쉬시고, 좋은 기운을 받아보세요! 😌✨`,
              `저희는 ${finalValue.address}로 배송하게 되어 기쁩니다.`,
              `당신의 편안함이 저희의 약속입니다!`,
              `당신의 문앞에서 기쁨을 풀어보세요! 🎁`,
              `${finalValue.firstName}님, ${finalValue.address}로 배송됩니다!`,
              `번거로움 없는 배송의 편리함을 즐기세요!`,
            ]
          : [
              // British English versions
              `We deliver to ${finalValue.address}, ${finalValue.firstName}!`,
              `No worries about delivery, ${finalValue.firstName}! We deliver to ${finalValue.address}.`,
              `Great news - we now deliver to ${finalValue.address}!`,
              `Sit back and relax while we deliver to ${finalValue.address}.`,
              `Exciting announcement, ${finalValue.firstName}!`,
              `Your favourite items can now be delivered straight to ${finalValue.address}.`,
              `Shopping made easier, just for you!`,
              `Breaking news: We've expanded our delivery services!`,
              `🌐 Great news - we now deliver to ${finalValue.address}!`,
              `Your convenience is our priority!`,
              `Sit back, relax, and let the good vibes roll in! 😌✨`,
              `We're delighted to announce that we now deliver to ${finalValue.address}.`,
              `Your comfort is our commitment!`,
              `Unwrap joy at your doorstep! 🎁`,
              `We deliver to ${finalValue.address}, ${finalValue.firstName}!`,
              `Enjoy the convenience of hassle-free delivery!`,
            ];
      let i = -1;
      const interval = setInterval(() => {
        setLastNameTexts((arr) => {
          i++;
          if (i < parseInt(finalValue.age) + allValues.address.length * 3) {
            return [...arr, newArr[i % newArr.length]];
          } else {
            if (interval) clearInterval(interval);
            return arr;
          }
        });
      }, 35);
      return () => clearInterval(interval);
    }
  }, [init.address, finalValue.age, finalValue.address, finalValue.firstName, finalValue.lastName, lang]);

  useEffect(() => {
    if (!init.email) return;
    if (finalValue.email) {
      const newArr =
        lang === "ko"
          ? [
              // Korean translations
              `🎉 환영합니다, ${finalValue.firstName}님! ${finalValue.email}에서 최신 소식을 받아보세요! 📬`,
              `${finalValue.firstName}님, 큰 소식이 있습니다! 메일함 (${finalValue.email})이 더욱 흥미로워졌습니다.`,
              `안녕하세요 ${finalValue.firstName}님! 이제 ${finalValue.email}에서 독점 접근이 시작됩니다.`,
              `잠시만요, ${finalValue.firstName}님! ${finalValue.email}은 특별 제안의 VIP 패스입니다.`,
              `편히 쉬세요, ${finalValue.firstName}님! ${finalValue.email}에서 특전을 즐기세요.`,
              `안녕하세요 ${finalValue.firstName}님! 메일함 (${finalValue.email})이 보물 창고가 되었습니다.`,
              `${finalValue.firstName}님을 만나 뵙게 되어 기쁩니다! 당신의 VIP 이메일은 ${finalValue.email}입니다.`,
              `준비하세요, ${finalValue.firstName}님! ${finalValue.email}에서 흥미로운 일들이 기다리고 있습니다!`,
              `큰 소식입니다, ${finalValue.firstName}님! 가능성이 ${finalValue.email}에서 기다리고 있습니다.`,
              `흥미로운 시간이에요, ${finalValue.firstName}님! 당신의 이메일 (${finalValue.email})이 열쇠입니다.`,
              `메일함 (${finalValue.email})이 이제 놀라워졌습니다, ${finalValue.firstName}님! 🎈`,
              `안녕하세요 ${finalValue.firstName}님! 🌟 이메일 (${finalValue.email})은 황금 티켓입니다!`,
              `${finalValue.firstName}님, ${finalValue.email}에서 특별한 것이 기다리고 있습니다.`,
              `여정을 준비하세요, ${finalValue.firstName}님! 출발점은 ${finalValue.email}입니다.`,
              `주의하세요, ${finalValue.firstName}님! ${finalValue.email}은 이제 당신의 VIP 접근입니다.`,
              `속보: ${finalValue.firstName}님, 메일함 (${finalValue.email})이 업그레이드되었습니다!`,
              `앞으로 흥미로운 시간이 기다리고 있습니다, ${finalValue.firstName}님! 이메일 (${finalValue.email})이 당신의 놀라움의 열쇠입니다.`,
              `마법을 펼쳐보세요, ${finalValue.firstName}님! 모든 것이 ${finalValue.email}에서 시작됩니다.`,
              `안녕하세요, ${finalValue.firstName}님! 이메일 (${finalValue.email})이 전설이 되었습니다.`,
              `환영합니다, ${finalValue.firstName}님! 흥미진진한 일이 ${finalValue.email}에서 시작됩니다. 🎊`,
              `자리에서 기다려주세요, ${finalValue.firstName}님! 이메일 (${finalValue.email})이 최전선입니다.`,
              `메일함 (${finalValue.email})이 환상적인 공간이 되었습니다, ${finalValue.firstName}님! 🌈`,
              `${finalValue.firstName}님, 아세요? ${finalValue.email}이 이제 VIP 라운지입니다!`,
              `준비되셨나요, ${finalValue.firstName}님! 이메일 (${finalValue.email})이 출발점입니다.`,
              `안녕하세요 ${finalValue.firstName}님! 이메일 (${finalValue.email})에 주목하세요. 🌟`,
              `주의하세요, ${finalValue.firstName}님! 이메일 (${finalValue.email})이 이제 쇼의 주인공입니다.`,
              `스포트라이트를 받을 준비가 되셨나요, ${finalValue.firstName}님? 이메일 (${finalValue.email})이 중심 무대입니다!`,
              `흥분이 기다리고 있습니다, ${finalValue.firstName}님! 당신의 여정은 ${finalValue.email}에서 시작됩니다.`,
              `안전벨트를 매세요, ${finalValue.firstName}님! 이메일 (${finalValue.email})이 이제 빠른 길입니다.`,
            ]
          : [
              // British English versions
              `🎉 Welcome, ${finalValue.firstName}! Stay updated at ${finalValue.email}! 📬`,
              `${finalValue.firstName}, big news! Your inbox (${finalValue.email}) just got more interesting.`,
              `Hello ${finalValue.firstName}! Exclusive access at ${finalValue.email} starts now.`,
              `Hold tight, ${finalValue.firstName}! ${finalValue.email} is your VIP pass to special offers.`,
              `Sit back, ${finalValue.firstName}! Enjoy perks at ${finalValue.email}.`,
              `Hey ${finalValue.firstName}! Your inbox (${finalValue.email}) is a treasure trove.`,
              `Thrilled to have you, ${finalValue.firstName}! Your VIP email is ${finalValue.email}.`,
              `Get ready, ${finalValue.firstName}! A wave of excitement awaits at ${finalValue.email}!`,
              `Big news, ${finalValue.firstName}! Possibilities await at ${finalValue.email}.`,
              `Exciting times, ${finalValue.firstName}! Your email (${finalValue.email}) is key.`,
              `Your inbox (${finalValue.email}) is now brilliant, ${finalValue.firstName}! 🎈`,
              `Hello ${finalValue.firstName}! 🌟 Your email (${finalValue.email}) is a golden ticket!`,
              `${finalValue.firstName}, we've something special for you at ${finalValue.email}.`,
              `Ready for a journey, ${finalValue.firstName}? Your starting point: ${finalValue.email}.`,
              `Attention, ${finalValue.firstName}! ${finalValue.email} is now your VIP access.`,
              `Breaking news: ${finalValue.firstName}, your inbox (${finalValue.email}) just levelled up!`,
              `Exciting times ahead, ${finalValue.firstName}! Your email (${finalValue.email}) is your key to surprises.`,
              `Unveil the magic, ${finalValue.firstName}! It's all happening at ${finalValue.email}.`,
              `Hey there, ${finalValue.firstName}! Your email (${finalValue.email}) just became legendary.`,
              `Welcome, ${finalValue.firstName}! The excitement begins at ${finalValue.email}. 🎊`,
              `Hold onto your seat, ${finalValue.firstName}! Your email (${finalValue.email}) is the front row.`,
              `Your inbox (${finalValue.email}) just became a wonderland, ${finalValue.firstName}! 🌈`,
              `${finalValue.firstName}, guess what? ${finalValue.email} is now the VIP lounge!`,
              `Get set, ${finalValue.firstName}! Your email (${finalValue.email}) is the launchpad.`,
              `Hello ${finalValue.firstName}! The spotlight is on your email (${finalValue.email}). 🌟`,
              `Attention, ${finalValue.firstName}! Your email (${finalValue.email}) is now the star of the show.`,
              `Ready for the spotlight, ${finalValue.firstName}? Your email (${finalValue.email}) is centre stage!`,
              `Excitement awaits, ${finalValue.firstName}! Your journey starts at ${finalValue.email}.`,
              `Buckle up, ${finalValue.firstName}! Your email (${finalValue.email}) is now on the fast track.`,
            ];

      let i = -1;
      const interval = setInterval(() => {
        setLastNameTexts((arr) => {
          i++;
          if (i < Math.min(allValues.lastName.length + allValues.address.length + allValues.email.length, newArr.length)) {
            return [...arr, newArr[i]];
          } else {
            if (interval) clearInterval(interval);
            return arr;
          }
        });
      }, 35);
      return () => clearInterval(interval);
    }
  }, [init.email, finalValue.email, finalValue.firstName, finalValue.lastName, allValues, lang]);

  const [allTexts, setAllTexts] = useState([]);

  useEffect(() => {
    setAllTexts([...firstNameTexts, ...lastNameTexts]);
  }, [firstNameTexts, lastNameTexts]);

  const [bgColor, setBgColor] = useState("black");

  useEffect(() => {
    try {
      if (finalValue.title) {
        setBgColor("blue");
      }
    } catch (e) {
      console.log(e);
    }
  }, [finalValue.title]);

  function handleReset() {
    //reset all states to initial values
    setAllValues({
      title: [],
      firstName: [],
      lastName: [],
      age: [],
      address: [],
      email: [],
      phoneNumber: [],
    });

    setFinalValue({
      title: "",
      firstName: "",
      lastName: "",
      age: "",
      address: "",
      email: "",
      phoneNumber: "",
    });

    setInit({
      title: false,
      firstName: false,
      lastName: false,
      age: false,
      address: false,
      email: false,
      phoneNumber: false,
    });

    setFirstNameTexts([""]);
    setLastNameTexts([]);

    setProfilePic(null);
    setConsentChecked([false, false, false, false, false, false, false, false, false]);

    setTriggerConfetti(false);
    setBackground("transparent");

    setBgColor("black");
    setAllTexts([]);
    setShowIntro(true);

    //reload
    window.location.reload();
  }

  useEffect(() => {
    playTone(synth);
  }, [allTexts]);

  return (
    <S.BigWrapper>
      <S.Container
        style={{
          background: bgColor,
          transform: `scale(${Math.min(40, allTexts.length) > 20 ? 1 : 2})`,
          fontFamily: lang === "ko" ? "Helvetica" : "EB Garamond",
          fontSize: lang === "ko" ? "0.9vw" : "1vw",
        }}
      >
        {/* {init.address && <MapEl searchText={finalValue.address} addressLength={allValues.address.length} />} */}

        <S.InnerContainer>
          <S.Wrapper>
            <S.BackgroundGrid>{init.age && new Array(Math.min(40, allTexts.length)).fill(0).map((_, i) => <S.Line key={i} />)}</S.BackgroundGrid>

            {allTexts.slice(0, 120).map((txt, i) => (
              <TextAppear
                key={i}
                style={{
                  marginLeft: `${i * 1}vw`,
                  marginTop: `${(i % 40) * 2.5}vh`,
                }}
                text={txt}
              />
            ))}
          </S.Wrapper>
          {allTexts.length >= 100 && (
            <S.Wrapper
              style={{
                transform: "rotate(-60deg)",
                // height: "300vh",
              }}
            >
              <S.BackgroundGrid>
                {new Array(Math.min(allTexts.length - 100, 40)).fill(0).map((_, i) => (
                  <S.Line key={i} />
                ))}
              </S.BackgroundGrid>

              {allTexts.slice(100, 180).map((txt, i) => (
                <TextAppear
                  key={i}
                  style={{
                    marginLeft: `${i * 1}vw`,
                    marginTop: `${(i % 40) * 2.5}vh`,
                  }}
                  text={txt}
                />
              ))}
            </S.Wrapper>
          )}
          {allTexts.length >= 180 && (
            <S.Wrapper
              style={{
                transform: "rotate(90deg)",
                // height: "300vh",
              }}
            >
              <S.BackgroundGrid>
                {new Array(Math.min(allTexts.length - 180, 40)).fill(0).map((_, i) => (
                  <S.Line key={i} />
                ))}
              </S.BackgroundGrid>

              {allTexts.slice(180, 260).map((txt, i) => (
                <TextAppear
                  key={i}
                  style={{
                    marginLeft: `${i * 1}vw`,
                    marginTop: `${(i % 40) * 2.5}vh`,
                  }}
                  text={txt}
                />
              ))}
            </S.Wrapper>
          )}
          {allTexts.length >= 240 && (
            <S.Wrapper
              style={{
                transform: "rotate(30deg)",
                // height: "300vh",
              }}
            >
              <S.BackgroundGrid>
                {new Array(Math.min(allTexts.length - 240, 40)).fill(0).map((_, i) => (
                  <S.Line key={i} />
                ))}
              </S.BackgroundGrid>

              {allTexts.slice(240, 320).map((txt, i) => (
                <TextAppear
                  key={i}
                  style={{
                    marginLeft: `${i * 1}vw`,
                    marginTop: `${(i % 40) * 2.5}vh`,
                  }}
                  text={txt}
                />
              ))}
            </S.Wrapper>
          )}
          {allTexts.length >= 280 && (
            <S.Wrapper
              style={{
                transform: "rotate(-30deg)",
              }}
            >
              <S.BackgroundGrid>
                {new Array(Math.min(allTexts.length - 280, 40)).fill(0).map((_, i) => (
                  <S.Line key={i} />
                ))}
              </S.BackgroundGrid>

              {allTexts.slice(280, 360).map((txt, i) => (
                <TextAppear
                  key={i}
                  style={{
                    marginLeft: `${i * 1}vw`,
                    marginTop: `${(i % 40) * 2.5}vh`,
                  }}
                  text={txt}
                />
              ))}
            </S.Wrapper>
          )}
          {allTexts.length >= 320 &&
            new Array(36).fill(0).map((_, i) => (
              <Fragment key={i}>
                {" "}
                {allTexts.length >= 320 + 20 * i && (
                  <S.Wrapper
                    style={{
                      transform: `rotate(${i * 10}deg)`,
                    }}
                  >
                    <S.BackgroundGrid>
                      {new Array(Math.min(allTexts.length - (320 + 20 * i), 40)).fill(0).map((_, i) => (
                        <S.Line key={i} />
                      ))}
                    </S.BackgroundGrid>

                    {allTexts.slice(320 + 20 * i, 400 + 20 * i).map((txt, i) => (
                      <TextAppear
                        key={i}
                        style={{
                          marginLeft: `${i * 1}vw`,
                          marginTop: `${(i % 40) * 2.5}vh`,
                        }}
                        text={txt}
                        doNotAnimate={true}
                      />
                    ))}
                  </S.Wrapper>
                )}
              </Fragment>
            ))}
        </S.InnerContainer>
        {init.email && <EmailEl finalValue={finalValue} emailValues={allValues.email} lang={lang} />}
        {init.phoneNumber && <CallEl synth={synth} finalValue={finalValue} phoneValues={allValues.phoneNumber} lang={lang} />}
        {profilePic && <ProfileEl pic={profilePic} />}
        {consentChecked.some((el) => el) && <ConsentEl consentChecked={consentChecked} lang={lang} />}
        <ConfettiEl triggerConfetti={triggerConfetti} />
        {triggerConfetti && (
          <S.Overlay
            style={{
              background: background,
            }}
          />
        )}
      </S.Container>
      {showIntro && (
        <Intro
          lang={lang}
          url={URL}
          metaData={{
            title: "Registration",
            medium: "1 Screens, 1 Mobile",
          }}
        />
      )}
    </S.BigWrapper>
  );
}

async function arrayBufferToSrc(arrayBuffer) {
  const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
  return window.URL.createObjectURL(blob);
}
