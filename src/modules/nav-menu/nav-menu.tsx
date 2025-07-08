import { Button } from "@/common/components/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/common/components/navigation-menu";

export const NavMenu = () => {
  return (
    <div className="w-full h-full max-h-[186px] py-[84px] flex items-center justify-between">
      <NavigationMenu className="w-full h-full">
        <NavigationMenuList>
          <NavigationMenuItem className="focus:bg-transparent" value="home">
            <NavigationMenuTrigger className="[&>svg]:hidden hover:bg-transparent px-6 bg-transparent font-gilroy-medium cursor-pointer focus:bg-transparent text-[#4F1650] text-sm leading-4 underline decoration-[#DD86DF] underline-offset-6 decoration-2">
              Home
            </NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem className="focus:bg-transparent" value="products">
            <NavigationMenuTrigger className="[&>svg]:hidden px-6 bg-transparent font-gilroy-medium cursor-pointer focus:bg-transparent text-[#4F1650] text-sm leading-4">
              Products
            </NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem
            className="focus:bg-transparent"
            value="organization"
          >
            <NavigationMenuTrigger className="[&>svg]:hidden px-6 bg-transparent font-gilroy-medium cursor-pointer focus:bg-transparent text-[#4F1650] text-sm leading-4">
              Organization
            </NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem className="focus:bg-transparent" value="account">
            <NavigationMenuTrigger className="[&>svg]:hidden px-6 bg-transparent font-gilroy-medium cursor-pointer focus:bg-transparent text-[#4F1650] text-sm leading-4">
              Account
            </NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem className="focus:bg-transparent" value="help">
            <NavigationMenuTrigger className="[&>svg]:hidden px-6 bg-transparent font-gilroy-medium cursor-pointer focus:bg-transparent text-[#4F1650] text-sm leading-4">
              Help
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Button className="bg-[#DD86DF] text-[#1F1B20] hover:bg-[#DD86DF] font-gilroy-medium hover:shadow-xl w-full max-w-[117px] h-11 rounded-[12px]">
        Call Jessica
      </Button>
    </div>
  );
};
