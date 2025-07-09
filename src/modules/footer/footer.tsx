import shieldSvg from "@/assets/shield.svg";
import coinSvg from "@/assets/coin.svg";
import chartSvg from "@/assets/chart.svg";

export const Footer = () => {
  return (
    <div className="w-full xl:mt-36 xl:mb-[129px] mb-20 flex items-center justify-between font-gilroy-bold text-[#4F1650]">
      <div className="flex items-center gap-2 xl:flex-row flex-col">
        <img src={coinSvg} alt="coin" />
        <div className="text-center">Reduce costs by 40%.</div>
      </div>
      <div className="flex items-center gap-2 xl:flex-row flex-col">
        <img src={chartSvg} alt="chart" />
        <div className="text-center">
          Increase customer satisfaction by 30%.
        </div>
      </div>
      <div className="flex items-center gap-2 xl:flex-row flex-col">
        <img src={shieldSvg} alt="shield" />
        <div className="text-center">Trusted by those you know.</div>
      </div>
    </div>
  );
};
