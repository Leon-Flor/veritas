import {
  IconArrowRight,
  IconArrowLeft,
  IconDeviceSpeaker,
  IconTrophy,
} from "@tabler/icons-react";

import { Button, Progress } from "@nextui-org/react";
import { useActions } from "./useActions";
import { Selectable } from "./Fragments";
import { ModalConfirmation } from "../../components";
export const Test = () => {
  const {
    question,
    questions,
    selected,
    isConfirmationOpen,
    setIsConfirmationOpen,
    speechText,
    nextQuestion,
    prevQuestion,
    setSelected,
  } = useActions();

  return (
    <div className="flex flex-col p-8 gap-8 w-screen h-screen relative">
      <ModalConfirmation
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={() => setIsConfirmationOpen(false)}
      />
      <div className="flex w-full justify-center items-center gap-4 bg-red">
        <IconArrowLeft size={40} className=" hover:text-sky-500" />
        <Progress
          size="md"
          aria-label="Progress"
          radius="full"
          classNames={{
            indicator: "bg-red-500",
            track: "border-gray-500 border-1",
          }}
          value={question + 1}
          maxValue={questions.length}
        />
        <div className="flex gap-2 font-bold text-3xl">
          <h2>{question + 1}</h2>
          <h2>/</h2>
          <h2>{questions.length}</h2>
        </div>
      </div>

      <main className="flex flex-col h-full gap-20 items-center">
        <h2 className="text-black text-3xl font-bold text-center">
          {"¿" + questions[question].text + "?"}
        </h2>
        {questions && questions[question] && (
          <div className="w-1/2">
            <ol className="flex gap-8">
              {questions[question].answers.map(({ id, text }) => (
                <Selectable
                  label={text}
                  selected={selected === id}
                  key={id}
                  onClick={() => setSelected(id)}
                />
              ))}
            </ol>
          </div>
        )}
      </main>

      <footer className="w-full flex items-center justify-between">
        <IconDeviceSpeaker
          size={40}
          className="hover:text-sky-500 cursor-pointer"
          onClick={() => speechText("¿" + questions[question].text + "?")}
        />
        <div className="flex gap-4 items-center">
          {question > 0 && (
            <Button
              size="lg"
              variant="bordered"
              className="text-gray-600 hover:border-gray-600"
              onClick={prevQuestion}
              startContent={<IconArrowLeft />}
            >
              Anterior
            </Button>
          )}
          <Button
            isLoading={question === questions.length}
            variant="bordered"
            size="lg"
            color="primary"
            onClick={nextQuestion}
            endContent={
              question === questions.length - 1 ? (
                <IconTrophy />
              ) : (
                <IconArrowRight />
              )
            }
          >
            {question === questions.length - 1 || question === questions.length
              ? "Finalizar"
              : "Siguiente"}
          </Button>
        </div>
      </footer>
    </div>
  );
};
