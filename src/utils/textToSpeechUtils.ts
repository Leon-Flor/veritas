import { useLog } from "./consoleUtils";

export const useTextToSpeech = () => {
  const synth = window.speechSynthesis;

  const speechText = (text: string) => {
    const utter: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(text);
    useLog.info(synth.getVoices());

    utter.voice = synth.getVoices()[1018];

    // synth.speak(utter);
    // utter.voice = synth.getVoices()[2];
    synth.speak(utter);
  };

  return {
    speechText,
  };
};
