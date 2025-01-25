import './App.css'
import APIButton from '../components/button.jsx'
import TextPrompt from '../components/textprompt.jsx'

function App() {
  return (
    <div> 
      <APIButton endpoint="http://127.0.0.1:8000/inference/rag"
      method="POST"
        body = {{
          query: "What is the capital of France?",
          llm_model: "Qwen/Qwen2.5-0.5B",
          embedding_model: "all-MiniLM-L6-v2",
          temperature: 0.3,
          top_k: 50,
          top_p: 0.9,
          max_tokens: 500}}
        onSuccess={(data) => alert(`Response: ${JSON.stringify(data)}`)}
        onError={(err) => alert(`Error: ${err.message}`)}
        buttonStyle="primary"
      >
        Send Inference Request W/O RAG
      </APIButton>
      <APIButton endpoint="http://127.0.0.1:8000/"
      method="GET"
        onSuccess={(data) => alert(`Response: ${JSON.stringify(data)}`)}
        onError={(err) => alert(`Error: ${err.message}`)}
        buttonStyle="primary"
      >
        Server up?
      </APIButton>
      <TextPrompt>
        Test
      </TextPrompt>
    </div>
  )
}

export default App
