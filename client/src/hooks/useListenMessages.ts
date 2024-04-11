import { useSocketContext } from "@/context/SocketContext";
import useConveresation from "@/store/useConversation";
import { useEffect } from "react";

export default function useListenMessages() {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConveresation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessages([...messages, newMessage]);
    });
    return () => {
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [socket, setMessages, messages]);
}
