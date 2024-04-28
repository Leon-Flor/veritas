export const useTextToSpeech = () => {
  const synth = window.speechSynthesis;

  const speechText = (text: string) => {
    const utter: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(text);
    // utter.voice = synth.getVoices()[0];
    // synth.speak(utter);
    // utter.voice = synth.getVoices()[2];
    synth.speak(utter);
  };

  return {
    speechText,
  };
};
