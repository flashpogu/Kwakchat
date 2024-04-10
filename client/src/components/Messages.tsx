import { useEffect, useState } from "react";
import Message from "./Message";
import useConveresation from "@/store/useConversation";
import SkeletonMsg from "./SkeletonMsg";

interface msgType {
  senderId: string;
  messageText: string;
  createdAt: string;
}
export default function Messages() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConveresation();
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data);
        setMessages(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation._id, setMessages]);
  return (
    <div className="px-4 flex-1 h-[84vh] overflow-y-scroll">
      {loading ? (
        <SkeletonMsg />
      ) : (
        messages.map((msg: msgType) => (
          <Message
            senderId={msg.senderId}
            messageText={msg.messageText}
            createdAt={msg.createdAt}
          />
        ))
      )}
      {!loading && messages.length === 0 && (
        <p className="text-gray-700 text-center">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
}
