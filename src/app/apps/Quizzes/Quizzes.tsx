import { Layout } from "@/app/layouts";
import { OptionModal, QuizFragment } from "./Fragments";
import { Button, Input } from "@nextui-org/react";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useActions } from "./useActions";

export const Quizzes = () => {
  const {
    quizzes,
    modal,
    handleStartQuiz,
    handleCreateQuiz,
    handleClose,
    handleOpen,
  } = useActions();

  const isPhone = window.innerWidth < 768;

  return (
    <Layout navBar className="flex flex-col md:p-20 p-8 gap-16">
      <OptionModal
        onStart={handleStartQuiz}
        onEdit={() => console.log("edit")}
        isOpen={modal.isOpen}
        onClose={handleClose}
        quizId={modal.sk}
      />
      <div className="flex md:flex-row flex-col justify-between items-center gap-4">
        <Input
          fullWidth={isPhone}
          size="lg"
          variant="faded"
          placeholder="Busca tus questionarios..."
          color="primary"
          isClearable
          onClear={() => console.log("clear")}
          startContent={<IconSearch size={32} />}
        />
        <Button
          size="lg"
          onPress={handleCreateQuiz}
          color="primary"
          variant="bordered"
          className="text-3xl w-full md:w-auto hover:shadow-lg hover:shadow-primary/20 hover:scale-110 transition-all"
          endContent={<IconPlus size={32} stroke={2} />}
        >
          Crear
        </Button>
      </div>
      <div className="gap-8 grid grid-cols-1 sm:grid-cols-5 w-full h-full">
        {quizzes &&
          quizzes.map((ques) => (
            <QuizFragment onPress={handleOpen} question={ques} key={ques.pk} />
          ))}
      </div>
    </Layout>
  );
};
