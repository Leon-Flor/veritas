import { useAuthProvider } from "@/context";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const schema = yup.object().shape({
  OTP: yup.string().required("Debes de ingresar un OTP").min(4).max(6),
});

export const useActions = () => {
  const navigate = useNavigate();
  const { userName } = useParams();
  const { handleConfirmSignUp } = useAuthProvider();
  const [error, setError] = useState("");

  const { control, getValues, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      OTP: "",
    },
    resolver: yupResolver(schema),
  });

  const { isValid, errors } = formState;

  const confirmSignUp = async () => {
    const { OTP } = getValues();
    const error = await handleConfirmSignUp(userName, OTP);
    if (error === "") {
      navigate("/");
    } else {
      setError("Error: ❌ " + error);
    }
  };

  return {
    error,
    control,
    isValid,
    errors,
    confirmSignUp,
  };
};
