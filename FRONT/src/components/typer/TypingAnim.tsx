import React from "react";
import { TypeAnimation } from "react-type-animation";

const TypingAnim = () => {
  return (
    <TypeAnimation
    sequence={[
        // Same substring at the start will only be typed once, initially
        "Unleashing the Power!",
        1000,
        "Our Chatbot's Performance Surpasses Expectations! 💻",
        2000,
        "Elevating Conversations!🤖 ",
        1500,
        "The Outstanding Performance of Our Chatbot",
        1000,
    ]}
    speed={50}
      style={{
        fontSize: "40px",
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;
