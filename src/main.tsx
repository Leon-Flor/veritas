import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";

import "./index.css";
import App from "@/App";
import { AuthProvider } from "./context";
import { store } from "@/hooks/store";
import { Authenticator } from "@aws-amplify/ui-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator>
      {({ signOut, user }) => (
        <AuthProvider>
          <Provider store={store}>
            <NextUIProvider>
              <main className="light text-foreground bg-background">
                <App />
              </main>
            </NextUIProvider>
          </Provider>
        </AuthProvider>
      )}
    </Authenticator>
  </React.StrictMode>
);
