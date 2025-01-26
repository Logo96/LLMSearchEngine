import React, { useState } from "react";
import Controls from "./controls"
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../css/SettingsPanel.css";

function SettingsPanel({onParameterChange}) {
    const [isOpen, setIsOpen] = useState(false)
    const togglePanel = () => {
        setIsOpen(!isOpen)
    };
    return (
        <>
          {/* Settings Button */}
          <button className="settings-button" onClick={togglePanel}>
          <i className="fas fa-cog"></i>
          </button>
    
          {/* Overlay to close the panel when clicking outside */}
          {isOpen && <div className="overlay" onClick={togglePanel}></div>}
    
          {/* Right Panel */}
          <div className={`settings-panel ${isOpen ? "open" : ""}`}>
            <div className="settings-header">
              <h2>Settings</h2>
              <button className="close-button" onClick={togglePanel}>
                &times;
              </button>
            </div>
            <div className="settings-content">
              <Controls onParameterChange={onParameterChange}>
              </Controls>
            </div>
          </div>
        </>
      );
    }
export default SettingsPanel;