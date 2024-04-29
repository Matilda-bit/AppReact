import React, { useEffect, useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

import apiKey from '../utils/ai/apiKey';
const ai = new OpenAIApi(new Configuration({ apiKey }));

const topics = [
              'Everyday Life', 
              'Work', 
              'Ralationships', 
              'Technology', 
              'Food', 
              'Travel', 
              'Animals',
              'Sports',
              'School',
              'Health',
              'Fashion'
             ]
//babel
function TextGeneratorAI() {
  const [generatedText, setGeneratedText] = useState('');

  useEffect(() => {
    async function generateText () {

    }
  }, [])

  // const generateText = async () => {
  //   try {

      function generateText() {
      //const response = await ai.createChatCompletion({
      const response = () => { ai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Hello, write a script for a video about neural networks.' }]
      })};
      const content = response.data.choices[0].message.content;
      setGeneratedText(content);
    // } catch (error) {
    //   console.error('Error generating text:', error);
    // }
  };

  return (
    <div>
      <button onClick={generateText}>Generate Text</button>
      <p>{generatedText}</p>
    </div>
  );
};

export default TextGeneratorAI;
