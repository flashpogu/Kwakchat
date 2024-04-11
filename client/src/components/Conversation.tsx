import { useSocketContext } from "@/context/SocketContext";
import useConveresation from "@/store/useConversation";

interface ConversationProps {
  profilePic: string;
  fullName: string;
  _id: string;
}

export default function Conversation({
  profilePic,
  fullName,
  _id,
}: ConversationProps) {
  const { selectedConversation, setSelectedConversation } = useConveresation();

  const isSelected = selectedConversation?._id === _id;

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(_id);
  return (
    <div
      className={`flex relative gap-4 items-center cursor-pointer hover:bg-gray-100 py-4 ${
        isSelected ? "bg-gray-300 hover:bg-gray-300" : ""
      }`}
      onClick={() => setSelectedConversation({ fullName, profilePic, _id })}
    >
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        <div className="w-12 rounded-full">
          <img src={profilePic} alt="profile pic" />
        </div>
      </div>
      <div>
        <h5 className="font-semibold text-lg">{fullName}</h5>
        <p className="text-gray-400 text-sm italic">New Message</p>
      </div>
    </div>
  );
}
