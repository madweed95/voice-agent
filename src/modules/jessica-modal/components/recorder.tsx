import { Button } from "@/common/components/button";
import { useEffect } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";

import recordIcon from "@/assets/record.svg";
import { useVoiceMessageStore } from "../store";
import { useMicVAD } from "@ricky0123/vad-react";

type Props<T> = {
  lastMessage: T | null;
  sendMessage: (message: Blob) => void;
};

export const Recorder = <T,>({ lastMessage, sendMessage }: Props<T>) => {
  const storeMessages = useVoiceMessageStore((state) => state.storeMessages);

  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
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

  const vad = useMicVAD({
    onSpeechEnd: () => {
      stopRecording();
    },
    redemptionFrames: 20,
  });

  return isRecording ? (
    <div className="flex items-center gap-2">
      <Button
        className="w-12 h-12 rounded-full bg-[#DD86DF] text-black hover:bg-[#DD86DF] hover:shadow-xl"
        type="button"
        onClick={() => stopRecording()}
      >
        Stop
      </Button>
      <Button
        className="w-12 h-12 rounded-full mr-4 text-black bg-[#DD86DF] hover:bg-[#DD86DF] hover:shadow-xl"
        type="button"
        onClick={() => togglePauseResume()}
      >
        {isPaused ? "Play" : "Pause"}
      </Button>
      {recordingTime}
      <div>{vad.userSpeaking && "User is speaking"}</div>
    </div>
  ) : (
    <Button
      className="w-12 h-12 rounded-full bg-[#DD86DF] hover:bg-[#DD86DF] hover:shadow-xl"
      type="button"
      onClick={() => startRecording()}
    >
      <img src={recordIcon} alt="record" />
    </Button>
  );
};
