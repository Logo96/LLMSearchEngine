import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRobot } from "@fortawesome/free-solid-svg-icons";

const LLMOutput = ({ prompt, output }) => {
  const markdownContent = `
# Understanding Artificial Intelligence (AI)

Artificial Intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning (acquiring information and rules for using it), reasoning (using rules to reach approximate or definite conclusions), and self-correction. 

---

## Table of Contents
1. Introduction
2. History of AI
3. Types of AI
4. Applications of AI
5. Challenges in AI Development
6. Future of AI

---

## 1. Introduction

AI has the potential to transform every aspect of human life, from healthcare to transportation, education, and entertainment. Today, AI systems are being used to improve efficiency, reduce human effort, and enhance decision-making processes.

### Example: AI in Everyday Life
- **Voice Assistants:** Amazon Alexa, Google Assistant, Siri.
- **Smart Recommendations:** Netflix, YouTube, Spotify.
- **Healthcare Innovations:** Predictive diagnostics, robotic surgery.

---

## 2. History of AI

AI as a concept has existed for centuries. However, modern AI research began in the mid-20th century.

### Milestones in AI:
- **1943:** McCulloch and Pitts introduced the first artificial neuron model.
- **1956:** Dartmouth Conference coined the term "Artificial Intelligence."
- **1997:** IBM’s Deep Blue defeated chess champion Garry Kasparov.
- **2016:** Google’s AlphaGo defeated a Go world champion.

---

## 3. Types of AI

There are several ways to classify AI, but one common method is based on its capabilities:

### a) Narrow AI (Weak AI)
AI designed for a specific task, such as recognizing faces or recommending movies.
- Example: ChatGPT, facial recognition software.

### b) General AI (Strong AI)
AI that can perform any intellectual task a human can do. This is still theoretical and not yet achieved.

### c) Super AI
An AI that surpasses human intelligence. This is hypothetical and the subject of debate in both scientific and ethical circles.

---

## 4. Applications of AI

AI is revolutionizing various industries. Here are a few examples:

### Healthcare
- Predicting diseases based on patient data.
- Analyzing medical images for faster diagnosis.

### Education
- Personalized learning tools.
- AI tutors that adapt to student needs.

### Transportation
- Autonomous vehicles (e.g., Tesla).
- Route optimization for delivery services.

### Entertainment
- AI-generated art, music, and movies.
- Real-time game NPC decision-making.

---

## 5. Challenges in AI Development

Despite its benefits, AI faces significant challenges:

### Ethical Concerns
- **Bias:** AI systems can inherit biases from the data they are trained on.
- **Privacy:** Collecting large amounts of user data raises privacy concerns.

### Technical Limitations
- **Energy Consumption:** Training large AI models requires significant computational resources.
- **Interpretability:** Many AI systems are “black boxes,” making their decisions hard to explain.

### Economic and Social Issues
- **Job Displacement:** Automation may replace many human jobs.
- **Inequality:** Access to advanced AI technology may widen the gap between rich and poor.

---

## 6. Future of AI

AI will continue to evolve, but its development must be guided by ethical and practical considerations.

### Key Trends
1. **Explainable AI (XAI):** Making AI systems more transparent.
2. **Human-AI Collaboration:** Combining the strengths of humans and machines.
3. **Regulation:** Governments creating policies to ensure responsible AI use.

---

## Summary

Artificial Intelligence is a transformative technology with the potential to change the world. By addressing its challenges and leveraging its opportunities, we can build a future where AI enhances human life while respecting ethical boundaries.

---

### Code Example: Simple AI Model in Python

python
from sklearn.linear_model import LinearRegression
import numpy as np

# Data
X = np.array([[1], [2], [3], [4]])
y = np.array([2, 4, 6, 8])

# Model
model = LinearRegression()
model.fit(X, y)

# Prediction
prediction = model.predict([[5]])
print(f"Prediction for input 5: {prediction[0]}")


# Prediction
print(model.predict([[4]]))  # Output: 8.0
\`\`\`
`;

  return (
    <div className="output-wrapper">
      <div className="prompt-output-container">
        <div className="prompt-display">
          <p className="prompt-text">
            {prompt || "What happens if I type in a really long query?"}
          </p>
          <FontAwesomeIcon icon={faUser} size="2x" className="icon-user" />
        </div>

        <div className="output-container">
          <FontAwesomeIcon icon={faRobot} size="2x" className="icon-output" />
          <ReactMarkdown className="output-text">
            {output || markdownContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default LLMOutput;
