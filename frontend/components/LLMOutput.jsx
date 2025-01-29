import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRobot } from "@fortawesome/free-solid-svg-icons";

const LLMOutput = ({ prompt, output }) => {
  return (
    <div className="output-wrapper">
      <div className="prompt-output-container">
        <div className="prompt-display">
          <ReactMarkdown className="prompt-text">
            {prompt || "Failed to load query"}
          </ReactMarkdown>
          <FontAwesomeIcon icon={faUser} size="2x" className="icon-user" />
        </div>

        <div className="output-container">
          <FontAwesomeIcon icon={faRobot} size="2x" className="icon-output" />
          <ReactMarkdown className="output-text">
            {output || "Failed to load output"}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default LLMOutput;
