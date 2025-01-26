import SettingsPanel from "./settingsPanel";
import TextPrompt from "./textprompt";
function Query( {setParameters, setPrompt_Request} ) {
    return (
        <div style={{position: "relative"}}>
            <h1>What can I help you find?</h1>
            <TextPrompt onPromptChange={setPrompt_Request}>
            </TextPrompt>
            <SettingsPanel onParameterChange={setParameters}>
            </SettingsPanel>
        </div>
    )
}
export default Query