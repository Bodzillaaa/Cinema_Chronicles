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
import { useColorModeValue } from "@/components/ui/color-mode";
import MovieDetails from "./pages/MovieDetails";
import TrendingMovie from "./pages/TrendingMovie";
import SearchPage from "./pages/SearchPage";
import WatchList from "./pages/WatchList";

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthUser();
  const userRole = user?.user?.role;

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  const bgColor = useColorModeValue("white", "black");

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
    <Box minH={"100vh"} bg={bgColor}>
      <Routes>
        <Route path="/" element={!user ? <LoginPage /> : <HomePage />} />

        {/* User route */}
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
        <Route path="/api/movie/details/:id" element={<MovieDetails />} />
        <Route path="/api/movie/trending" element={<TrendingMovie />} />

        <Route
          path="/api/search/movie/:query"
          element={user ? <SearchPage /> : <Navigate to="/login" />}
        />

        <Route path="/api/user/watchlist" element={<WatchList />}></Route>
      </Routes>

      <Toaster />
    </Box>
  );
}

export default App;
