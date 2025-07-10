import { create } from "zustand";
type State = "idle" | "recording" | "playback" | "history";
type VoiceMessageStore = {
  state: State;
  setState: (state: State) => void;
  messages: Array<Blob>;
  storeMessages: (message: Blob) => void;
};

export const useVoiceMessageStore = create<VoiceMessageStore>((set) => ({
  state: "idle",
  messages: [],
  setState: (state: VoiceMessageStore["state"]) => set({ state }),
  storeMessages: (message: Blob) =>
    set((prev) => ({
      messages: [...prev.messages, message],
    })),
}));
