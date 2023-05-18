import Head from "next/head";
import React from "react";
import { Slide, ToastContainer } from "react-toastify";
import { getData } from "../common";
import App from "../components/App";
import Error from "../content/Error";

export default function Home({ listing }) {
  return (
    <>
      <Head>
        <meta name="title" content="Jackal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <title>Jackal</title>
      </Head>
      {listing === "fail" ? <Error /> : <App listing={listing} />}
      <div id="about"></div>
      <div id="channels"></div>
      <div id="my-playlist"></div>
      <ToastContainer transition={Slide} />
    </>
  );
}

Home.getInitialProps = async () => {
  return {
    listing: await getData(),
  };
};
