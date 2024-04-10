import Sidebar from "@/components/Sidebar";
import ChatPanel from "@/components/ChatPanel";
import { useAuthContext } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Home() {
  const { authUser } = useAuthContext();
  return (
    <>
      {authUser ? (
        <div className="flex w-full h-full">
          <Sidebar />
          <ChatPanel />
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
