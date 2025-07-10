import type { SendMessage } from "react-use-websocket";
import recordIcon from "@/assets/record.svg";
import { useVoiceMessageStore } from "../store";
import { useMicVAD } from "@ricky0123/vad-react";

import { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record";
import { Button } from "@/common/components/button";
import { cn } from "@/common/utils/styles";
import { useGetColors } from "../hooks/use-get-colors";

type Props = {
  sendMessage: SendMessage;
};

export const Recorder = ({ sendMessage }: Props) => {
  const setState = useVoiceMessageStore((state) => state.setState);
  const state = useVoiceMessageStore((state) => state.state);
  const micContainerRef = useRef(null);
  const [recordPlugin, setRecordPlugin] = useState<RecordPlugin | null>(null);
  const { progressGradient } = useGetColors();

  const handleRecordClick = () => {
    if (recordPlugin) {
      if (recordPlugin.isRecording()) {
        recordPlugin.stopRecording();
        recordPlugin.destroy();
      } else {
        setState("recording");
        recordPlugin.startRecording();
      }
    }
  };

  useMicVAD({
    onSpeechEnd: () => {
      if (!recordPlugin) return;
      recordPlugin.stopRecording();
      recordPlugin.destroy();
    },
    redemptionFrames: 20,
  });

  useEffect(() => {
    const wavesurferInstance = WaveSurfer.create({
      container: micContainerRef.current ?? "",
      waveColor: progressGradient,
      height: 30,
      width: "100%",
      barWidth: 6,
      barHeight: 14,
      barRadius: 2,
      minPxPerSec: 15,
    });

    const recordPluginInstance = RecordPlugin.create({
      renderRecordedAudio: false,
      scrollingWaveform: true,
      continuousWaveform: false,
      continuousWaveformDuration: 30,
    });
    setRecordPlugin(recordPluginInstance);

    wavesurferInstance.registerPlugin(recordPluginInstance);

    recordPluginInstance.on("record-end", (blob) => {
      sendMessage(new Blob([blob], { type: "audio/wav" }));
    });

    return () => {
      wavesurferInstance.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-3 w-full h-full">
      <Button
        className={cn(
          "w-12 h-12 rounded-full bg-[#DD86DF] hover:bg-[#DD86DF] hover:shadow-xl relative"
        )}
        type="button"
        onClick={handleRecordClick}
      >
        {state === "recording" && (
          <div className="absolute top-0 right-0 bg-red-600 w-2 h-2 rounded-full animate-ping opacity-75" />
        )}
        {state === "recording" ? (
          <div className="w-4 h-4 bg-black" />
        ) : (
          <img src={recordIcon} alt="record" />
        )}
      </Button>
      <div
        ref={micContainerRef}
        className={cn("hidden", state === "recording" && "block w-full")}
      />
    </div>
  );
};
