import './App.css';
import { useState } from 'react';
import Home from "../pages/Home";
import Output from '../pages/Output'; 
import NavigationBar from '../components/navigationbar';

function App() {
  const [isHome, setIsHome] = useState(true);
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inference_Request, setInference_Request] = useState({
    endpoint: "http://127.0.0.1:8000/inference",
    method: "POST",
    body: {
      query: "",
      llm_model: "gpt-4-turbo",
      embedding_model: "all-MiniLM-L6-v2",
      temperature: 0.5,
      top_k: 50,
      top_p: 0.5,
      max_tokens: 500,
    },
  });

  async function sendApiRequest() {
    setLoading(true);
    try {
      const options = {
        method: inference_Request.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: inference_Request.body ? JSON.stringify(inference_Request.body) : null,
      };
      const response = await fetch(inference_Request.endpoint, options);
      if (!response.ok) {
        throw new Error(`HTTP error, status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
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
  const handleHomeButtonPressed = () => {
    if (isHome) {
      setInference_Request((prev) => ({
        ...prev,
        body: {
          query: "",
          llm_model: "Qwen/Qwen2.5-0.5B",
          embedding_model: "all-MiniLM-L6-v2",
          temperature: 0.5,
          top_k: 50,
          top_p: 0.5,
          max_tokens: 500,
        },
      }));
    } else {
      setIsHome(true);
    }
  };

  const handleHomeChange = async () => {
    setIsHome(false);
    const result = await sendApiRequest();
    if (result) {
      setApiResponse(result);
    }
  };

  return (
    <div>
      <NavigationBar setIsHome={handleHomeButtonPressed} />
      {isHome ? (
        <Home
          handleHomeChange={handleHomeChange}
          handleParameter_Change={handleParameterChange}
          currentInferenceRequest={inference_Request.body}
        />
      ) : (
        <Output apiResponse={apiResponse} loading={loading} />
      )}
    </div>
  );
}

export default App;
