import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import { useAuthContext } from "./context/AuthContext";
import useConveresation from "./store/useConversation";
import MsgMobile from "./components/MsgMobile";
import { useMediaQuery } from "./hooks/useMediaQuery";

export default function App() {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConveresation();
  const isAboveMediumScreen = useMediaQuery("(min-width: 600px)");
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/chat"
          element={
            selectedConversation && !isAboveMediumScreen ? (
              <MsgMobile />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}
