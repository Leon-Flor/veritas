import { Button, Input } from "@nextui-org/react";
import { useActions } from "./useActions";
import {
  IconEye,
  IconEyeClosed,
  IconMail,
  IconUser,
} from "@tabler/icons-react";

export const SignIn = () => {
  const { login, isVisible, toggleVisibility } = useActions();

  return (
    <main className="flex flex-col h-screen w-screen items-center justify-center text-foreground gap-12">
      <header>
        <h1 className="text-black text-5xl text-center font-bold">
          Iniciar sesión
        </h1>
      </header>

      <form className="flex flex-col gap-8 justify-center items-center">
        <Input
          label="Nombre de usuario"
          placeholder="Alejo123"
          variant="bordered"
          size="lg"
          required
          startContent={
            <IconUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
        <Input
          type="email"
          label="Correo"
          variant="bordered"
          placeholder="you@example.com"
          size="lg"
          required
          startContent={
            <IconMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />

        <Input
          label="Password"
          variant="bordered"
          placeholder="Enter your password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <IconEyeClosed className="text-2xl text-default-400 pointer-events-none shrink-0" />
              ) : (
                <IconEye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
        />

        <Button
          className="text-xl text-white normal-case"
          onPress={login}
          variant="bordered"
          color="primary"
        >
          <h2 className="text-foreground">Iniciar sesión</h2>
        </Button>
      </form>
      <footer className="flex md:flex-row flex-col gap-4 items-center justify-center text-3xl">
        <h1 className="text-black">¿No tienes cuenta?</h1>
        <a className="underline text-[#0074D9]" href="/signUp">
          Registrarme
        </a>
      </footer>
    </main>
  );
};
