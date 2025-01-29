import React from "react";
import "../css/Sources.css";

const Sources = ({ sources }) => {
  if (!sources || sources.length === 0) {
    return <p className="no-sources">No sources available.</p>;
  }

  return (
    <div className="sources-container">
      <ul className="sources-list">
        {sources.map(([title, url], index) => (
          <li key={index} className="source-item">
            <a href={url} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sources;
