import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/components/dropdown-menu";
import { cn } from "@/lib/utils";
import menuSvg from "../../../assets/menu.svg";
import { buttons } from "../constants";
import { JessicaModal } from "../../jessica-modal/jessica-modal";

export const MegaMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full h-14 flex items-center justify-end xl:hidden">
        <div className="w-7 h-7">
          <img src={menuSvg} alt="menu" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col items-center">
        {buttons.map((button) => (
          <DropdownMenuItem
            className={cn(
              "[&>svg]:hidden hover:bg-transparent px-6 bg-transparent font-gilroy-medium cursor-pointer focus:bg-transparent text-[#4F1650] text-sm leading-4",
              window.location.pathname === button.path &&
                "underline decoration-[#DD86DF] underline-offset-6 decoration-2"
            )}
            key={button.value}
          >
            {button.label}
          </DropdownMenuItem>
        ))}
        <JessicaModal />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
