import Sidebar from "@/components/Sidebar";
import ChatPanel from "@/components/ChatPanel";
import { useAuthContext } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  const isAboveMediumScreen = useMediaQuery("(min-width: 600px)");

  return (
    <>
      {authUser ? (
        !isAboveMediumScreen ? (
          <div className="w-full" onClick={() => navigate("/chat")}>
            <Sidebar />
          </div>
        ) : (
          <div className="flex w-full h-full">
            <Sidebar />
            <ChatPanel />
          </div>
        )
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
