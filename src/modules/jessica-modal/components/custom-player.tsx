import { Button } from "@/common/components/button";
import { useWavesurfer } from "@wavesurfer/react";
import { useEffect, useRef, useState } from "react";
import playSvg from "@/assets/play.svg";
import pauseSvg from "@/assets/pause.svg";
import { useGetColors } from "../hooks/use-get-colors";

type Props = {
  blob: Blob;
};

export const CustomPlayer = ({ blob }: Props) => {
  const containerRef = useRef(null);
  const [url, setUrl] = useState<string>("");

  const { gradient, progressGradient } = useGetColors();

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
