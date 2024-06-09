import React, {useState} from "react";
import {Box, Button, TextField} from "@mui/material";

export default function InputField({ onSend }) { // （1）
  const [text, setText] = useState(''); // （2）

  const handleChange = (event) => { // （3）
    setText(event.target.value);
  };

  const handleSendClick = () => { // （4）
    if (text.trim() !== '') {
      onSend(text);
      setText('');
    }
  };

  return ( // （5）
    <Box className="input-container">
      <TextField
        className="input-field"
        placeholder="メッセージを入力..."
        value={text}
        onChange={handleChange}
      />
      <Button
        className="send-button"
        variant="contained"
        onClick={handleSendClick}
      >
        送信
      </Button>
    </Box>
  );
}