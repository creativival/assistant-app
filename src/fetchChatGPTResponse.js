import axios from 'axios';

const fetchChatGPTResponse = async (messages, text) => {
  console.log('Request:', messages)
  messages.push({ role: 'user', content: text });
  console.log('Request:', messages)

  try {
    // OpenAI APIを使用してテキストから音声を生成
    const response = await axios.post(
      'https://stzql4zy3i.execute-api.ap-northeast-1.amazonaws.com/default/schoolCounselor',
      {
        messages: messages,
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
      }
    );
    console.log('Response:', response);

    const assistantMessage = response.data.message;

    // 返答を返却する
    return assistantMessage;
  } catch (error) {
    console.error('Error:', error);
    // エラーメッセージを返却する
    return "エラーが発生しました"
  }
};

export default fetchChatGPTResponse;