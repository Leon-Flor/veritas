export interface IQuiz {
  pk?: string;
  title: string;
  description: string;
  questions?: IQuestions[];
  ownerId?: string;
}

export interface IQuestions {
  question: string;
  answer: string;
  type: string;
  answers: IAnswers[];
}

export interface IAnswers {
  id?: string;
  text?: string;
  img?: string | unknown;
}
