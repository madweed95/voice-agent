import { useMemo } from "react";

export function useGetColors() {
  return useMemo(() => {
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
  }, []);
}
