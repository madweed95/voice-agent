import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/common/components/navigation-menu";

import { cn } from "@/lib/utils";
import { MegaMenu } from "./components/mega-menu";
import { buttons } from "./constants";
import { JessicaModal } from "./components/jessica-modal";

export const NavMenu = () => {
  return (
    <>
      <div className="w-full h-full max-h-[186px] py-[84px] xl:flex hidden items-center justify-between">
        <NavigationMenu className="w-full h-full">
          <NavigationMenuList>
            {buttons.map((button) => (
              <NavigationMenuItem
                className="focus:bg-transparent"
                value={button.value}
                key={button.value}
              >
                <NavigationMenuTrigger
                  className={cn(
                    "[&>svg]:hidden hover:bg-transparent px-6 bg-transparent font-gilroy-medium cursor-pointer focus:bg-transparent text-[#4F1650] text-sm leading-4",
                    window.location.pathname === button.path &&
                      "underline decoration-[#DD86DF] underline-offset-6 decoration-2"
                  )}
                >
                  {button.label}
                </NavigationMenuTrigger>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        {/* <Button className="bg-[#DD86DF] text-[#1F1B20] hover:bg-[#DD86DF] font-gilroy-medium hover:shadow-xl w-full max-w-[117px] h-11 rounded-[12px]">
          Call Jessica
        </Button> */}
        <JessicaModal />
      </div>

      <MegaMenu />
    </>
  );
};
