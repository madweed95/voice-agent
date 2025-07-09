import { useEffect } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import useWebSocket from "react-use-websocket";

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

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err)
  );

  const addAudioElement = (blob: Blob | MediaSource) => {
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

  return (
    <AudioRecorder
      onRecordingComplete={(blob) => addAudioElement(blob)}
      recorderControls={recorderControls}
      showVisualizer={true}
    />
  );
};
