import { createContext, useState, ReactNode, useContext } from "react";

export interface IUser {
  name: string;
  email: string;
  avatar: string;
}

interface IAuthContextEntity {
  user?: IUser;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<undefined | IAuthContextEntity>(undefined);
interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const user: IUser = isAuthenticated
    ? {
        name: "Banco de alimentos",
        email: "bancodealimentos@gmail.com",
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWzrRCBf9_ajmJcYsqF9ZlR08QrntLhlv5WMsxIqz31A&s",
      }
    : undefined;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
export function useAuthProvider() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Auth provider");
  }
  return context;
}
