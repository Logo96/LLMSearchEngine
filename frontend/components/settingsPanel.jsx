import React, { useState } from "react";
import "../css/SettingsPanel.css";

function SettingsPanel({ children }) {
    const [isOpen, setIsOpen] = useState(false)
    const togglePanel = () => {
        setIsOpen(!isOpen)
    };
    return (
        <>
          <button className="settings-button" onClick={togglePanel}>
            Settings
          </button>
          {isOpen && <div className="overlay" onClick={togglePanel}></div>}
          <div className={`settings-panel ${isOpen ? "open" : ""}`}>
            <div className="settings-content">
              { children }
            </div>
          </div>
        </>
      );
    }
export default SettingsPanel;