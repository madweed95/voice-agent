import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/common/components/navigation-menu";

import { cn } from "@/lib/utils";
import { MegaMenu } from "./components/mega-menu";
import { buttons } from "./constants";
import { JessicaModal } from "../jessica-modal/jessica-modal";

export const NavMenu = () => {
  return (
    <>
      <div className="w-full h-full max-h-[186px] py-[84px] xl:flex hidden items-center justify-between">
        <NavigationMenu className="w-full h-full">
          <NavigationMenuList>
            {buttons.map((button) => (
              <NavigationMenuItem
                className={cn(
                  "focus:bg-transparent",
                  button.value === "help" && "hover:animate-bounce"
                )}
                value={button.value}
                key={button.value}
                onClick={() => {
                  if (button.value === "help") {
                    window.open(
                      "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
                      "_blank"
                    );
                  }
                }}
              >
                <NavigationMenuTrigger
                  className={cn(
                    "[&>svg]:hidden hover:bg-transparent px-6 bg-transparent font-gilroy-medium focus:bg-transparent text-[#4F1650] text-sm leading-4",
                    window.location.pathname === button.path
                      ? "underline decoration-[#DD86DF] underline-offset-6 decoration-2"
                      : "",
                    (button.value === "help" || button.value === "home") &&
                      "cursor-pointer"
                  )}
                >
                  {button.label}
                </NavigationMenuTrigger>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <JessicaModal />
      </div>

      <MegaMenu />
    </>
  );
};
