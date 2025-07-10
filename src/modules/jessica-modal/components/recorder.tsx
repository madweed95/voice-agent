import { Button } from "@/common/components/button";
import { useEffect } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";

import recordIcon from "@/assets/record.svg";
import { useVoiceMessageStore } from "../store";
import { useMicVAD } from "@ricky0123/vad-react";
import { cn } from "@/common/utils/styles";

type Props<T> = {
  lastMessage: T | null;
  sendMessage: (message: Blob) => void;
};

export const Recorder = <T,>({ lastMessage, sendMessage }: Props<T>) => {
  const storeMessages = useVoiceMessageStore((state) => state.storeMessages);

  const {
    startRecording,
    stopRecording,
    recordingBlob,
    isRecording,
    recordingTime,
  } = useAudioRecorder();

  useEffect(() => {
    if (lastMessage instanceof Blob) {
      const url = URL.createObjectURL(lastMessage);
      const audio = document.createElement("audio");
      audio.src = url;
      audio.controls = true;
      audio.play();
      storeMessages(url);
    }
  }, [lastMessage]);

  useEffect(() => {
    if (!recordingBlob) return;
    const url = URL.createObjectURL(recordingBlob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    if (recordingBlob instanceof Blob) {
      const wavBlob = new Blob([recordingBlob], { type: "audio/wav" });
      sendMessage(wavBlob);
    } else {
      console.warn("Cannot send MediaSource via WebSocket.");
    }
  }, [recordingBlob]);

  useMicVAD({
    onSpeechEnd: () => {
      stopRecording();
    },
    redemptionFrames: 20,
  });

  return (
    <Button
      className={cn(
        "w-12 h-12 rounded-full bg-[#DD86DF] hover:bg-[#DD86DF] hover:shadow-xl relative"
      )}
      type="button"
      onClick={() => (isRecording ? stopRecording() : startRecording())}
    >
      {isRecording && (
        <div className="absolute top-0 right-0 bg-red-600 w-2 h-2 rounded-full animate-ping opacity-75" />
      )}
      {isRecording ? (
        <div className="w-4 h-4 bg-black" />
      ) : (
        <img src={recordIcon} alt="record" />
      )}
    </Button>
  );
};
