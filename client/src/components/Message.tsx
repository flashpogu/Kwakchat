import { useAuthContext } from "@/context/AuthContext";
import useConveresation from "@/store/useConversation";

interface MessageProps {
  senderId: string;
  messageText: string;
  createdAt: string;
}

export default function Message({
  senderId,
  messageText,
  createdAt,
}: MessageProps) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConveresation();
  const fromMe = senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe
    ? "bg-blue-500 text-white"
    : "bg-gray-200 text-gray-700";
  const date = new Date(createdAt);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  const formattedTime = `${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}${period}`;
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="chat-image" />
        </div>
      </div>
      <div className={`chat-bubble ${bubbleBgColor}`}>{messageText}</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1">
        {formattedTime}
      </div>
    </div>
  );
}
