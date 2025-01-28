import React, { useState } from "react";
import "../css/SettingsPanel.css";

function SettingsPanel({ children }) {
    const [isOpen, setIsOpen] = useState(false)
    const togglePanel = () => {
        setIsOpen(!isOpen)
    };
    return (
        <>
          {/* Settings Button */}
          <button className="settings-button" onClick={togglePanel}>
            Settings
          </button>
    
          {/* Overlay to close the panel when clicking outside */}
          {isOpen && <div className="overlay" onClick={togglePanel}></div>}
    
          {/* Right Panel */}
          <div className={`settings-panel ${isOpen ? "open" : ""}`}>
            <div className="settings-content">
              { children }
            </div>
          </div>
        </>
      );
    }
export default SettingsPanel;