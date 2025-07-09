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
import backSvg from "@/assets/back.svg";
import { useVoiceMessageStore } from "./store";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/common/components/scroll-area";

export const JessicaModal = () => {
  const [displayHistory, setDisplayHistory] = useState(false);

  const messages = useVoiceMessageStore((state) => state.messages);
  console.log("messages", messages);
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
          <>
            <DialogHeader className="flex sticky items-center px-4 pt-3 flex-row justify-between">
              <Button
                className="font-gilroy-medium bg-transparent hover:bg-transparent text-xs hover:shadow p-0 text-[#4F1650] h-[30px] w-[30px] flex items-center justify-center "
                onClick={() => setDisplayHistory(false)}
              >
                <img src={backSvg} alt="back" width={15} height={15} />
              </Button>
            </DialogHeader>

            <ScrollArea className="overflow-scroll">
              <div className="p-4 flex flex-col gap-2">
                {!messages || messages.length === 0 ? (
                  <div className="text-[#4F1650] font-gilroy-medium text-sm">
                    "History is not available yet."{" "}
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <audio
                      key={index}
                      src={message}
                      controls
                      className="w-[250px]"
                    />
                  ))
                )}
              </div>
            </ScrollArea>
          </>
        ) : (
          <>
            <DialogHeader className="flex items-center px-6 py-7 flex-row justify-between">
              <div className="font-gilroy-medium text-xs text-[#4F1650]">
                Calling Jessica
              </div>
              <DialogClose className="rounded-full cursor-pointer bg-[#EF7679] h-[26px]">
                <img src={phoneSvg} alt="phone" className="p-1.5" />
              </DialogClose>
            </DialogHeader>
            <div className="w-full h-full flex items-center justify-center px-24">
              <Recorder />
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
