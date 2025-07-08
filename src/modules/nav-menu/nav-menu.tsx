import { Button } from "@/common/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/components/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/common/components/navigation-menu";
import menuSvg from "../../assets/menu.svg";

import { cn } from "@/lib/utils";

const buttons = [
  {
    label: "Home",
    path: "/",
    value: "home",
  },
  {
    label: "Products",
    path: "/product",
    value: "products",
  },
  {
    label: "Organization",
    path: "/organization",
    value: "organization",
  },
  {
    label: "Account",
    path: "/account",
    value: "account",
  },
  {
    label: "Help",
    path: "/help",
    value: "help",
  },
];

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
        <Button className="bg-[#DD86DF] text-[#1F1B20] hover:bg-[#DD86DF] font-gilroy-medium hover:shadow-xl w-full max-w-[117px] h-11 rounded-[12px]">
          Call Jessica
        </Button>
      </div>
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
          <Button className="bg-[#DD86DF] mt-3 text-[#1F1B20] hover:bg-[#DD86DF] font-gilroy-medium hover:shadow-xl w-full max-w-[117px] h-11 rounded-[12px]">
            Call Jessica
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
