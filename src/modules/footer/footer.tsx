import shieldSvg from "../../assets/shield.svg";
import coinSvg from "../../assets/coin.svg";
import chartSvg from "../../assets/chart.svg";

export const Footer = () => {
  return (
    <div className="w-full mt-36 mb-[129px] flex items-center justify-between font-gilroy-bold text-[#4F1650]">
      <div className="flex items-center gap-2">
        <img src={coinSvg} alt="coin" />
        <div>Reduce costs by 40%.</div>
      </div>
      <div className="flex items-center gap-2">
        <img src={chartSvg} alt="chart" />
        <div>Increase customer satisfaction by 30%.</div>
      </div>
      <div className="flex items-center gap-2">
        <img src={shieldSvg} alt="shield" />
        <div>Trusted by those you know.</div>
      </div>
    </div>
  );
};
