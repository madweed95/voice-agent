import { Button } from "@/common/components/button";
import { useEffect } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import type { SendMessage } from "react-use-websocket";
import recordIcon from "@/assets/record.svg";
import { useVoiceMessageStore } from "../store";
import { useMicVAD } from "@ricky0123/vad-react";
import { cn } from "@/common/utils/styles";

type Props = {
  sendMessage: SendMessage;
};

export const Recorder = ({ sendMessage }: Props) => {
  const setState = useVoiceMessageStore((state) => state.setState);

  const {
    startRecording,
    stopRecording,
    recordingBlob,
    isRecording,
    recordingTime,
  } = useAudioRecorder();

  useEffect(() => {
    if (!recordingBlob) return;
    if (!(recordingBlob instanceof Blob))
      alert("Cannot send MediaSource via WebSocket.");

    sendMessage(new Blob([recordingBlob], { type: "audio/wav" }));
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
      onClick={() => {
        if (isRecording) {
          stopRecording();
        } else {
          startRecording();
          setState("recording");
        }
      }}
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
