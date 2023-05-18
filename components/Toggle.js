import React from "react";
import { FaLightbulb, FaRegLightbulb } from "react-icons/fa";

const Toggle = ({ theme, toggleTheme }) => (
  <a
    className="nav__btn"
    href="#"
    aria-label="Switch theme"
    onClick={toggleTheme}
    title="Switch theme"
  >
    {theme === "dark" ? <FaRegLightbulb /> : <FaLightbulb />}
  </a>
);

export default Toggle;
