import React from "react";

const HighlightText = ({text}) => {
  return (
    <span className="bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-extrabold drop-shadow-[0_0_15px_rgba(18,216,250,0.5)]">
      {" "}
      {text}
    </span>
  );
};

export default HighlightText;