// import React, { useEffect, useState } from 'react';
// import { Configuration, OpenAIApi } from 'openai';

// // Import apiKey from a valid file
// //import apiKey from 'utils/ai/apiKey.jsx';
// const apiKey = 'sk-proj-G6lP7OIpce667SotjVlxT3BlbkFJUd9VaCSh8S1rdNOwycPz'; 

// const ai = new OpenAIApi(new Configuration({ apiKey }));

// const topics = [
//   'Everyday Life', 
//   'Work', 
//   'Ralationships', 
//   'Technology', 
//   'Food', 
//   'Travel', 
//   'Animals',
//   'Sports',
//   'School',
//   'Health',
//   'Fashion',
//   'Money',
//   'Hobbies',
//   'Pop Culture',
//   'Self-Deprecating Humor'
// ];

// const topicsString = topics.join(', ');

// function TextGeneratorAI({ memeTitle, memeDescription, box_count }) {
//   const [generatedText, setGeneratedText] = useState('');

//   const description = memeDescription ? `(${memeTitle} description: ${memeDescription})` : "";

//   const generateText = async () => {
//     try {
//       const response = await ai.createChatCompletion({
//         model: 'gpt-3.5-turbo',
//         messages: [{
//           role: 'user',
//           content: `Hello, write a joke for each topic for the meme "${memeTitle}".
//             ${description} 
//             topics: ${topicsString}.
//             count of lines: ${box_count}` }]
//       });
//       const content = response.data.choices[0].message.content;
//       setGeneratedText(content);
//     } catch (error) {
//       console.error('Error generating text:', error);
//     }
//   };

//   useEffect(() => {
//     generateText();
//   }, [memeTitle, memeDescription, box_count]);

//   return (
//     <div>
//       <button onClick={generateText}>Generate Text</button>
//       <p>{generatedText}</p>
//     </div>
//   );
// }

// export default TextGeneratorAI;
