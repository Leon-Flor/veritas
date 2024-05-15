import { useEncrypterHash } from "@/utils/encrypterHash";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useActions = () => {
  const navigate = useNavigate();

  const [modal, setModal] = useState({
    isOpen: false,
    sk: "",
  });

  const { encryptedHash } = useEncrypterHash();

  const handleClose = () => setModal({ isOpen: false, sk: "" });

  const handleOpen = (quizId: string) => {
    setModal({ isOpen: true, sk: encryptedHash(quizId) });
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
    modal,
    handleClose,
    handleOpen,
    handleStartQuiz,
  };
};
