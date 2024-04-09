import { useEffect, useState } from "react";
import Conversation from "./Conversation";

interface UserData {
  _id: string;
  fullName: string;
  profilePic: string;
}

export default function Conversations() {
  const [fetchedData, setFetchedData] = useState<UserData[]>([]);
  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const res = await fetch("/api/users/");
        const data = await res.json();
        setFetchedData(data);
        console.log(data);
      };
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(fetchedData);
  return (
    <div className="flex flex-col">
      {fetchedData.map((user) => (
        <Conversation
          key={user._id}
          fullName={user.fullName}
          profilePic={user.profilePic}
        />
      ))}
    </div>
  );
}
