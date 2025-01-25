import "../css/TextPrompt.css"
function TextPrompt({ value, onChange, placeholder = "Enter your query here...", rows = 4 }) {
    return (
      <div className="text-prompt-container">
        <textarea
          className="text-prompt-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
        ></textarea>
      </div>
    );
  }
export default TextPrompt