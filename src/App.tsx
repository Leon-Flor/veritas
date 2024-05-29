import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { useAuthProvider } from "@/context";
import { Quizzes, Test, SignIn, SignUp, CreateQuiz } from "@/app/apps";
import { ConfirmSignUp } from "./app/apps/auth";

export default function App() {
  const { isAuthenticated } = useAuthProvider();
  return (
    <BrowserRouter>
      {/* Is private */}
      {isAuthenticated ? (
        <Routes>
          <Route path="/" Component={Quizzes} />
          <Route path="/createQuiz" Component={CreateQuiz} />
          <Route path="/quiz/:quizId" Component={Test} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" Component={SignIn} />
          <Route path="/signUp" Component={SignUp} />
          <Route path="/confirmSignUp/:userName" Component={ConfirmSignUp} />
          <Route path="/quiz/:quizId" Component={Test} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
