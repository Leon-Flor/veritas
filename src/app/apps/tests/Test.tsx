import {
  IconArrowLeft,
  IconArrowRight,
  IconTrophy,
  IconVolume,
  IconX,
} from "@tabler/icons-react";
import { Button, Progress } from "@nextui-org/react";
import { useActions } from "./useActions";
import { ParticipantModal, Selectable } from "./Fragments";
import { ModalConfirmation } from "@/components";
import { useParams } from "react-router-dom";

export const Test = () => {
  const { quizId } = useParams();
  const {
    question,
    questions,
    selected,
    isConfirmationOpen,
    isParticipantModalOpen,
    nameInput,
    isAnswered,
    manRef,
    name,
    score,
    setIsConfirmationOpen,
    handleGoQuizzes,
    speechText,
    nextQuestion,
    prevQuestion,
    setSelected,
    onTextChange,
    handleStart,
    handleConfirm,
  } = useActions(quizId);

  if (questions.length === 0) {
    return (
      <div className="flex flex-col md:px-20 px-4 justify-center items-center gap-8 w-screen h-screen relative">
        <h1 className="text-5xl tracking-tight font-extrabold text-black">
          Cargando...
        </h1>
      </div>
    );
  }

  if (isAnswered) {
    return (
      <div className="flex flex-col md:px-20 px-4 justify-center items-center gap-8 w-screen h-screen relative">
        {score === questions.length ? (
          <IconTrophy size={200} className="text-green-500" />
        ) : (
          <IconX size={200} className="text-red-500" />
        )}

        <h1 className="text-5xl tracking-tight font-extrabold text-black">
          {name}
        </h1>

        <h1 className="text-5xl tracking-tight font-extrabold text-black">
          Puntuación: {score + " / " + questions.length}
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:px-20 px-4 py-8 gap-8 w-screen h-screen relative">
      <ParticipantModal
        value={nameInput}
        onTextChange={onTextChange}
        isOpen={isParticipantModalOpen}
        handleStart={handleStart}
      />
      <ModalConfirmation
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleConfirm}
      />
      <header className="flex flex-col gap-4" ref={manRef}>
        <div className="flex w-full justify-between items-center rounded-lg gap-8">
          <Button isIconOnly onPress={handleGoQuizzes}>
            <IconArrowLeft
              size={24}
              className="text-gray-700 hover:text-sky-500"
            />
          </Button>
          <Progress
            size="lg"
            aria-label="Progress"
            radius="full"
            classNames={{
              indicator: "bg-red-500",
            }}
            value={question + 1}
            maxValue={questions.length}
          />
          <div className="flex gap-2 font-bold text-lg">
            <span>{question + 1}</span>
            <span>/</span>
            <span>{questions.length}</span>
          </div>
        </div>

        <div
          className="w-full flex bg-red-600 md:p-8 p-4 rounded-lg justify-center items-center gap-8  text-white cursor-pointer"
          onClick={() => speechText("¿" + questions[question].question + "?")}
        >
          <h2 className="text-3xl font-bold text-center truncate">
            {questions[question].question}
          </h2>
          <IconVolume size={40} />
        </div>
        <div className="flex items-center w-full md:justify-end gap-8 justify-between">
          {question > 0 && (
            <Button
              size="lg"
              radius="full"
              className="text-gray-600 hover:border-gray-600"
              onClick={prevQuestion}
              startContent={<IconArrowLeft />}
            >
              Anterior
            </Button>
          )}

          <Button
            isLoading={question === questions.length}
            size="lg"
            radius="full"
            disabled={selected === ""}
            color={selected === "" ? "default" : "primary"}
            className={
              selected === ""
                ? "text-gray-600 hover:border-gray-600"
                : "text-white"
            }
            onClick={nextQuestion}
            endContent={<IconArrowRight />}
          >
            {question !== questions.length - 1 ? "Siguiente" : "Finalizar"}
          </Button>
        </div>
      </header>

      {questions && questions[question] && (
        <main className="w-full rounded-xl overflow-y-scroll relative">
          <ol className="gap-4 md:grid md:grid-cols-4 flex flex-col relative">
            {questions[question].answers.map(({ id, text }) => (
              <Selectable
                label={text}
                selected={selected === id}
                key={id}
                onClick={() => setSelected(id)}
              />
            ))}
          </ol>
        </main>
      )}
    </div>
  );
};
