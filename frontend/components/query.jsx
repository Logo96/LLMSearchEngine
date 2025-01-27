import SettingsPanel from "./settingsPanel";
import TextPrompt from "./textprompt";
function Query( {handleParameterChange, setPrompt_Request, currentInferenceRequest} ) {
    return (
        <div style={{position: "relative"}}>
            <h1>What can I help you find?</h1>
            <TextPrompt onPromptChange={setPrompt_Request}>
            </TextPrompt>
            <SettingsPanel handleParameterChange={handleParameterChange} currentInferenceRequest={currentInferenceRequest}>
            </SettingsPanel>
        </div>
    )
}
export default Query