import React, { useState } from 'react';
import { Box } from '@mui/material';
import './App.css';
import MessageList from './MessageList';
import InputField from './InputField';
import fetchChatGPTResponse from './fetchChatGPTResponse';
import speakWithOpenAI from './speakWithOpenAI';

function App() {
  const [messages, setMessages] = useState([]);

  const handleSend = async (text) => {
    // メッセージを追加する
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: text, role: 'user' },
    ]);

    // // そのまま返す
    // const response = text

    // ChatGPTを使って返す
    const response = await fetchChatGPTResponse(messages, text);

    // メッセージを追加する
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: response, role: 'assistant' },
    ]);

    // // TTSで音声出力する
    // await speakWithOpenAI(response);
  };

  return (
    <Box className="App">
      <MessageList messages={messages} />
      <InputField onSend={handleSend} />
    </Box>
  );
}

export default App;