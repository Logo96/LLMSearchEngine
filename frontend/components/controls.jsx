import React, { useState } from "react";
import Slider from '@mui/material/Slider';
import "../css/Controls.css";

function Controls({ handleParameterChange, currentInferenceRequest }) {
  const supported_LLM_Models = ["Qwen/Qwen2.5-0.5B"];
  const supported_Embedding_Models = ["all-MiniLM-L6-v2"];

  return (
    <div className="controls-panel">
      <h2 className="text-xl font-bold">Set Parameters</h2>

      {/* Generation Parameters Section */}
      <div>
        <h3 className="section-title">Generation Parameters</h3>

        {/* Temperature */}
        <div className="parameter-group">
          <label className="block font-medium">Temperature: {currentInferenceRequest.temperature}</label>
          <Slider
            value={currentInferenceRequest.temperature}
            step={0.1}
            min={0}
            max={1}
            onChange={(e, newValue) => handleParameterChange("temperature", newValue)} // Correct event handling
            className="w-full"
        />
        </div>

        {/* Top P */}
        <div className="parameter-group">
          <label className="block font-medium">Top P: {currentInferenceRequest.top_p}</label>
          <Slider
            value={currentInferenceRequest.top_p}
            step={0.1}
            min={0}
            max={1}
            onChange={(e, newValue) => handleParameterChange("top_p", newValue)}
            className="w-full"
          />
        </div>

        {/* Top K */}
        <div className="parameter-group">
          <label className="block font-medium">Top K: {currentInferenceRequest.top_k}</label>
          <Slider
            value={currentInferenceRequest.top_k}
            step={1}
            min={0}
            onChange={(e, newValue) => handleParameterChange("top_k", newValue)}
            className="w-full"
          />
        </div>

        {/* Max Tokens */}
        <div className="parameter-group">
          <label className="block font-medium">Max Tokens: {currentInferenceRequest.max_tokens}</label>
          <Slider
            value={currentInferenceRequest.max_tokens}
            step={1}
            min={1}
            max={1000}
            onChange={(e, newValue) => handleParameterChange("max_tokens", newValue)}
            className="w-full"
          />
        </div>
      </div>

      {/* Model Parameters Section */}
      <div>
        <h3 className="section-title">Model Parameters</h3>

        {/* LLM Model */}
        <div className="parameter-group">
          <label className="block font-medium">LLM Model:</label>
          <select
            value={currentInferenceRequest.llm_model}
            onChange={(e) => handleParameterChange("llm_model", e.target.value)}
            className="border p-2 rounded w-full"
          >
            {supported_LLM_Models.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Embedding Model */}
        <div className="parameter-group">
          <label className="block font-medium">Embedding Model:</label>
          <select
            value={currentInferenceRequest.embedding_model}
            onChange={(e) => handleParameterChange("embedding_model", e.target.value)}
            className="border p-2 rounded w-full"
          >
            {supported_Embedding_Models.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Controls;