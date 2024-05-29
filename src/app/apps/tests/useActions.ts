import { useEffect, useRef, useState } from "react";
import { useTextToSpeech } from "../../../utils/textToSpeechUtils";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import confetti from "canvas-confetti";
import {
  newParticipant,
  selectParticipant,
  setScore,
  setAnswersFailed,
  resetParticipant,
} from "@/features/quizSlice";
import { useGetQuizByIdQuery } from "@/api/quizzesApi";

export const useActions = (quizId: string) => {
  const dispatch = useAppDispatch();
  const { speechText } = useTextToSpeech();
  const navigate = useNavigate();
  const { name, score } = useAppSelector(selectParticipant);

  const { data } = useGetQuizByIdQuery(quizId);
  const questions = data?.questions || [];

  const [nameInput, setNameInput] = useState<string>("");
  const [question, setQuestion] = useState<number>(0);
  const [selected, setSelected] = useState<string>("");
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [isParticipantModalOpen, setIsParticipantModalOpen] =
    useState<boolean>(true);

  useEffect(() => {
    dispatch(resetParticipant());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleGoQuizzes = () => navigate("/");

  const nextQuestion = async () => {
    if (questions[question].answer === selected) {
      dispatch(setScore(score + 1));
    } else {
      dispatch(setAnswersFailed(selected));
    }

    if (questions && question >= 0 && question < questions.length - 1) {
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

    if (score === questions.length) {
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
