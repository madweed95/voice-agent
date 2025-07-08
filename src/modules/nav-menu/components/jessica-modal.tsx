import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/common/components/dialog";
import phoneSvg from "../../../assets/phone.svg";

export const JessicaModal = () => {
  return (
    <Dialog>
      <DialogTrigger className="bg-[#DD86DF] cursor-pointer text-[#1F1B20] hover:bg-[#DD86DF] font-gilroy-medium hover:shadow-xl w-full max-w-[117px] h-11 rounded-[12px]">
        Call Jessica
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="w-72 rounded-2xl h-72 flex flex-col gap-0 p-0 bg-[linear-gradient(51.33deg,_#F9EBFA_0%,_#F4D6F5_100%)]"
      >
        <DialogHeader className="flex items-center px-6 py-7 flex-row justify-between">
          <div className="font-gilroy-medium text-xs text-[#4F1650]">
            Calling Jessica
          </div>
          <DialogClose className="rounded-full bg-[#EF7679] h-[26px]">
            <img src={phoneSvg} alt="phone" className="p-1.5" />
          </DialogClose>
        </DialogHeader>
        <div className="w-full h-full flex items-center justify-center"></div>
      </DialogContent>
    </Dialog>
  );
};
