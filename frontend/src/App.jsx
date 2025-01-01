import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import AdminSignUpPage from "./pages/AdminSignUpPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { useAuthUser } from "./store/authUser";
import { useEffect } from "react";
import { Box, AbsoluteCenter, Spinner } from "@chakra-ui/react";

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthUser();
  console.log("Auth user: ", user);

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <Box h={"full"}>
        <AbsoluteCenter>
          <Spinner color="cyan" size={"xl"} />
        </AbsoluteCenter>
      </Box>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={!user ? <SignUpPage /> : <HomePage />} />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        <Route path="/adminsignup" element={<AdminSignUpPage />} />
        <Route path="/adminlogin" element={<AdminLoginPage />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
