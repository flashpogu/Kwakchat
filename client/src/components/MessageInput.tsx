import useConveresation from "@/store/useConversation";
import { useState } from "react";
import { IoSend } from "react-icons/io5";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { messages, setMessages, selectedConversation } = useConveresation();

  const sendMessage = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!message) return;
      const res = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      setMessage("");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data);
      }
      setMessages([...messages, data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={sendMessage} className="px-4 my-3">
      <div className="flex justify-between items-center px-6 py-3 rounded-3xl w-full self-center bg-white">
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Type a message"
          className="outline-none bg-white w-full"
          type="text"
        />
        <button
          type="submit"
          className="bg-blue-500 p-3 rounded-full flex items-center justify-center"
        >
          {loading ? (
            <div className="loading loading-spinner text-white"></div>
          ) : (
            <IoSend size={22} className="text-white self-center" />
          )}
        </button>
      </div>
    </form>
  );
}
