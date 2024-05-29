import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthProvider } from "@/context";
import { useLog } from "@/utils/consoleUtils";

const schema = yup.object().shape({
  name: yup.string().required("Debes de ingresar un nombre").min(3).max(20),
  password: yup.string().required("Debes de ingresar una contraseña"),
});

export const useActions = () => {
  const { handleLogin } = useAuthProvider();
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");

  const { control, getValues, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { isValid, errors } = formState;

  const toggleVisibility = () => setIsVisible(!isVisible);

  const login = async () => {
    const { name, password } = getValues();

    useLog.info("Logging in...");

    try {
      await handleLogin(name, password)
        .then(() => {
          useLog.info("Logged in!");
        })
        .catch((error) => {
          setError("Error: ❌ " + error);
        });
    } catch (error) {
      setError("Error: ❌ " + error);
    }

    // if (error !== "") {
    //   setError("Error: ❌ " + error);
    // }
  };

  return {
    control,
    isValid,
    error,
    errors,
    isVisible,
    login,
    toggleVisibility,
  };
};
