import React, { useState } from 'react';
import { Box } from '@mui/material';
import './App.css';
import MessageList from './MessageList';
import InputField from './InputField';

function App() {
  const [messages, setMessages] = useState([]);

  const handleSend = async (text) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text, sender: 'user' },
    ]);

    // そのまま返す
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: text, sender: 'assistant' },
    ]);
    // そのまま返す終わり
  };

  return (
    <Box className="App">
      <MessageList messages={messages} />
      <InputField onSend={handleSend} />
    </Box>
  );
}

export default App;