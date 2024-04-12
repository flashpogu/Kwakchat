/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

type SocketContextValue = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onlineUsers: any[];
};

export const SocketContext = createContext<SocketContextValue>({
  socket: null,
  onlineUsers: [],
});

interface SocketContextProviderProps {
  children: React.ReactNode;
}

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const { authUser } = useAuthContext();
  useEffect(() => {
    let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;
    if (authUser) {
      socket = io("https://kwakchat.onrender.com/", {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
    }

    return () => {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    };
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
