import React, { useState } from 'react';
import { Box } from '@mui/material';
import './App.css';
import MessageList from './MessageList';
import InputField from './InputField';
import fetchChatGPTResponse from './fetchChatGPTResponse';
import speakWithOpenAI from './speakWithOpenAI';

const SYSTEM_CONTENT = `
    あなたはスクールカウンセラーです。
    生徒からの相談を受けています。
    生徒の話を受容と共感を持って聞くことが大切です。
    生徒との会話は一方通行ではなく、生徒の話に対して適切な質問を投げかけることで、
    生徒が自分の問題に気づくように導いてください。
    会話は概ね5ターン以内で終了するように、まとめて下さい。
    また、生徒の話が「ありがとう」や「さようなら」で終わった時は、
    生徒が納得したか確認して、生徒がこの話題を終了するように促してください。
    あなたの回答は100文字以内にしてください。
`.trim();

function App() {
  const [messages, setMessages] = useState([]);

  const handleSend = async (text) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text, sender: 'user' },
    ]);

    // // // そのまま返す
    // const response = text

    // ChatGPTを使って返す
    const response = await fetchChatGPTResponse(messages, SYSTEM_CONTENT, text);

    // メッセージを追加する
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: response, sender: 'assistant' },
    ]);

    // TTSで音声出力する
    await speakWithOpenAI(response);
  };

  return (
    <Box className="App">
      <MessageList messages={messages} />
      <InputField onSend={handleSend} />
    </Box>
  );
}

export default App;