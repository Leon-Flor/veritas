import { IQuiz } from "@/api/quiz/quizEntity";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

interface IQuizFragment {
  question: IQuiz;
  onPress?: (quizId: string) => void;
}

export const QuizFragment = ({ question, onPress }: IQuizFragment) => {
  const { pk, title, description, questions } = question;
  return (
    <Card
      onPress={() => onPress?.(pk)}
      shadow="none"
      fullWidth
      radius="lg"
      isPressable
      className="p-4 group md:cursor-pointer md:hover:shadow-lg md:hover:shadow-primary/20 md:hover:scale-110 md:transition-all"
    >
      <CardHeader>
        <h1 className="poppins-semiBold text-3xl group-hover:text-primary">
          {title}
        </h1>
      </CardHeader>
      <CardBody className="flex flex-col">
        <p className="poppins-regular line-clamp-3">{description}</p>
      </CardBody>
      <CardFooter>
        <p className="poppins-medium">{questions.length} Preguntas</p>
      </CardFooter>
    </Card>
  );
};
