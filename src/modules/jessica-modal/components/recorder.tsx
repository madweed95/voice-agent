import { Button } from "@/common/components/button";
import { useEffect } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import useWebSocket from "react-use-websocket";
import recordIcon from "@/assets/record.svg"; // Assuming you have a record icon

export const Recorder = () => {
  const { sendMessage, readyState, getWebSocket, lastMessage } = useWebSocket(
    "ws://localhost:8080",
    {
      heartbeat: {
        message: "ping",
        returnMessage: "pong",
        timeout: 60000,
        interval: 25000,
      },
    }
  );

  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
  } = useAudioRecorder();

  const addAudioElement = (blob: Blob | MediaSource | undefined) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    if (blob instanceof Blob) {
      const wavBlob = new Blob([blob], { type: "audio/wav" });
      sendMessage(wavBlob);
    } else {
      console.warn("Cannot send MediaSource via WebSocket.");
    }
  };

  useEffect(() => {
    if (lastMessage?.data instanceof Blob) {
      const url = URL.createObjectURL(lastMessage.data);
      const audio = document.createElement("audio");
      audio.src = url;
      audio.controls = true;
      document.body.appendChild(audio);
      audio.play();
      console.log("messageHistory", audio);
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

  return isRecording ? (
    <div className="flex items-center gap-2">
      <Button
        className="w-12 h-12 rounded-full bg-[#DD86DF] hover:bg-[#DD86DF] hover:shadow-xl"
        type="button"
        onClick={() => {
          stopRecording();

          addAudioElement(recordingBlob);
        }}
      >
        stop
      </Button>
      <Button
        className="w-12 h-12 rounded-full bg-[#DD86DF] hover:bg-[#DD86DF] hover:shadow-xl"
        type="button"
        onClick={() => togglePauseResume()}
      >
        {isPaused ? "Resume" : "Pause"}
      </Button>
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
