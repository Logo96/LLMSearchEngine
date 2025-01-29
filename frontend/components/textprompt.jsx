import "../css/TextPrompt.css"
function TextPrompt({ value, onPromptChange, placeholder = "Enter your query here...", rows = 3 }) {
  const handleEnterDown = (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
      if (e.target.value.trim() != "") {
        onPromptChange(value, true);
      } 
    }
  };
    return (
      <div className="text-prompt-container">
        <textarea
          className="text-prompt-input"
          value={value}
          onKeyDown={handleEnterDown}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
        ></textarea>
      </div>
    );
  }
export default TextPrompt