import { useState } from "react";
import { useAuthProvider } from "../../../../context";

export const useActions = () => {
  const { login } = useAuthProvider();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return {
    login,
    isVisible,
    toggleVisibility,
  };
};
