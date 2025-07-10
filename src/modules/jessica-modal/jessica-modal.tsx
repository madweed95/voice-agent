import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/dialog";
import phoneSvg from "@/assets/phone.svg";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Recorder } from "./components/recorder";
import { Button } from "@/common/components/button";
import { useState, useRef } from "react";

import { cn } from "@/lib/utils";

import useWebSocket from "react-use-websocket";
import { HistoryList } from "./components/history-list";
import { useVoiceMessageStore } from "./store";

export const JessicaModal = () => {
  const audioRef = useRef(document.createElement("audio"));
  const state = useVoiceMessageStore((state) => state.state);
  const setState = useVoiceMessageStore((state) => state.setState);
  const storeMessages = useVoiceMessageStore((state) => state.storeMessages);
  const [open, setOpen] = useState(false);

  const { sendMessage } = useWebSocket(
    import.meta.env.VITE_WS_API_URL,
    {
      onMessage(message) {
        if (message?.data instanceof Blob) {
          const url = URL.createObjectURL(message?.data);

          if (state === "recording") {
            storeMessages(message.data);
          }

          audioRef.current.pause();
          audioRef.current.src = url;
          audioRef.current.controls = true;
          audioRef.current.play();

          setState("playback");
        }
      },
      heartbeat: {
        message: "ping",
        returnMessage: "pong",
        timeout: 60000,
        interval: 25000,
      },
    },
    open
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) setState("idle");
      }}
    >
      <VisuallyHidden>
        <DialogTitle />
      </VisuallyHidden>

      <DialogTrigger className="bg-[#DD86DF] cursor-pointer text-[#1F1B20] hover:bg-[#DD86DF] font-gilroy-medium hover:shadow-xl w-full max-w-[117px] h-11 rounded-[12px]">
        Call Jessica
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "w-72 rounded-2xl h-72 flex flex-col gap-0 p-0 bg-[linear-gradient(51.33deg,_#F9EBFA_0%,_#F4D6F5_100%)]",
          state === "history" && "overflow-hidden"
        )}
      >
        {state === "history" ? (
          <HistoryList />
        ) : (
          <>
            <DialogHeader className="flex items-center px-6 py-7 flex-row justify-between">
              <div className="font-gilroy-medium text-xs text-[#4F1650]">
                Calling Jessica
              </div>
              <DialogClose
                onClick={() => audioRef.current.pause()}
                className="rounded-full hover:shadow-xl cursor-pointer bg-[#EF7679] h-[26px]"
              >
                <img src={phoneSvg} alt="phone" className="p-1.5" />
              </DialogClose>
            </DialogHeader>
            <div className="w-full h-full flex items-center justify-center px-24">
              <Recorder sendMessage={sendMessage} />
            </div>
            <div className="flex flex-row items-center justify-center px-6 py-4 w-full">
              <Button
                variant="outline"
                className="bg-transparent text-[#4F1650] border-[#DD86DF] rounded-2xl hover:bg-transparent hover:shadow-xl"
                onClick={() => {
                  setState("history");
                }}
              >
                See history
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
