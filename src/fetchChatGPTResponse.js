import axios from 'axios';

const fetchChatGPTResponse = async (messages, text) => {
  try {
    // OpenAI APIを使用してテキストから音声を生成
    const updatedMessages = [...messages, {role: 'user', content: text}];
    const response = await axios.post(
      'https://stzql4zy3i.execute-api.ap-northeast-1.amazonaws.com/default/schoolCounselor',
      {
        messages: updatedMessages,
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