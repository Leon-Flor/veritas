import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { useCreateQuizMutation } from "@/api/quizzesApi";
import { useLog } from "@/utils/consoleUtils";

const schema = yup.object().shape({
  title: yup.string().required("Debes de ingresar un titulo").max(20),
  description: yup
    .string()
    .required("Debes de ingresar una contraseña")
    .max(200),
  questions: yup
    .array(
      yup
        .object()
        .shape({
          question: yup
            .string()
            .required("Debes de agregar la pregunta")
            .max(20),
          answer: yup
            .string()
            .required("Debes de seleccionar la respuesta correcta"),
          answers: yup.array(
            yup.object().shape({
              id: yup.string().required("Debes de agregar preguntas"),
              text: yup.string().required("Debes de agregar preguntas"),
              img: yup.mixed().required("Debes de agregar preguntas"),
            })
          ),
          type: yup.string().required("Debes de agregar preguntas"),
        })
        .required("Debes de agregar preguntas")
    )
    .required("Debes de agregar preguntas")
    .min(1)
    .max(20),
});

export const useActions = () => {
  const [error, setError] = useState("");
  const [isOpenQuestion, setIsOpenQuestion] = useState(false);
  const [isOpenAnswer, setIsOpenAnswer] = useState(false);
  const [idx, setIdx] = useState(0);

  // const [triggerCreateQuiz] = useCreateQuizMutation();

  const { control, getValues, formState, setValue, watch } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      questions: [],
    },
    resolver: yupResolver(schema),
  });

  const { questions } = watch();
  useLog.debug("questions", questions);

  const handleAddQuestion = (question: string) => {
    useLog.debug("handleAddQuestion", question);
    setValue("questions", [
      ...getValues().questions,
      {
        question,
        answer: "",
        answers: [],
        type: "",
      },
    ]);

    setIsOpenQuestion(false);
  };

  const handleAddAnswer = (answer: string, img: unknown, id?: string) => {
    useLog.debug("handleAddAnswer", answer, img, id);
    setValue(`questions.${idx}.answers`, [
      ...getValues().questions[idx].answers,
      {
        id,
        text: answer,
        img: img,
      },
    ]);

    setIsOpenAnswer(false);
    setIdx(idx + 1);
  };

  const handleCreateQuiz = async () => {
    const { title, description, questions } = getValues();

    useLog.debug("handleCreateQuiz", title, description, questions);

    // await triggerCreateQuiz({
    //   title: "test",
    //   description: "test",
    //   questions: [
    //     {
    //       question: "test",
    //       answer: "test",
    //       answers: [
    //         {
    //           id: "test",
    //           text: "test",
    //           img: "test",
    //         },
    //       ],
    //       type: "test",
    //     },
    //   ],
    //   ownerId: "testingUserId",
    // })
    //   .unwrap()
    //   .then((response) => {
    //     if (response.error && response.message) {
    //       setError(response.message);
    //     }
    //     setError("");
    //   })
    //   .catch((error) => {
    //     setError(error.data.message);
    //   });
    // if (error) setError(error);
  };

  const { isValid, errors } = formState;

  return {
    control,
    isValid,
    error,
    errors,
    isOpenQuestion,
    isOpenAnswer,
    idx,
    questions,
    handleCreateQuiz,
    handleAddQuestion,
    handleAddAnswer,
    setIsOpenQuestion,
    setIsOpenAnswer,
    setIdx,
  };
};
