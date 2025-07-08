import { Description } from "@/modules/description/description";
import { Footer } from "@/modules/footer/footer";
import { NavMenu } from "@/modules/nav-menu/nav-menu";

export const HomePage = () => {
  return (
    <div className="w-screen font-gilroy h-screen px-40 bg-[#F9EBFA] flex items-center justify-between flex-col">
      <NavMenu />
      <Description />
      <Footer />
    </div>
  );
};
