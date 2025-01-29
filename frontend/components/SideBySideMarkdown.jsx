import React, { useRef } from "react";
import ReactMarkdown from "react-markdown";
import "../css/SideBySideMarkdown.css";

const SideBySideMarkdown = ({ leftText, rightText }) => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const handleScroll = (e) => {
    if (e.target === leftRef.current) {
      rightRef.current.scrollTop = e.target.scrollTop;
    } else if (e.target === rightRef.current) {
      leftRef.current.scrollTop = e.target.scrollTop;
    }
  };

  return (
    <div className="side-by-side-markdown">
      <div
        className="markdown-container left-markdown"
        ref={leftRef}
        onScroll={handleScroll}
      >
        <ReactMarkdown>{leftText}</ReactMarkdown>
      </div>
      <div
        className="markdown-container right-markdown"
        ref={rightRef}
        onScroll={handleScroll}
      >
        <ReactMarkdown>{rightText}</ReactMarkdown>
      </div>
    </div>
  );
};

export default SideBySideMarkdown;

