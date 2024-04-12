import axios from 'axios';

const speakWithOpenAI = async (text) => {
  try {
    console.log('Request:', text)
    // OpenAI APIを使用してテキストから音声を生成
    const response = await axios.post(
      'https://1kwyzzn1dk.execute-api.ap-northeast-1.amazonaws.com/default/ttsOpenAI',
      {text},
      {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer'  // レスポンスをArrayBufferとして受け取る
      },
    );
    console.log('Response:', response);

    const audioData = response.data;
    console.log('Audio data:', audioData)

    // Audioオブジェクトを作成
    const audio = new Audio();

    // オーディオデータをBlobに変換してソースに設定
    const audioBlob = new Blob([audioData], {type: 'audio/mpeg'});
    console.log('Audio blob:', audioBlob);
    const audioUrl = URL.createObjectURL(audioBlob);
    console.log('Audio URL:', audioUrl);
    audio.src = audioUrl;

    // 音声再生
    await audio.play();

    // 再生が終わるまで待機
    await new Promise((resolve) => {
      audio.onended = resolve;
    });

    console.log('TTS playback completed.');
  } catch (error) {
    console.error('Error:', error);
    console.error("Sorry, I couldn't generate the TTS output.");
  }
};

export default speakWithOpenAI;