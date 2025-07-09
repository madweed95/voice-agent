import { Button } from "@/common/components/button";
import { useWavesurfer } from "@wavesurfer/react";
import { useRef } from "react";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const gradient = ctx?.createLinearGradient(0, 0, 0, canvas.height * 1.35);
gradient?.addColorStop(0, "#656666"); // Top color
gradient?.addColorStop((canvas.height * 0.7) / canvas.height, "#656666"); // Top color
gradient?.addColorStop((canvas.height * 0.7 + 1) / canvas.height, "#ffffff"); // White line
gradient?.addColorStop((canvas.height * 0.7 + 2) / canvas.height, "#ffffff"); // White line
gradient?.addColorStop((canvas.height * 0.7 + 3) / canvas.height, "#B1B1B1"); // Bottom color
gradient?.addColorStop(1, "#B1B1B1"); // Bottom color

const progressGradient = ctx?.createLinearGradient(
  0,
  0,
  0,
  canvas.height * 1.35
);
progressGradient?.addColorStop(0, "#DD86DF"); // Start: soft purple
progressGradient?.addColorStop(0.3, "#CBA0E3"); // Mid: lighter purple
progressGradient?.addColorStop(0.5, "#000000"); // Center: black accent
progressGradient?.addColorStop(0.7, "#CBA0E3"); // Mid: lighter purple
progressGradient?.addColorStop(1, "#DD86DF"); // End: soft purple

type Props = {
  url: string;
};

export const CustomPlayer = ({ url }: Props) => {
  const containerRef = useRef(null);
  const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    url,
    waveColor: gradient,
    progressColor: progressGradient,
    height: 30,
    width: "100%",
    barWidth: 2,
    barHeight: 10,
    barGap: 2,
  });

  const onPlayPause = () => {
    if (!wavesurfer) return;

    wavesurfer.playPause();
  };

  return (
    <>
      <div ref={containerRef} className="p-2" />
      <Button
        onClick={onPlayPause}
        className="w-12 h-12 rounded-full bg-[#DD86DF] text-black hover:bg-[#DD86DF] hover:shadow-xl"
      >
        {isPlaying ? "Pause" : "Play"}
      </Button>
    </>
  );
};
