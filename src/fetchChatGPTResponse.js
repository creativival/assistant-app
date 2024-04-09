import OpenAI from 'openai';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const fetchChatGPTResponse = async (messages, SYSTEM_CONTENT, text) => {
  try {
    const messageData = [
      {role: 'system', content: SYSTEM_CONTENT}
    ];

    messages.forEach((message) => {
      messageData.push({role: message.sender, content: message.text});
    });

    messageData.push({role: 'user', content: text});

    // OpenAI APIの設定
    const openai = new OpenAI({ apiKey,
      dangerouslyAllowBrowser: true });
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messageData
    });

    // 返答を返却する
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error:', error);
    // エラーメッセージを返却する
    return "エラーが発生しました"
  }
};

export default fetchChatGPTResponse;