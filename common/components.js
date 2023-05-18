import ReactCountryFlag from "react-country-flag";
import { randomNumbers } from "../common";

const fixCode = (code) => {
  return code.includes("_") ? code.split("_")[0] : code;
};

const returnFlag = (code) => {
  return (
    <ReactCountryFlag
      className="accordion__flag__img"
      svg
      countryCode={fixCode(code)}
    />
  );
};

const returnOneFlag = (code) => {
  return (
    <ReactCountryFlag
      svg
      countryCode={fixCode(code)}
      style={{ fontSize: "1.25rem" }}
    />
  );
};

const fixBrokenFlags = (country) => {
  if (!country) return;
  if (country.trim().toLowerCase().includes("us_")) return returnFlag("us");
  if (country.trim().toLowerCase().includes("uk_")) return returnFlag("gb");
  if (country.trim().toLowerCase().includes("se_")) return returnFlag("se");
  if (country.trim().toLowerCase().includes("no_")) return returnFlag("no");
  if (country.trim().toLowerCase().includes("nl_")) return returnFlag("nl");
  if (country.trim().toLowerCase().includes("mx_")) return returnFlag("mx");
  if (country.trim().toLowerCase().includes("it_")) return returnFlag("it");
  if (country.trim().toLowerCase().includes("in_")) return returnFlag("in");
  if (country.trim().toLowerCase().includes("ie_")) return returnFlag("ie");
  if (country.trim().toLowerCase().includes("fr_")) return returnFlag("fr");
  if (country.trim().toLowerCase().includes("fi_")) return returnFlag("fi");
  if (country.trim().toLowerCase().includes("es_")) return returnFlag("es");
  if (country.trim().toLowerCase().includes("dk_")) return returnFlag("dk");
  if (country.trim().toLowerCase().includes("de_")) return returnFlag("de");
  if (country.trim().toLowerCase().includes("ch_")) return returnFlag("ch");
  if (country.trim().toLowerCase().includes("cd")) return returnFlag("cg");
  if (country.trim().toLowerCase().includes("ca_")) return returnFlag("ca");
  if (country.trim().toLowerCase().includes("br_")) return returnFlag("br");
  if (country.trim().toLowerCase().includes("be_")) return returnFlag("be");
  if (country.trim().toLowerCase().includes("au_")) return returnFlag("au");
  if (country.trim().toLowerCase().includes("at_")) return returnFlag("at");
  if (country === "ve") return returnFlag("ve");
  if (country === "unsorted") return returnFlag("xx");
  return (
    <ReactCountryFlag
      className="accordion__flag__img"
      svg
      countryCode={fixCode(country)}
    />
  );
  // return (
  //   <ReactCountryFlag
  //     svg
  //     countryCode={fixCode(country)}
  //     style={{ fontSize: "1.25rem" }}
  //   />
  // );
  // return (
  //   <img
  //     className="accordion__flag__img"
  //     src={`http://placekitten.com/${randomNumbers(60, 80)}/44`}
  //   />
  // );
};

const fixAllFlags = (country) => {
  if (!country) return;
  if (country.trim().toLowerCase().includes("us_")) return returnOneFlag("us");
  if (country.trim().toLowerCase().includes("uk_")) return returnOneFlag("gb");
  if (country.trim().toLowerCase().includes("se_")) return returnOneFlag("se");
  if (country.trim().toLowerCase().includes("no_")) return returnOneFlag("no");
  if (country.trim().toLowerCase().includes("nl_")) return returnOneFlag("nl");
  if (country.trim().toLowerCase().includes("mx_")) return returnOneFlag("mx");
  if (country.trim().toLowerCase().includes("it_")) return returnOneFlag("it");
  if (country.trim().toLowerCase().includes("in_")) return returnOneFlag("in");
  if (country.trim().toLowerCase().includes("ie_")) return returnOneFlag("ie");
  if (country.trim().toLowerCase().includes("fr_")) return returnOneFlag("fr");
  if (country.trim().toLowerCase().includes("fi_")) return returnOneFlag("fi");
  if (country.trim().toLowerCase().includes("es_")) return returnOneFlag("es");
  if (country.trim().toLowerCase().includes("dk_")) return returnOneFlag("dk");
  if (country.trim().toLowerCase().includes("de_")) return returnOneFlag("de");
  if (country.trim().toLowerCase().includes("ch_")) return returnOneFlag("ch");
  if (country.trim().toLowerCase().includes("cd")) return returnOneFlag("cg");
  if (country.trim().toLowerCase().includes("ca_")) return returnOneFlag("ca");
  if (country.trim().toLowerCase().includes("br_")) return returnOneFlag("br");
  if (country.trim().toLowerCase().includes("be_")) return returnOneFlag("be");
  if (country.trim().toLowerCase().includes("au_")) return returnOneFlag("au");
  if (country.trim().toLowerCase().includes("at_")) return returnOneFlag("at");
  if (country === "ve") return returnOneFlag("ve");
  // if (country)
  return (
    <ReactCountryFlag
      svg
      countryCode={fixCode(country)}
      style={{ fontSize: "1.25rem" }}
    />
  );
  // return (
  //   <img
  //     src={`http://placekitten.com/${randomNumbers(60, 80)}/44`}
  //     style={{ fontSize: "1.25rem" }}
  //   />
  // );
};

export { fixBrokenFlags, fixAllFlags };
