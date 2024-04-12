import useConveresation from "@/store/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function MsgMobile() {
  const navigate = useNavigate();
  const { messages } = useConveresation();
  return (
    <div className="relative">
      <div className="bg-gray-100 w-full md:min-w-[450px] flex flex-col py-6">
        <div className={messages.length === 0 ? "m-0" : "mb-2"}>
          <Messages />
          <div
            className="fixed top-5 left-5 z-50 text-gray-800 bg-gray-200 rounded-full p-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <IoMdArrowRoundBack size={26} />
          </div>
        </div>
        <div className="absolute bottom-0 w-[60%]">
          <MessageInput />
        </div>
      </div>
    </div>
  );
}
