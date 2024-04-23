import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
const ai = new OpenAIApi(new Configuration({ apiKey }));

const TextGeneratorAI = () => {
  const [generatedText, setGeneratedText] = useState('');

  const generateText = async () => {
    try {
      const response = await ai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Hello, write a script for a video about neural networks.' }]
      });
      const content = response.data.choices[0].message.content;
      setGeneratedText(content);
    } catch (error) {
      console.error('Error generating text:', error);
    }
  };

  return (
    <div>
      <button onClick={generateText}>Generate Text</button>
      <p>{generatedText}</p>
    </div>
  );
};

export default TextGeneratorAI;
