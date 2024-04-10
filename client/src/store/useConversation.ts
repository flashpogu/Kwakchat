import { create } from "zustand";

interface ConversationState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedConversation: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSelectedConversation: (selectedConversation: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messages: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setMessages: (messages: any[]) => void;
}

const useConveresation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConveresation;
