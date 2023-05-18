import CountUp from "react-countup";
import { useEffect, useState, useContext } from "react";
import MenuContext from "../context/MenuContext";

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const Total = () => {
  const [text, setText] = useState("Unlimited");
  const { channel } = useContext(MenuContext);
  const { urls } = channel;
  const newText =
    urls && urls.length > 0
      ? urls.map((i) => i.content.length).reduce(reducer)
      : 0;
  useEffect(() => {
    setText(newText);
  }, []);
  return (
    <CountUp duration={15} end={newText} start={0} useEasing separator="" />
  );
};

export default Total;
