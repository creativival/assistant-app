import OpenAI from 'openai';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const speakWithOpenAI = async (text) => {
  try {
    // OpenAI APIの設定
    const openai = new OpenAI({ apiKey,
      dangerouslyAllowBrowser: true });
    const response = await openai.audio.speech.create({
      model: "tts-1",
      voice: "nova",
      input: text,
    });

    // レスポンスからオーディオデータを取得
    const audioData = await response.arrayBuffer();

    // Audioオブジェクトを作成
    const audio = new Audio();

    // オーディオデータをBlobに変換してソースに設定
    const audioBlob = new Blob([audioData], {type: 'audio/mpeg'});
    const audioUrl = URL.createObjectURL(audioBlob);
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