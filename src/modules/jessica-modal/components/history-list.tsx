import { Button } from "@/common/components/button";
import { DialogHeader } from "@/common/components/dialog";
import { ScrollArea } from "@/common/components/scroll-area";
import { useVoiceMessageStore } from "../store";
import type { Dispatch, SetStateAction } from "react";
import backSvg from "@/assets/back.svg";
type Props = {
  setDisplayHistory: Dispatch<SetStateAction<boolean>>;
};

export const HistoryList = ({ setDisplayHistory }: Props) => {
  const messages = useVoiceMessageStore((state) => state.messages);

  return (
    <>
      <DialogHeader className="flex sticky items-center px-4 py-3 flex-row justify-between">
        <Button
          className="font-gilroy-medium bg-transparent hover:bg-transparent text-xs border border-[#DD86DF] hover:shadow rounded-full p-0 text-[#4F1650] h-[26px] w-[26px] flex items-center justify-center "
          onClick={() => setDisplayHistory(false)}
        >
          <img src={backSvg} alt="back" width={15} height={15} />
        </Button>
      </DialogHeader>

      <ScrollArea className="overflow-scroll">
        <div className="p-4 flex flex-col gap-2">
          {!messages || messages.length === 0 ? (
            <div className="text-[#4F1650] font-gilroy-medium text-sm">
              History is not available yet.
            </div>
          ) : (
            messages.map((message, index) => (
              <audio key={index} src={message} controls className="w-[250px]" />
            ))
          )}
        </div>
      </ScrollArea>
    </>
  );
};
