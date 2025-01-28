import './App.css'
import { useState } from 'react'
import Home from "../pages/Home"
import Output from '../pages/Output' 
import NavigationBar from '../components/navigationbar'
function App() {
  const [isHome, setIsHome] = useState(true)
  const [inference_Request, setInference_Request] = useState({
    endpoint: "http://127.0.0.1:8000/inference/rag",
    method: "POST",
    body: {
        query: "",
        llm_model: "Qwen/Qwen2.5-0.5B",
        embedding_model: "all-MiniLM-L6-v2",
        temperature: 0.6,
        top_k: 50,
        top_p: 0.8,
        max_tokens: 100
    }
  })
  async function sendApiRequest() {
    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: inference_Request.body ? JSON.stringify(inference_Request.body) : null,
      };
      const response = await fetch(inference_Request.endpoint, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (onSuccess) onSuccess(data);
    } catch (error) {
      console.error("Error:", error);
      if (onError) onError(error);
    }
  }

  const handleParameterChange = (key, value) => {
    setInference_Request((prevInference_Request) => ({
      ...prevInference_Request,
      body: {
        ...prevInference_Request.body,
        [key]: value,
      },
    }));
  };
  
  const handleHomeChange = () => {
    //Send the Api Request
    //Load until results come back
    //Switch screens and display output
    setIsHome(!isHome);
  }
  return (
    <div>
      <NavigationBar setIsHome={setIsHome}/>
        {isHome ? <Home handleHomeChange={handleHomeChange} handleParameter_Change={handleParameterChange} currentInferenceRequest={inference_Request.body}/> : <Output/> }
    </div>
  )
}
export default App
