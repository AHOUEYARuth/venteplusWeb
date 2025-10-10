import React from "react";
import HeroPic from "@/assets/images/shopHeroPic.png"
import "@/style/style.scss"
const ShopDetailHeader = () => {
  return (
    <>
      <section className="w-full py-[70] mt-[90] ">
        <div className="max-w-[80%] mx-auto">
          <div className="padding w-full bg-[#F39C12] flex flex-row justify-between items-center h-[500px] relative rounded-2xl text-start p-10 text-white">
            <div className="column-img center-text w-[55%] flex flex-col gap-8">
              <div className="text-6xl text_size font-semibold tracking-wide">
                20% OF ONLY TODAY AND GET SPECIAL GIFT!
              </div>
              <div className="text-2xl w-ful">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque,
                consequatur.
              </div>
            </div>
            <div
              className="login column-img w-[40%] h-[508px] bg-center bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${HeroPic.src})` }}
            ></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopDetailHeader;
