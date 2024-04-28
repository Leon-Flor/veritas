import { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { useTextToSpeech } from "../../utils/textToSpeechUtils";

export interface IQuestions {
  id: string;
  text: string;
  type: string;
  answers: {
    id: string;
    text: string;
    selected: boolean;
  }[];
}

const questions = [
  {
    id: uuidV4(),
    text: "Qué función cumple el banco de alimentos",
    type: "hash-q",
    answers: [
      {
        id: "akjs-234-assdsa",
        text: "Vender comida",
      },
      {
        id: "akjs-234-asda",
        text: "Resolver",
      },
      {
        id: "akjsds-234-asda",
        text: "Resolveasdfasdfdasr",
      },
    ],
  },
  {
    id: uuidV4(),
    text: "Qué papel realizan los operarios",
    type: "hash-q",
    answers: [
      {
        id: "akjs-234-assdsa",
        text: "Vender comida",
      },
      {
        id: "akjs-234-asda",
        text: "Resolver",
      },
    ],
  },
  {
    id: uuidV4(),
    text: "Organiza el flujo de trabajo",
    type: "hash-o",
    answers: [
      {
        id: "akjs-234-assdsa",
        text: "Vender comida",
      },
      {
        id: "akjs-234-asda",
        text: "Resolver",
      },
    ],
  },
];

// const questions: IQuestions[] = data.map((q) => {
//   return {
//     ...q,
//     answers: q.answers.map((answer) => {
//       return { ...answer, selected: false };
//     }),
//   };
// });

export const useActions = () => {
  const [question, setQuestion] = useState<number>(0);
  const [selected, setSelected] = useState<string>("");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const { speechText } = useTextToSpeech();

  console.log("question :", question, questions.length - 1);

  const nextQuestion = () => {
    if (question < questions.length - 1) {
      setQuestion(question + 1);
    }

    if (question === questions.length - 1) {
      // dispatch(setLoading({ isLoading: true, message: "Saving..." }));
      setIsConfirmationOpen(true);
    }
  };

  const prevQuestion = () => {
    if (question > 0) {
      setQuestion(question - 1);
    }
  };

  return {
    question,
    questions,
    selected,
    isConfirmationOpen,
    setIsConfirmationOpen,
    speechText,
    nextQuestion,
    prevQuestion,
    setSelected,
  };
};
