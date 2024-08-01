import axios from "axios";
import React, { useState } from "react";

const Chatbot = ({ pname }) => {
  const [prompt, setPrompt] = useState("");
  const [promptResponse, setPromptResponse] = useState([]);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  const prompts = [
    `Why are ${pname} used`,
    `which is the complex part of ${pname} in 450 words`,
    `What should you expect during a ${pname}in 450 words`,
    // `What is the most important pre-procedure step of ${pname}?in 450 words`,
    // `What is the purpose of ${pname}?in 450 words`,
    // `In what ways can ${pname} be used?in 450 words`,
  ];

  const onMoreDetails = (e) => {
    e.preventDefault();
    if (currentPromptIndex == prompts.length) {
      currentPromptIndex = 0;
    }
    const specificPrompt = prompts[currentPromptIndex];

    axios
      .post("http://localhost:8081/chat", { prompt: specificPrompt })
      .then((res) => {
        setPromptResponse([...promptResponse, res.data]);
        // if (currentPromptIndex==prompts.length){
        //   currentPromptIndex=0;
        // }
        setCurrentPromptIndex((prevIndex) => prevIndex + 1); // Move to the next question
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        {promptResponse.map((response, index) => (
          <div key={index}>{response}</div>
        ))}
      </div>
      <button
        className="action-btn"
        onClick={onMoreDetails}
        style={{
          backgroundColor: "#e7e7e7",
          color: "black",
        }}
      >
        <i className="fas fa-expand"></i> Know More Details..
      </button>
    </div>
  );
};

export default Chatbot;
