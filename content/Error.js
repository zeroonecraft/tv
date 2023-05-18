import React from "react";
import { FcVlc } from "react-icons/fc";

const Error = () => {
  return (
    <div className="error">
      <div className="error__logo">
        <FcVlc />
      </div>
      <p>
        Please refresh the website. Looks like, there was a problem with the
        connection when getting content from IPTV repository.
      </p>
    </div>
  );
};

export default Error;
