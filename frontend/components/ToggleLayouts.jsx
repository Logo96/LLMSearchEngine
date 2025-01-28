import React, { useState } from 'react';
import { Card, CardContent } from "../components/promptCard";
import Button from "../components/button.jsx"
import StatisticsPanel from './statisticsbutton.jsx';

const ToggleLayouts = () => {
  const [activePanel, setActivePanel] = useState("LLM");

  const renderLLMLayout = () => (
    <div className="flex flex-col gap-4">
    <StatisticsPanel></StatisticsPanel>
      <Card>
        <CardContent>
          <p className="text-xl font-semibold">Prompt:</p>
          <textarea
            className="w-full p-2 border rounded-lg resize-none"
            rows={4}
            placeholder="Enter your prompt here..."
          ></textarea>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <p className="text-xl font-semibold">LLM Output:</p>
          <div className="p-2">Output will appear here...</div>
        </CardContent>
      </Card>
    </div>
  );
  const renderComparisonLayout = () => (
    <div className="grid grid-cols-2 gap-4">
    <StatisticsPanel></StatisticsPanel>
      <Card>
        <CardContent>
          <p className="text-xl font-semibold">Prompt:</p>
          <textarea
            className="w-full p-2 border rounded-lg resize-none"
            rows={4}
            placeholder="Enter your prompt here..."
          ></textarea>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <p className="text-xl font-semibold">Comparison:</p>
          <div className="p-2">Output will appear here...</div>
        </CardContent>
      </Card>
    </div>
  );
  const renderRAGLayout = () => (
    <div className="grid grid-cols-2 gap-4">
    <StatisticsPanel></StatisticsPanel>
      <Card>
        <CardContent>
          <p className="text-xl font-semibold">Prompt:</p>
          <textarea
            className="w-full p-2 border rounded-lg resize-none"
            rows={4}
            placeholder="Enter your prompt here..."
          ></textarea>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <p className="text-xl font-semibold">RAG:</p>
          <div className="p-2">Output will appear here...</div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-6">
        <Button
          onClick={() => setActivePanel("LLM")}
          className={activePanel === "LLM" ? "bg-blue-500 text-white" : "bg-gray-200"}
        >
          LLM
        </Button>
        <Button
          onClick={() => setActivePanel("Comparison")}
          className={activePanel === "Comparison" ? "bg-blue-500 text-white" : "bg-gray-200"}
        >
          Comparison
        </Button>
        <Button
          onClick={() => setActivePanel("Rag")}
          className={activePanel === "Rag" ? "bg-blue-500 text-white" : "bg-gray-200"}
        >
          Rag 
        </Button>
      </div>
      <div>
        {activePanel === "LLM" && renderLLMLayout()}
        {activePanel === "Comparison" && renderComparisonLayout()}
        {activePanel === "Rag" && renderRAGLayout()}
      </div>
    </div>
  );
};

export default ToggleLayouts;
