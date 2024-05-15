import { useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { useTextToSpeech } from "../../../utils/textToSpeechUtils";
import { useNavigate } from "react-router-dom";
import { useEncrypterHash } from "@/utils/encrypterHash";
import { useLog } from "@/utils/consoleUtils";
import { useAppDispatch, useAppSelector } from "@/hooks";
import confetti from "canvas-confetti";
import {
  newParticipant,
  selectParticipant,
  setScore,
} from "@/features/quizSlice";

export interface IQuiz {
  sk: string;
  title: string;
  description: string;
  questions: IQuestions[];
}

export interface IQuestions {
  sk: string;
  text: string;
  type: string;
  correctAnswer: string;
  answers: {
    sk: string;
    text: string;
  }[];
}

export const quizzes: IQuiz[] = Array.from({ length: 80 }, (_, i) => ({
  sk: uuidV4(),
  title: `Quiz ${i + 1}`,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  questions: Array.from({ length: Math.random() * 10 }, (_, j) => ({
    sk: uuidV4(),
    text: `Pregunta ${j + 1}`,
    type: "hash-q",
    correctAnswer: `Answer ${j + 1}`,
    answers: Array.from({ length: 5 }, (_, j) => ({
      sk: uuidV4(),
      text: `Answer ${j + 1}`,
    })),
  })),
}));

export const useActions = (quizId: string) => {
  const dispatch = useAppDispatch();
  const { id, name, score } = useAppSelector(selectParticipant);

  const [nameInput, setNameInput] = useState<string>("");
  const [question, setQuestion] = useState<number>(0);
  const [selected, setSelected] = useState<string>("");
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [isParticipantModalOpen, setIsParticipantModalOpen] =
    useState<boolean>(true);

  const { speechText } = useTextToSpeech();
  const navigate = useNavigate();
  const { decryptedHash } = useEncrypterHash();

  const handleStart = async () => {
    await dispatch(newParticipant({ id: 1, name, score: 0 }));
    onClose();
  };

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(event.target.value);
  };
  const onClose = () => {
    setIsParticipantModalOpen(false);
  };

  const questions =
    quizzes.find((quiz) => quiz.sk === quizId)?.questions ||
    quizzes[2].questions;

  useLog.info(
    "Encrypted Hash 2 :",
    quizId,
    "decryptedHash: ",
    decryptedHash(quizId)
  );

  const handleGoQuizzes = () => navigate("/");

  const nextQuestion = async () => {
    if (question < questions.length - 1) {
      // if (questions[question].correctAnswer === selected) {
      dispatch(setScore(score + 1));
      // }
      setQuestion(question + 1);
      setSelected("");
    }

    if (question === questions.length - 1) {
      setIsConfirmationOpen(true);
    }
  };

  const prevQuestion = () => {
    if (question > 0) {
      setQuestion(question - 1);
    }
  };

  const manRef = useRef<HTMLDivElement>(null);

  const handleConfetti = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const handleConfirm = () => {
    setIsConfirmationOpen(false);
    setIsAnswered(true);

    if (score === questions.length - 1) {
      handleConfetti();
    }
  };

  return {
    question,
    name,
    score,
    questions,
    selected,
    nameInput,
    isConfirmationOpen,
    isParticipantModalOpen,
    isAnswered,
    manRef,
    handleConfirm,
    onTextChange,
    handleStart,
    setIsConfirmationOpen,
    handleGoQuizzes,
    speechText,
    nextQuestion,
    prevQuestion,
    setSelected,
    onClose,
    setIsAnswered,
  };
};
