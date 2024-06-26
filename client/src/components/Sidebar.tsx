import Conversations from "./Conversations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HiLogout } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { useAuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConveresation from "@/store/useConversation";

interface UserData {
  _id: string;
  fullName: string;
  profilePic: string;
}

export default function Sidebar() {
  const { setSelectedConversation } = useConveresation();
  const { fetchedData } = useGetConveresation();

  const { authUser, setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const signOut = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error);
        throw new Error(data.error);
      }
      localStorage.removeItem("chat-user");
      setAuthUser(null);
      navigate("/login");
      toast.success("Logged Out Successfully!");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = fetchedData.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found");
  };
  return (
    <div className="flex flex-col min-w-[35%] h-screen gap-4 px-3 pt-5 pb-2 bg-gray-100">
      {/* User Info  */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex gap-4">
          <Avatar className="w-14 h-14">
            <AvatarImage src={authUser.profilePic} />
            <AvatarFallback>
              {authUser.username.split("")[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center">
            <h5 className="font-semibold">{authUser.fullName}</h5>
            <p className="text-gray-600 text-xs">{`@${authUser.username}`}</p>
          </div>
        </div>
        <div
          onClick={signOut}
          aria-disabled={loading}
          className="bg-blue-500 p-2 rounded-xl"
        >
          <HiLogout
            size={21}
            className="cursor-pointer bg-blue-500 rounded-lg text-white"
          />
        </div>
      </div>
      <div className="bg-white h-screen rounded-2xl py-4 flex flex-col gap-8 overflow-y-scroll">
        <form
          onSubmit={handleSubmit}
          className="flex justify-between items-center px-6 py-3 rounded-3xl w-[90%] self-center bg-gray-100"
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="outline-none bg-gray-100 w-full"
            type="text"
          />
          <button type="submit">
            <CiSearch />
          </button>
        </form>
        <div>
          <Conversations />
        </div>
      </div>
    </div>
  );
}

function useGetConveresation() {
  const [fetchedData, setFetchedData] = useState<UserData[]>([]);
  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const res = await fetch("/api/users/");
        const data = await res.json();
        setFetchedData(data);
      };
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return { fetchedData };
}
