import dynamic from "next/dynamic";
import Head from "next/head";

const Comp = dynamic(() => import("@/components/mobile"), {
  ssr: false,
});

export default function Mobile() {
  return (
    <>
      <Head>
        <title>Registration by Jeanyoon Choi</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/assets/icons/untitled.ico" sizes="any" />
      </Head>
      <Comp />
    </>
  );
}
