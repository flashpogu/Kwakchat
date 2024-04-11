import useConveresation from "@/store/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { useEffect } from "react";

export default function ChatPanel() {
  const { selectedConversation, setSelectedConversation } = useConveresation();
  console.log(selectedConversation);

  useEffect(() => {
    // cleanup function
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="bg-gray-100 w-full md:min-w-[450px] h-screen flex flex-col px-9 py-6">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="relative">
            <Messages />
          </div>
          <div className="absolute bottom-0 w-[60%]">
            <MessageInput />
          </div>
        </>
      )}
    </div>
  );
}

function NoChatSelected() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-700 font-semibold flex flex-col items-center gap-4">
        <p>Welcome to Kwakchat👋</p>
        <p>Select a chat to start messaging</p>
        <BiSolidMessageSquareDetail size={30} />
      </div>
    </div>
  );
}
