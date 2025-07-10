import { Button } from "@/common/components/button";
import { useWavesurfer } from "@wavesurfer/react";
import { useEffect, useMemo, useRef, useState } from "react";
import playSvg from "@/assets/play.svg";
import pauseSvg from "@/assets/pause.svg";

type Props = {
  blob: Blob;
};

export const CustomPlayer = ({ blob }: Props) => {
  const containerRef = useRef(null);
  const [url, setUrl] = useState<string>("");

  const { gradient, progressGradient } = useMemo(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const gradient = ctx?.createLinearGradient(0, 0, 0, canvas.height * 1.35);
    gradient?.addColorStop(0, "#656666");
    gradient?.addColorStop((canvas.height * 0.7) / canvas.height, "#656666");
    gradient?.addColorStop(
      (canvas.height * 0.7 + 1) / canvas.height,
      "#ffffff"
    );
    gradient?.addColorStop(
      (canvas.height * 0.7 + 2) / canvas.height,
      "#ffffff"
    );
    gradient?.addColorStop(
      (canvas.height * 0.7 + 3) / canvas.height,
      "#B1B1B1"
    );
    gradient?.addColorStop(1, "#B1B1B1");

    const progressGradient = ctx?.createLinearGradient(
      0,
      0,
      0,
      canvas.height * 1.35
    );
    progressGradient?.addColorStop(0, "#DD86DF");
    progressGradient?.addColorStop(0.3, "#CBA0E3");
    progressGradient?.addColorStop(0.5, "#000000");
    progressGradient?.addColorStop(0.7, "#CBA0E3");
    progressGradient?.addColorStop(1, "#DD86DF");

    return { gradient, progressGradient };
  }, [blob]);

  const { wavesurfer, isPlaying } = useWavesurfer({
    container: containerRef,
    url,
    waveColor: gradient,
    progressColor: progressGradient,
    height: 30,
    width: "100%",
    barWidth: 6,
    barHeight: 14,
    barRadius: 2,
    minPxPerSec: 15,
  });

  const onPlayPause = () => {
    if (!wavesurfer) return;
    wavesurfer.playPause();
  };

  useEffect(() => {
    const objectUrl = URL.createObjectURL(blob);
    setUrl(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [blob]);

  if (!blob) return;
  return (
    <span className="flex items-start justify-center gap-2 w-full">
      <Button
        onClick={onPlayPause}
        className="w-12 h-12 p-0 rounded-full bg-[#DD86DF] text-black hover:bg-[#DD86DF] hover:shadow-xl"
      >
        <img
          src={isPlaying ? pauseSvg : playSvg}
          alt="control"
          width={30}
          height={30}
        />
      </Button>
      <div ref={containerRef} className="p-2 w-full" />
    </span>
  );
};
