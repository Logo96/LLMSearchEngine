import React, { useState } from "react";
function Controls({onParameterChange}) {
    const [temperature, setTemperature] = useState(0.5)
    const [top_p, setTop_P] = useState(0.8)
    const [top_k, setTop_K] = useState(50)
    const [max_Tokens, setMax_Tokens] = useState(100)
    const [llm_Model, setLLM_Model] = useState("Qwen/Qwen2.5-0.5B")
    const [embedding_Model, setEmbedding_Model] = useState("all-MiniLM-L6-v2")
    
    const handleTemperatureChange = (e) => setTemperature(parseFloat(e.target.value));
    const handleTopPChange = (e) => setTop_P(parseFloat(e.target.value));
    const handleTopKChange = (e) => setTop_K(parseFloat(e.target.value));
    const handleMaxTokensChange = (e) => setMax_Tokens(parseInt(e.target.value, 10));
    const handleLLMChange = (e) => setLLM_Model(e.target.value);
    const handleEmbedChange = (e) => setEmbedding_Model(e.target.value);
  
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
            value={temperature}
            step="0.1"
            min="0"
            max="1"
            onChange={handleTemperatureChange}
            className="border p-2 rounded w-full"
          />
        </div>
  
        {/* Top P */}
        <div>
          <label className="block font-medium">Top P:</label>
          <input
            type="number"
            value={top_p}
            step="0.1"
            min="0"
            max="1"
            onChange={handleTopPChange}
            className="border p-2 rounded w-full"
          />
        </div>
  
        {/* Top K */}
        <div>
          <label className="block font-medium">Top K:</label>
          <input
            type="number"
            value={top_k}
            step="1"
            min="0"
            onChange={handleTopKChange}
            className="border p-2 rounded w-full"
          />
        </div>
  
        {/* Max Tokens */}
        <div>
          <label className="block font-medium">Max Tokens:</label>
          <input
            type="number"
            value={max_Tokens}
            step="1"
            min="1"
            onChange={handleMaxTokensChange}
            className="border p-2 rounded w-full"
          />
        </div>
  
        {/* LLM Model */}
        <div>
          <label className="block font-medium">llm_Model:</label>
          <select
            value={llm_Model}
            onChange={handleLLMChange}
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
            value={embedding_Model}
            onChange={handleEmbedChange}
            className="border p-2 rounded w-full"
          >
            {supported_Embedding_Models.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
  
        {/* Display Current Values */}
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-medium">Generation Parameters:</h3>
          <pre>{JSON.stringify({ temperature, top_p, top_k, max_Tokens, llm_Model, embedding_Model }, null, 2)}</pre>
        </div>
      </div>
    );
  }
  export default Controls