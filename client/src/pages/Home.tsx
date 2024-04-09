import Sidebar from "@/components/Sidebar";
import ChatPanel from "@/components/ChatPanel";

export default function Home() {
  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <ChatPanel />
    </div>
  );
}
