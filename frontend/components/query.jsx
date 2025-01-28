import SettingsPanel from "./settingsPanel";
import TextPrompt from "./textprompt";
import Controls from "./controls";
function Query( {handleParameterChange, setPrompt_Request, currentInferenceRequest} ) {
    return (
        <div style={{position: "relative"}}>
            <h1>What can I help you find?</h1>
            <TextPrompt onPromptChange={setPrompt_Request}>
            </TextPrompt>
            <SettingsPanel handleParameterChange={handleParameterChange} currentInferenceRequest={currentInferenceRequest}>
                <Controls handleParameterChange={handleParameterChange} currentInferenceRequest={currentInferenceRequest}>
                </Controls>
            </SettingsPanel>
        </div>
    )
}
export default Query