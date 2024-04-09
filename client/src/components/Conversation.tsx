import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ConversationProps {
  profilePic: string;
  fullName: string;
}

export default function Conversation({
  profilePic,
  fullName,
}: ConversationProps) {
  return (
    <div className="flex gap-4 items-center cursor-pointer hover:bg-gray-100 py-4">
      <Avatar className="w-12 h-12 ml-3">
        <AvatarImage src={profilePic} />
        <AvatarFallback>{fullName.split("")[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <div>
        <h5 className="font-semibold text-lg">{fullName}</h5>
        <p className="text-gray-400 text-sm italic">New Message</p>
      </div>
    </div>
  );
}
