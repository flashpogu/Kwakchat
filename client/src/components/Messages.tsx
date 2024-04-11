import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import useConveresation from "@/store/useConversation";
import SkeletonMsg from "./SkeletonMsg";
import useListenMessages from "@/hooks/useListenMessages";

interface msgType {
  senderId: string;
  messageText: string;
  createdAt: string;
  _id: string;
}
export default function Messages() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConveresation();
  useListenMessages();
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

  const lastMessageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <div className="bg-gray-100 px-4 flex-1 md:h-[84vh] h-[92vh] overflow-y-scroll ">
      {loading ? (
        <SkeletonMsg />
      ) : (
        messages.map((msg: msgType) => (
          <div key={msg._id} ref={lastMessageRef}>
            <Message
              senderId={msg.senderId}
              messageText={msg.messageText}
              createdAt={msg.createdAt}
            />
          </div>
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
