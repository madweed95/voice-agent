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
import { useState } from "react";

import { cn } from "@/lib/utils";

import useWebSocket from "react-use-websocket";
import { HistoryList } from "./components/history-list";

export const JessicaModal = () => {
  const [displayHistory, setDisplayHistory] = useState(false);

  const { sendMessage, lastMessage } = useWebSocket(
    "ws://localhost:8080",
    {
      heartbeat: {
        message: "ping",
        returnMessage: "pong",
        timeout: 60000,
        interval: 25000,
      },
    },
    !displayHistory
  );

  return (
    <Dialog>
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
          displayHistory && "overflow-hidden"
        )}
      >
        {displayHistory ? (
          <HistoryList setDisplayHistory={setDisplayHistory} />
        ) : (
          <>
            <DialogHeader className="flex items-center px-6 py-7 flex-row justify-between">
              <div className="font-gilroy-medium text-xs text-[#4F1650]">
                Calling Jessica
              </div>
              <DialogClose className="rounded-full hover:shadow-xl cursor-pointer bg-[#EF7679] h-[26px]">
                <img src={phoneSvg} alt="phone" className="p-1.5" />
              </DialogClose>
            </DialogHeader>
            <div className="w-full h-full flex items-center justify-center px-24">
              <Recorder
                lastMessage={lastMessage?.data}
                sendMessage={sendMessage}
              />
            </div>
            <div className="flex flex-row items-center justify-center px-6 py-4 w-full">
              <Button
                variant="outline"
                className="bg-transparent text-[#4F1650] border-[#DD86DF] rounded-2xl hover:bg-transparent hover:shadow-xl"
                onClick={() => setDisplayHistory(true)}
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
