const BASE_URL = "https://github.com/iptv-org/iptv/tree/master/streams";

const randomNumbers = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

const GET_CH_URL = (cn) =>
  `https://raw.githubusercontent.com/iptv-org/iptv/master/streams/${cn}.m3u`;

const getTextFromFetch = async (url) => {
  const req = await fetch(url);
  const text = await req.text();
  return text;
};

const getChannelUrls = (array) => array.map(GET_CH_URL);

const getChannelUrlForMethod = (i, brokenIndex) => {
  return i
    .split("#")
    .filter((j) => (j.includes("EXTM3U") ? null : j))
    .filter((j, idx) => idx === brokenIndex + 1)
    .map((j) =>
      j.split(",").length === 1 ? j.split(",")[0] : j.split(",")[1]
    );
};

const getChannelNameForMethod = (i, brokenIndex) => {
  return i
    .split("#")
    .filter((j) => (j.includes("EXTM3U") ? null : j))
    .filter((j, idx) => idx === brokenIndex)
    .map((j) => j.split('",')[1].replace(/\n/g, ""));
};

const methodForEXTVLCOPT = (i, brokenIndex) => {
  const channelName = getChannelNameForMethod(i, brokenIndex);
  const channelUrl = getChannelUrlForMethod(i, brokenIndex);

  if (Array.isArray(channelUrl) && channelUrl.length === 0) {
    return null;
  }

  const newUrlString = channelUrl[0];
  const getUrls = newUrlString.split("://");
  const getUrl = getUrls[getUrls.length - 1];
  const cleanUrl = getUrl.replace(/\n/g, "");
  const finalUrl = channelName[0] + "\n" + "http://" + cleanUrl;
  return finalUrl;
};

const getSpecialMethodChannels = (i, j, index) => {
  const array = j.split('",');
  const type = array[0];
  const url = array[1];
  if (url && !url.includes("://")) {
    return {
      type,
      url: methodForEXTVLCOPT(i, index),
    };
  }
  return { type, url };
};

const cleanUpListing = (j, index, codes) => {
  let word;
  let myUrl;
  let myTitle;
  if (j.type && j.type.includes("group-title=")) {
    const array = j.type.split("group-title=");
    word = array[1].replace(/"/g, "");
    word = word.trim() ? word : "None";
  } else {
    word = "None";
  }
  if (j.url && j.url.includes("\n")) {
    myTitle = j.url.split("\n")[0].trim();
    myUrl = j.url.split("\n")[1].trim();
  } else {
    myUrl = j.url;
    myTitle = "Unknown";
  }
  return {
    type: word,
    url: myUrl,
    title: myTitle,
    country: codes[index],
  };
};

const parseXLinks = (myPromise, codes) => {
  return myPromise.map((i, index) => {
    return i
      .split("#")
      .filter((j) => (j !== "" && j.includes("EXTM3U") ? null : j))
      .map((j, index) => getSpecialMethodChannels(i, j, index))
      .filter((j) => (typeof j.url === undefined ? null : j))
      .map((j) => cleanUpListing(j, index, codes))
      .filter((j) => j.url && j.type !== "XXX")
      .sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))
      .filter((j) => (j.title.includes("XXX") ? false : j));
  });
};

const getData = async () => {
  try {
    const promiseBit = await fetch(BASE_URL);
    const textBit = await promiseBit.text();
    return textBit;
  } catch (e) {
    return "fail";
  }
};

// https://stackoverflow.com/questions/51805395/navigator-clipboard-is-undefined
const copyToClipboard = (textToCopy) => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(textToCopy);
  } else {
    let textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((res, rej) => {
      document.execCommand("copy") ? res() : rej();
      textArea.remove();
    });
  }
};

// https://stackoverflow.com/a/43467144
const isValidUrl = (string) => {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
};

export {
  getData,
  copyToClipboard,
  isValidUrl,
  parseXLinks,
  getTextFromFetch,
  getChannelUrls,
  randomNumbers,
};
