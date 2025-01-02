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
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthUser();
  const userRole = user?.user?.role;

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
        {/* User route */}

        <Route path="/" element={!user ? <LoginPage /> : <HomePage />} />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />

        {/* Admin route */}

        <Route
          path="/adminsignup"
          element={
            !user || userRole !== "admin" ? (
              <AdminSignUpPage />
            ) : (
              <AdminDashboard />
            )
          }
        />
        <Route
          path="/adminlogin"
          element={
            !user || userRole !== "admin" ? (
              <AdminLoginPage />
            ) : (
              <AdminDashboard />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            !user || userRole !== "admin" ? (
              <AdminLoginPage />
            ) : (
              <AdminDashboard />
            )
          }
        />
        {/* Forgot pass route */}
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
