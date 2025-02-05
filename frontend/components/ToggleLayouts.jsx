import React, { useState } from 'react';
import SideBySideMarkdown from './SideBySideMarkdown.jsx';
import LLMOutput from './LLMOutput.jsx';
import Sources from './sources.jsx';
import StatisticsPanel from './statisticsbutton.jsx';
import '../css/LayoutButtons.css'
import '../css/LLMOutput.css'

const ToggleLayouts = ( {apiResponse} ) => {
  const [activePanel, setActivePanel] = useState("LLM");

  const renderLLMLayout = () => (
    <div className="flex flex-col gap-4">
    <StatisticsPanel> <Sources sources={apiResponse.model_RAG_sources}></Sources> </StatisticsPanel>
    <LLMOutput prompt={apiResponse.model_query_basic} output={apiResponse.model_output_basic} >

    </LLMOutput>
    </div>
  );
  const renderComparisonLayout = () => (
    <div className="flex flex-col gap-4">
    <StatisticsPanel> <Sources sources={apiResponse.model_RAG_sources}></Sources> </StatisticsPanel>
      <SideBySideMarkdown leftText={apiResponse.model_output_basic} rightText={apiResponse.model_output_RAG}>
      </SideBySideMarkdown>
    </div>
  );
  const renderRAGLayout = () => (
    <div className="grid grid-cols-2 gap-4">
    <StatisticsPanel> <Sources sources={apiResponse.model_RAG_sources}></Sources> </StatisticsPanel>
    <LLMOutput prompt={apiResponse.model_query_RAG} output={apiResponse.model_output_RAG}>
    </LLMOutput>
    </div>
  );

  return (
    <div className="p-6">
      <div className="button-container">
        <button
          onClick={() => setActivePanel("LLM")}
          className={activePanel === "LLM" ? "layout-button pressed" : "layout-button"}
        >
          LLM
        </button>
        <button
          onClick={() => setActivePanel("Comparison")}
          className={activePanel === "Comparison" ? "layout-button pressed" : "layout-button"}
        >
          Comparison
        </button>
        <button
          onClick={() => setActivePanel("Rag")}
          className={activePanel === "Rag" ? "layout-button pressed" : "layout-button"}
        >
          RAG
        </button>
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
