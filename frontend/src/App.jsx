import './App.css'
import APIButton from '../components/button.jsx'
import TextPrompt from '../components/textprompt.jsx'
import Query from '../components/query.jsx'
import Backdrop from "../components/backdrop.jsx"
import { useState } from 'react'

function App() {
  const [inference_Request, setInference_Request] = useState({
    endpoint: "http://127.0.0.1:8000/inference/rag",
    method: "POST",
    body: {
        query: "",
        llm_model: "Qwen/Qwen2.5-0.5B",
        embedding_model: "all-MiniLM-L6-v2",
        temperature: 0.5,
        top_k: 50,
        top_p: 0.8,
        max_tokens: 100
    }
  })
  const handleParameter_Change = (e) => { inference_Request.body = e }
  const handlePrompt_Change = (e) => { inference_Request.body.query = e }
  return (
    <Backdrop>
        <Query setPrompt_Request={handlePrompt_Change} setParameters={handleParameter_Change}>
        </Query>
    </Backdrop>
  )
}
export default App
