import { Description } from "@/modules/description/description";
import { Footer } from "@/modules/footer/footer";
import { NavMenu } from "@/modules/nav-menu/nav-menu";

export const HomePage = () => {
  return (
    <div className="w-screen font-gilroy h-screen xl:px-40 px-5 md:px-10 bg-[#F9EBFA] flex items-center justify-between flex-col">
      <NavMenu />
      <Description />
      <Footer />
    </div>
  );
};
