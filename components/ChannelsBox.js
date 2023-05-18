import React, { useState, useContext } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import ReactCountryFlag from "react-country-flag";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import { fixBrokenFlags } from "../common/components";
import MenuContext from "../context/MenuContext";
import ChannelsListContext from "../context/ChannelsListContext";
import ChannelsList from "./ChannelsList";

const ChannelsBox = () => {
  const { channel } = useContext(MenuContext);
  const { urls } = channel;
  const [show, setShow] = useState(null);
  return (
    <Accordion allowZeroExpanded>
      {urls.map(({ content, id, code, cTitle }) => {
        const handleClick = (e, id) => {
          const key = e.currentTarget.dataset.key
            ? Number(e.currentTarget.dataset.key)
            : 0;
          if (key === id) {
            setShow(id);
          } else {
            setShow(null);
          }
        };
        return (
          <AccordionItem key={id}>
            <AccordionItemHeading
              className={`accordion__heading ${show === id ? "active" : ""}`}
              data-key={id}
              onClick={(e) => handleClick(e, id)}
            >
              {content.length !== 0 ? (
                <AccordionItemButton className="accordion__btn">
                  <div className="accordion__details">
                    <div className="accordion__title">
                      <AccordionItemState>
                        {({ expanded }) =>
                          expanded ? <VscChevronUp /> : <VscChevronDown />
                        }
                      </AccordionItemState>
                      <div className="accordion__country">{cTitle}</div>
                    </div>
                    <div className="accordion__data">
                      <div className="accordion__flag">
                        {code !== null &&
                        code.country !== "Netherlands Antilles" ? (
                          <ReactCountryFlag
                            className="accordion__flag__img"
                            svg
                            countryCode={code.iso2}
                          />
                        ) : (
                          fixBrokenFlags(content[0].country)
                        )}
                      </div>
                      <div className="accordion__content">{content.length}</div>
                    </div>
                  </div>
                </AccordionItemButton>
              ) : (
                "Undefined"
              )}
            </AccordionItemHeading>
            {show === id ? (
              <AccordionItemPanel
                children={
                  <ChannelsListContext.Provider
                    value={{
                      item: content,
                    }}
                  >
                    <ChannelsList />
                  </ChannelsListContext.Provider>
                }
              />
            ) : null}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default ChannelsBox;
