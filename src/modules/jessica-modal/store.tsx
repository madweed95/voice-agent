import { create } from "zustand";

type VoiceMessageStore = {
  messages: Array<string>;
  storeMessages: (message: string) => void;
};

export const useVoiceMessageStore = create<VoiceMessageStore>((set) => ({
  messages: [],
  storeMessages: (message: string) =>
    set((prev) => ({
      messages: [...prev.messages, message],
    })),
}));
