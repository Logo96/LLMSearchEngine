import React, { useState } from "react";
import "../css/StatisticsPanel.css";

function StatisticsPanel({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <button
                className={`statistics-button ${isOpen ? "panel-open" : ""}`}
                onClick={togglePanel}
                style={{
                    position: "fixed",
                    bottom: "1%",
                    right: isOpen ? "32vw" : "10px", 
                    transition: "right 0.3s ease-in-out",
                }}
            >
                <i className="fas fa-chart-bar"></i>
            </button>

            {isOpen && <div className="overlay" onClick={togglePanel}></div>}

            <div className={`statistics-panel ${isOpen ? "open" : ""}`}>
                <div className="statistics-header">
                    <h2>Statistics</h2>
                    <button className="close-button" onClick={togglePanel}>
                        &times;
                    </button>
                </div>
                <div className="statistics-content">
                    {children}
                </div>
            </div>
        </>
    );
}
export default StatisticsPanel;