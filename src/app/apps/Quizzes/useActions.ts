import { useGetQuizzesByOwnerQuery } from "@/api/quizzesApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useActions = () => {
  const navigate = useNavigate();
  const { data: quizzes = [] } = useGetQuizzesByOwnerQuery("testingUserId");

  const [modal, setModal] = useState({
    isOpen: false,
    sk: "",
  });

  const handleClose = () => setModal({ isOpen: false, sk: "" });

  const handleOpen = (quizId: string) => {
    setModal({ isOpen: true, sk: quizId.split("#")[1] });
  };

  const handleCreateQuiz = () => {
    navigate("/createQuiz");
  };

  const handleStartQuiz = () => {
    navigate(`/quiz/${modal.sk}`);
  };

  // const rowsPerPage = 10;

  // const pages = useMemo(() => {
  //   return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
  // }, [data?.count, rowsPerPage]);

  // const loadingState =
  // isLoading || data?.results.length === 0 ? "loading" : "idle";

  return {
    quizzes,
    modal,
    handleClose,
    handleOpen,
    handleCreateQuiz,
    handleStartQuiz,
  };
};
