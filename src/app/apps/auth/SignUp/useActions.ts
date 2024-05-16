import { useAuthProvider } from "@/context";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required("Debes de ingresar un nombre").min(3).max(20),
  email: yup
    .string()
    .required("Debes de ingresar un email")
    .email("Email inválido"),
  password: yup.string().required("Debes de ingresar una contraseña"),
});

export const useActions = () => {
  const navigate = useNavigate();

  const { handleSignUp } = useAuthProvider();

  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");

  const { control, getValues, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { isValid, errors } = formState;

  const signUp = async () => {
    const { name, email, password } = getValues();
    const error = await handleSignUp(name, email, "", password);
    if (error === "") {
      navigate(`/confirmSignUp/${name}`);
    } else {
      setError("Error: ❌ " + error);
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return {
    control,
    isValid,
    errors,
    error,
    isVisible,
    signUp,
    toggleVisibility,
  };
};
