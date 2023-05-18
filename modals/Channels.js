import React, { useContext, useState, useEffect } from "react";
import Modal from "react-modal";
import { FiRefreshCw } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import MenuContext from "../context/MenuContext";
import ChannelsContext from "../context/ChannelsContext";
import ChannelsBox from "../components/ChannelsBox";

const Channels = () => {
  const { channel, setChannel } = useContext(MenuContext);
  const { showList, setShowList } = useContext(ChannelsContext);
  const [searchText, setSearchText] = useState("");
  const [originalState] = useState(channel);
  const { urls } = channel;
  const handleClose = (e) => {
    e.preventDefault();
    setShowList(false);
  };
  const handleChange = (e) => {
    const { value } = e.target;
    const newChannels = {
      ...channel,
      isPlaying: null,
      url: null,
    };
    setSearchText(value.toLowerCase());
    setChannel(newChannels);
  };
  const handleClearSearch = (e) => {
    e.preventDefault();
    const newChannels = {
      ...channel,
      isPlaying: null,
      url: null,
    };
    setSearchText("");
    setChannel(newChannels);
  };
  useEffect(() => {
    const newChannel = { ...originalState };
    const { urls } = newChannel;
    const newUrls = urls
      .map((i) => {
        const newContent = i.content.filter((j) =>
          j.title.toLowerCase().includes(searchText.trim())
        );
        return {
          ...i,
          content: newContent,
        };
      })
      .filter((i) => i.content.length !== 0);
    const newChannels = {
      ...newChannel,
      urls: newUrls,
      isPlaying: channel.url,
      url: channel.url,
    };
    setChannel(newChannels);
  }, [searchText]);
  return (
    <Modal
      isOpen={showList}
      className="modal"
      overlayClassName="overlay"
      onRequestClose={handleClose}
    >
      <header className="modal__header">
        <aside className="modal__aside">Channels</aside>
        <footer className="modal__footer">
          <a href="#" onClick={handleClose} aria-label="Exit">
            <AiOutlineCloseCircle />
          </a>
        </footer>
      </header>
      <section
        className={`modal__search ${
          searchText.trim() === "" ? "" : "modal__search--filled"
        }`}
      >
        <input
          placeholder="Search a channel..."
          type="text"
          value={searchText}
          className="modal__input"
          onChange={handleChange}
        />
        <a
          href="#"
          aria-label="Clear Search"
          onClick={handleClearSearch}
          className={`modal__reset ${
            searchText.trim() !== "" ? "modal__reset--visible" : ""
          }`}
        >
          <FiRefreshCw />
        </a>
      </section>
      <section className="modal__section">
        {urls.length === 0 && searchText.trim() !== "" ? (
          <p className="empty-list">
            No matching channels found, please try again...
          </p>
        ) : (
          <ChannelsBox />
        )}
      </section>
    </Modal>
  );
};

export default Channels;
