import { createGlobalStyle, ThemeProvider } from "styled-components";
import useResize from "@/utils/hooks/useResize";

import { useEffect } from "react";

//pre-import css
import Head from "next/head";

//gtag
import Script from "next/script";
import { useRouter } from "next/router";

const GlobalStyle = createGlobalStyle`

  html {
    // overscroll-behavior: none;
    // overflow: hidden;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
    font-family: Helvetica;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6, p{
    margin: 0;
    padding: 0;
  }

  @font-face{
    font-family: 'uknumberplate';
    src: url('/assets/fonts/uknumberplate.ttf');
  }

  @font-face{
    font-family: 'antic';
    src: url('/assets/fonts/Antic-Regular.ttf');
  }

  @font-face{
    font-family: 'rochester';
    src: url('/assets/fonts/Rochester-Regular.ttf');
  }

  // @font-face{
  //   font-family: 'montserrat';
  //   src: url('/assets/fonts/Montserrat/Montserrat-VariableFont_whgt.ttf');
  // }




  @font-face{
    font-family: "BebasNeue";
    src: url('/assets/fonts/BebasNeue-Regular.ttf');
  }

  @font-face{
    font-family: "BigShouldersText";
    src: url('/assets/fonts/nimche/BigShouldersText-VariableFont_wght.ttf');
  }

  @font-face{
    font-family: "Edo";
    src: url('/assets/fonts/nimche/edo.ttf');
  }

  @font-face{
    font-family: "KeyVirtue";
    src: url('/assets/fonts/nimche/KeyVirtue.ttf');
  }

  @font-face{
    font-family: "RyujinAttack";
    src: url('/assets/fonts/nimche/RyujinAttack.ttf');
  }

  @font-face{
    font-family: "Tajamuka";
    src: url('/assets/fonts/nimche/Tajamuka.ttf');
  }

  @font-face{
    font-family: "Wallpoet";
    src: url('/assets/fonts/nimche/Wallpoet.ttf');
  }

  /* Futura */

  @font-face{
    font-family: "Futura";
    src: url('/assets/fonts/Futura/futur.ttf');
  }

  @font-face {
    font-family: "Futura";
    font-weight: 700;
    src: url('/assets/fonts/Futura/Futura Bold font.ttf');
  }

  @font-face {
    font-family: "Futura";
    font-style: 800;
    src: url('/assets/fonts/Futura/Futura Heavy font.ttf');
  }

  @font-face {
    font-family: "Futura";
    font-style: 500;
    src: url('/assets/fonts/Futura/Futura Medium font.ttf');
  }

  @font-face {
    font-family: "Futura";
    font-style: 200;
    src: url('/assets/fonts/Futura/Futura Ultra Light font.ttf');
  }

  @font-face{
    font-family: "Futura";
    font-style: 300;
    src: url('/assets/fonts/Futura/Futura Light font.ttf');
  }

  /* Roboto */

  @font-face{
    font-family: "Roboto";
    src: url('/assets/fonts/Roboto/Roboto-Regular.ttf');
  }

  @font-face{
    font-family: "Roboto";
    font-weight: 700;
    src: url('/assets/fonts/Roboto/Roboto-Bold.ttf');
  }

  @font-face{
    font-family: "Roboto";
    font-weight: 500;
    src: url('/assets/fonts/Roboto/Roboto-Medium.ttf');
  }

  @font-face{
    font-family: "Roboto";
    font-weight: 300;
    src: url('/assets/fonts/Roboto/Roboto-Light.ttf');
  }

  @font-face{
    font-family: "Roboto";
    font-weight: 100;
    src: url('/assets/fonts/Roboto/Roboto-Thin.ttf');
  }

  /* Avenir */
  @font-face{
    font-family: "Avenir";
    src: url('/assets/fonts/Avenir/Avenir-regular.otf') format("opentype");
  }

  @font-face{
    font-family: "Avenir";
    font-weight: 700;
    src: url('/assets/fonts/Avenir/Avenir-bold.otf') format("opentype");
  }

  @font-face{
    font-family: "Avenir";
    font-weight: 300;
    src: url('/assets/fonts/Avenir/Avenir-light.otf') format("opentype");
  }

  @font-face{
    font-family: "Helvetica Condensed Black";
    font-weight: 900;
    src: url('/assets/fonts/HelveticaBlack.otf') format("opentype");
  }



  /* Line */
  @font-face{
    font-family: "Line Seed";
    src: url('/assets/fonts/Line/LINESeedSans_Rg.ttf') format("truetype");
  }

  @font-face{
    font-family: "Line Seed";
    font-weight: 700;
    src: url('/assets/fonts/Line/LINESeedSans_Bd.ttf') format("truetype");
  }

  @font-face{
    font-family: "Line Seed";
    font-weight: 300;
    src: url('/assets/fonts/Line/LINESeedSans_Th.ttf') format("truetype");
  }

  @font-face{ 
    font-family: "Line Seed";
    font-weight: 800;
    src: url('/assets/fonts/Line/LINESeedSans_XBd.ttf') format("truetype");
  }

  @font-face{
    font-family: "Line Seed";
    font-weight: 900;
    src: url('/assets/fonts/Line/LINESeedSans_He.ttf') format("truetype");
  }

  @font-face{
    font-family: "Line Seed";





  input {
    border-radius: 0;
    -webkit-appearance: none;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
  

  .yt-lite {
    width: 100%;
    height: 100%;
    position: absolute;
    cursor: context-menu;
  }
  
  .yt-lite {
    transition: all 1s linear;
  }
  
  .lty-playbtn {
    background: pink;
  }


  /* Mapbox: Current Position Pin */
.mapboxgl-ctrl-top-right {
}

.mapboxgl-ctrl {
  opacity: 0 !important;
}

.mapboxgl-ctrl-geolocate {
  opacity: 0 !important;
  width: 100px !important;
  background: rgba(255, 255, 255, 0.7) !important;
}

.mapboxgl-ctrl-icon {
  opacity: 0 !important;
}

  
  
`;

function MyApp({ Component, pageProps }) {
  const [windowWidth, windowHeight, fixedHeight] = useResize();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Internetinental: Web-based Artworks around Interconnectivity</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />

        <base target="_blank" />
      </Head>

      <Script src="https://www.googletagmanager.com/gtag/js?id=G-2D4T5PS78F" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-2D4T5PS78F');
        `}
      </Script>

      <GlobalStyle />
      <ThemeProvider theme={{ windowWidth, windowHeight, fixedHeight }}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
