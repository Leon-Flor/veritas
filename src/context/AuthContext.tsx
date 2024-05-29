import { createContext, useState, ReactNode, useEffect } from "react";
import {
  signIn,
  signOut,
  signUp,
  confirmSignUp,
  fetchUserAttributes,
  fetchAuthSession,
} from "aws-amplify/auth";

import { useLog } from "@/utils/consoleUtils";

export interface IUser {
  userId?: string;
  name: string;
  email: string;
  picture: string;
}

export interface IAuthContextEntity {
  user?: IUser;
  isAuthenticated: boolean;
  handleSignUp: (
    name: string,
    email: string,
    picture: string,
    password: string
  ) => Promise<string>;
  handleLogin: (username: string, password: string) => Promise<string | Error>;
  handleLogout: () => void;
  handleConfirmSignUp: (name: string, OTP: string) => Promise<string | Error>;
}

export const AuthContext = createContext<undefined | IAuthContextEntity>(
  undefined
);
interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState<IUser>();

  // useEffect(() => {
  //   verifyAuth();
  // }, [isAuthenticated, user, setUser, setIsAuthenticated]);

  const verifyAuth = async () => {
    try {
      const { tokens } = await fetchAuthSession();

      if (tokens) {
        const attributes = await fetchUserAttributes();
        setUser({
          name: attributes?.name || "",
          email: attributes?.email || "",
          picture: attributes?.picture || "",
          userId: attributes?.sub || "",
        });

        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const handleSignUp = async (
    name: string,
    email: string,
    picture: string,
    password: string
  ) => {
    await signUp({
      username: name,
      password: password,
      options: {
        userAttributes: {
          email,
          name,
          picture,
        },
      },
    }).catch((error) => {
      return error;
    });

    return "";
  };

  const handleConfirmSignUp = async (
    username: string,
    code: string
  ): Promise<string | Error> => {
    await confirmSignUp({ username, confirmationCode: code }).catch((error) => {
      return error;
    });

    return "";
  };

  const handleLogin = async (
    username: string,
    password: string
  ): Promise<string | Error> => {
    try {
      const signInResponse = await signIn({ username, password });

      if (signInResponse.isSignedIn) {
        const userAttributes = await fetchUserAttributes();
        setUser({
          userId: userAttributes.userId,
          name: userAttributes.name,
          email: userAttributes.email,
          picture: userAttributes.picture,
        });
      }
    } catch (error) {
      return error;
    }

    return "";
  };

  const handleLogout = async () => {
    await signOut()
      .then(() => {
        setUser(undefined);
      })
      .catch((error) => {
        useLog.error("Logout Failed ❌ ❌ ", error);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        handleSignUp,
        handleLogin,
        handleLogout,
        handleConfirmSignUp,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
