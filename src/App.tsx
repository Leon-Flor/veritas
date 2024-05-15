import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { useAuthProvider } from "@/context";
import { Quizzes, Test, SignIn, SignUp } from "@/app/apps";

export default function App() {
  const { isAuthenticated } = useAuthProvider();
  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <Routes>
          <Route path="/" Component={Quizzes} />
          <Route path="/quiz/:quizId" Component={Test} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" Component={SignIn} />
          <Route path="/signUp" Component={SignUp} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
