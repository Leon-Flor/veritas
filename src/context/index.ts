import { useContext } from "react";
import { AuthContext, IAuthContextEntity } from "./AuthContext";

export function useAuthProvider(): IAuthContextEntity {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Auth provider");
  }
  return context;
}

export { AuthProvider } from "./AuthContext";
