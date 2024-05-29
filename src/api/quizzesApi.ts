import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IQuiz } from "./quiz/quizEntity";
import { IResponse } from "@/types/responses";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (build) => ({
    getQuizzesByOwner: build.query<IQuiz[], string>({
      query: (owner) => `quiz?ownerId=${owner}`,
      transformResponse: (response: IResponse<IQuiz[]>) => response.items,
    }),
    getQuizById: build.query({
      query: (quizId) => `quiz/${quizId}`,
      transformResponse: (response: IResponse<IQuiz>) => response.items,
    }),
    createQuiz: build.mutation<IResponse, IQuiz>({
      query: (quiz) => ({
        url: "quiz",
        method: "POST",
        body: quiz,
      }),
    }),
  }),
});

export const {
  useGetQuizzesByOwnerQuery,
  useGetQuizByIdQuery,
  useCreateQuizMutation,
} = quizApi;
