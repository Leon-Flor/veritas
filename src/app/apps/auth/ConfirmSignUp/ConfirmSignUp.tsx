import { Button, Input } from "@nextui-org/react";
import { useActions } from "./useActions";
import { IconShieldLock } from "@tabler/icons-react";
import { Controller } from "react-hook-form";

export const ConfirmSignUp = () => {
  const { control, errors, isValid, confirmSignUp, error } = useActions();

  return (
    <main className="flex flex-col h-screen w-screen items-center justify-center text-foreground gap-12">
      <header>
        <h1 className="text-black text-5xl text-center font-bold">Registro</h1>
      </header>

      <form className="flex flex-col gap-8 justify-center items-center">
        <Controller
          name="OTP"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Código OTP"
              errorMessage={errors.OTP?.message}
              isInvalid={!!errors.OTP}
              variant="bordered"
              size="lg"
              required
              startContent={
                <IconShieldLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
          )}
        />

        {error && <p className="text-red-500">{error}</p>}

        <Button
          className="text-xl text-white normal-case"
          disabled={!isValid}
          onPress={confirmSignUp}
          variant="bordered"
          color={isValid ? "primary" : "default"}
        >
          <h2 className="text-foreground">Verificar</h2>
        </Button>
      </form>
    </main>
  );
};
