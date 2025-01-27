import React, { useState } from "react";
function Controls({handleParameterChange, currentInferenceRequest}) {
  
    const supported_LLM_Models = ["Qwen/Qwen2.5-0.5B"];
    const supported_Embedding_Models = ["all-MiniLM-L6-v2"];
  
    return (
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold">Set Generation Parameters</h2>
        
        {/* Temperature */}
        <div>
          <label className="block font-medium">Temperature:</label>
          <input
            type="number"
            value={currentInferenceRequest.temperature}
            step="0.1"
            min="0"
            max="1"
            onChange={(e) => {handleParameterChange("temperature", e.target.value)}}
            className="border p-2 rounded w-full"
          />
        </div>
  
        {/* Top P */}
        <div>
          <label className="block font-medium">Top P:</label>
          <input
            type="number"
            value={currentInferenceRequest.top_p}
            step="0.1"
            min="0"
            max="1"
            onChange={(e) => {handleParameterChange("top_p", e.target.value)}}
            className="border p-2 rounded w-full"
          />
        </div>
  
        {/* Top K */}
        <div>
          <label className="block font-medium">Top K:</label>
          <input
            type="number"
            value={currentInferenceRequest.top_k}
            step="1"
            min="0"
            onChange={(e) => {handleParameterChange("top_k", e.target.value)}}
            className="border p-2 rounded w-full"
          />
        </div>
  
        {/* Max Tokens */}
        <div>
          <label className="block font-medium">Max Tokens:</label>
          <input
            type="number"
            value={currentInferenceRequest.max_tokens}
            step="1"
            min="1"
            onChange={(e) => {handleParameterChange("max_tokens", e.target.value)}}
            className="border p-2 rounded w-full"
          />
        </div>
  
        {/* LLM Model */}
        <div>
          <label className="block font-medium">llm_Model:</label>
          <select
            value={currentInferenceRequest.llm_model}
            onChange={(e) => {handleParameterChange("llm_model", e.target.value)}}
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
        <div>
          <label className="block font-medium">Embedding Model:</label>
          <select
            value={currentInferenceRequest.embedding_model}
            onChange={(e) => {handleParameterChange("embedding_model", e.target.value)}}
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
    );
  }
  export default Controls