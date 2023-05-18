import React, { useContext, useEffect, useState } from "react";
// import { FaList, FaLink, FaPlay } from "react-icons/fa";
import { FaList, FaPlay, FaChild, FaTwitter } from "react-icons/fa";
// import { MdHttp } from "react-icons/md";
import { TbCoffee } from "react-icons/tb";
import { BsShuffle } from "react-icons/bs";
import { FiHelpCircle } from "react-icons/fi";
import { SiAirplayaudio } from "react-icons/si";
import MenuContext from "../context/MenuContext";
import NavigationContext from "../context/NavigationContext";
import Cart from "./Cart";
import Toggle from "./Toggle";
import { fixAllFlags } from "../common/components";

const Navigation = () => {
  const {
    channel,
    setChannel,
    handleShowList,
    handleShowFaq,
    theme,
    toggleTheme,
  } = useContext(MenuContext);
  const { urls, url, keyword, isPlaying, country } = channel;
  const [label, setLabel] = useState(null);
  useEffect(() => {
    if (url !== null) {
      urls.forEach((c) => {
        const neededChannel = c.content.filter((i) => i.url === url);
        if (neededChannel.length !== 0) {
          setLabel(neededChannel[0]);
        }
      });
    }
  }, [url]);
  const {
    isEmpty,
    link,
    handleRandom,
    handleSubmit,
    handleLink,
    handleChange,
  } = useContext(NavigationContext);
  return (
    <nav
      className={`nav ${isPlaying && label !== null ? "nav--two" : ""}`}
      role="navigation"
    >
      <div
        className={`nav__row ${
          isPlaying && label !== null ? "nav__row--two" : ""
        }`}
      >
        {isPlaying && label !== null && (
          <div className="nav__label">
            <SiAirplayaudio />
            <span className="lc">{label.title}</span>
            <span className="nav__label__span">
              <em>
                <strong>{label.country.toUpperCase()}</strong>
              </em>
              {fixAllFlags(country)}
            </span>
          </div>
        )}
        <div>
          <div className="nav__content">
            {/* <a
              href="http://jackal.surge.sh"
              className="nav__btn"
              aria-label="Open HTTP version of this website"
              title="Open HTTP version of this website"
            >
              <MdHttp />
            </a>
            <a
              href="#"
              className="nav__btn"
              onClick={handleLink}
              aria-label="Enter video source"
              title="Enter video source"
            >
              <FaLink />
            </a> */}
            <Toggle theme={theme} toggleTheme={toggleTheme} />
            <a
              href="#"
              className="nav__btn"
              onClick={handleShowFaq}
              aria-label="Get help"
              title="Get help"
            >
              <FiHelpCircle />
            </a>
            <a
              href="#"
              className="nav__btn"
              onClick={handleShowList}
              aria-label="Watch channels"
              title="Watch channels"
            >
              <FaList />
            </a>
            <a
              href="#"
              className="nav__btn"
              onClick={handleRandom}
              aria-label="Watch random channel"
              title="Watch random channel"
            >
              <BsShuffle />
            </a>
            <Cart channel={channel} setChannel={setChannel} />
            <a
              className="nav__btn"
              href="https://www.buymeacoffee.com/tpkahlon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buy me a coffee"
              title="Buy me a coffee"
            >
              <TbCoffee />
            </a>
            <a
              className="nav__btn children"
              href="https://www.savethechildren.org/us/ways-to-help"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Help make a difference in a child's life"
              title="Help make a difference in a child's life"
            >
              <FaChild />
            </a>
          </div>
          <form className="nav__form" onSubmit={handleSubmit}>
            {link && (
              <div className="nav__form__items">
                <input
                  className="nav__form__input"
                  type="url"
                  name="keyword"
                  value={keyword}
                  onChange={handleChange}
                  placeholder="Video source..."
                />
                <a
                  href="#"
                  className={`nav__form__btn ${
                    isEmpty ? "nav__form__btn--off" : ""
                  }`}
                  aria-label="Play"
                  onClick={handleSubmit}
                >
                  <FaPlay />
                </a>
              </div>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
