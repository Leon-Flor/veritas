import { Button, Input } from "@nextui-org/react";
import { useActions } from "./useActions";
import { Controller } from "react-hook-form";
import { CreateQuestionFragment } from "./CreateQuestionFragment";
import { useState } from "react";
import {
  IconChevronDown,
  IconChevronUp,
  IconMoodConfuzed,
  IconPlus,
} from "@tabler/icons-react";
import { CreateAnswerFragment } from "./CreateAnswerFragment";
import { Selectable } from "../../tests/Fragments";

const RenderQuestion = ({
  question,
  answers,
  onAddPress,
}: {
  question: string;
  answers;
  onAddPress: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <div className="border-default-400 border rounded-lg p-2 w-full max-h-[60vh] min-h-20 overflow-auto">
      <div
        className="flex w-full items-center gap-2 p-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {open ? <IconChevronUp size={20} /> : <IconChevronDown size={20} />}
        <p>{question}</p>
      </div>
      {open && (
        <div className="flex flex-col rounded-lg p-4 gap-2 h-full">
          <div
            className={
              answers.length === 0 &&
              "flex flex-col justify-center items-center gap-4 w-full h-full overflow-hidden"
            }
          >
            {answers.length === 0 && (
              <div className="flex items-center gap-2">
                <IconMoodConfuzed size={40} />
                <p>¿Faltan respuestas?</p>
              </div>
            )}
            <Button
              onPress={onAddPress}
              color="secondary"
              fullWidth
              endContent={<IconPlus />}
            >
              Añadir Respuesta
            </Button>
          </div>
          <div className="w-full grid grid-cols-2 gap-4">
            {answers.map((item, index) => (
              <Selectable
                key={index}
                selected={selected === item.id}
                onClick={() => setSelected(item.id)}
                label={item.text}
                className="w-full h-40 rounded-lg"
                img={URL.createObjectURL(item.img as Blob)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const CreateQuiz = () => {
  const {
    control,
    errors,
    isOpenQuestion,
    isOpenAnswer,
    questions,
    handleCreateQuiz,
    handleAddQuestion,
    handleAddAnswer,
    setIsOpenQuestion,
    setIsOpenAnswer,
    setIdx,
  } = useActions();

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <CreateQuestionFragment
        isOpen={isOpenQuestion}
        onSubmit={handleAddQuestion}
        onClose={() => setIsOpenQuestion(false)}
      />
      <CreateAnswerFragment
        isOpen={isOpenAnswer}
        onClose={() => setIsOpenAnswer(false)}
        onSubmit={(answer, img, id) => handleAddAnswer(answer, img, id)}
      />
      <header className="flex flex-col p-4 w-full items-center justify-between border-b-default-400 border-b bg-default-200">
        <div className="flex w-full justify-between">
          <Button color="danger">Cancelar</Button>
          <Button
            variant="solid"
            radius="full"
            color="secondary"
            onPress={handleCreateQuiz}
          >
            Crear Quiz
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Título"
                errorMessage={errors.title?.message}
                isInvalid={!!errors.title}
                variant="bordered"
                size="lg"
                required
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Descripción"
                errorMessage={errors.description?.message}
                isInvalid={!!errors.description}
                variant="bordered"
                size="lg"
                required
              />
            )}
          />
        </div>
      </header>

      <main className="flex flex-col gap-4 p-16 w-full h-full kmd:w-2/3">
        <Button
          aria-label="Añadir Pregunta"
          disabled
          className="bg-default-400 self-end"
          onPress={() => setIsOpenQuestion(true)}
        >
          Añadir pregunta
        </Button>

        <div className="grid grid-cols-3 gap-4">
          {questions &&
            questions.length > 0 &&
            questions.map((item, index) => (
              <RenderQuestion
                key={index}
                question={item.question}
                answers={item.answers}
                onAddPress={() => {
                  setIdx(index);
                  setIsOpenAnswer(true);
                }}
              />
            ))}
        </div>
      </main>
    </div>
  );
};
