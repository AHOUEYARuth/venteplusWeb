import React from "react";
import Separate from "./Separate";
import Shop1 from "@/assets/images/shopves1.jpg";
import Shop2 from "@/assets/images/shopBeauty.jpg"
import Shop3 from "@/assets/images/shopTech.jpg"
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineStarRate, MdStarRate } from "react-icons/md";
const Shop = () => {
  return (
    <section id="feat_location" className="w-full pt-[70] ">
      <div className="max-w-[80%] mx-auto">
        <div className="w-full flex flex-col justify-center items-center gap-4 text-center py-10">
          <h2 className="text-3xl font-semibold text-[#1c1c1c]">
            Nos Boutiques
          </h2>
          <Separate />
          <div className="w-full py-6">
            <h2 className="lg:text-5xl md:text-4xl text-3xl text-[#2C3E50] font-semibold text-center">
              Explorez les boutiques créées avec Vente+
            </h2>
            <div className="w-full flex flex-wrap justify-center gap-6 pt-20">
              <div
                className="w-full hover:shadow-xl sm:w-[100%] lg:w-[32%] h-[450px] relative rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat cursor-pointer"
                style={{ backgroundImage: `url(${Shop1.src})` }}
              >
                <Link href="/shop">
                  {" "}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/50 to-transparent" />
                </Link>
                <div className="absolute bottom-0 left-0 w-full flex flex-col items-start px-5 pb-6 text-white z-10 gap-y-2">
                  <h3 className="text-3xl font-semibold text-[#F39C12]">
                    Amra&apos; Shop
                  </h3>
                  <p className="text-lg opacity-90">Commerce vestimentaire</p>
                  <div className="w-full flex items-center gap-x-1">
                    <MdStarRate className="text-2xl text-[#F39C12]" />
                    <MdStarRate className="text-2xl text-[#F39C12]" />
                    <MdStarRate className="text-2xl text-[#F39C12]" />
                    <MdOutlineStarRate className="text-2xl" />
                    <MdOutlineStarRate className="text-2xl" />
                  </div>
                </div>
              </div>

              <div
                className="w-full sm:w-[100%] hover:shadow-xl lg:w-[32%] h-[450px] relative rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat cursor-pointer"
                style={{ backgroundImage: `url(${Shop2.src})` }}
              >
                <Link href="/shop">
                  {" "}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/50 to-transparent" />
                </Link>
                <div className="absolute bottom-0 left-0 w-full flex flex-col items-start px-5 pb-6 text-white z-10 gap-y-2">
                  <h3 className="text-3xl font-semibold text-[#F39C12]">
                    Nana House
                  </h3>
                  <p className="text-xl opacity-90">
                    Commerce de beauté et de coiffure
                  </p>
                  <div className="w-full flex items-center gap-x-1">
                    <MdStarRate className="text-2xl text-[#F39C12]" />
                    <MdStarRate className="text-2xl text-[#F39C12]" />
                    <MdStarRate className="text-2xl text-[#F39C12]" />
                    <MdStarRate className="text-2xl text-[#F39C12]" />
                    <MdOutlineStarRate className="text-2xl" />
                  </div>
                </div>
              </div>
              <div
                className="w-full hover:shadow-xl sm:w-[100%] lg:w-[32%] h-[450px] relative rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat cursor-pointer"
                style={{ backgroundImage: `url(${Shop3.src})` }}
              >
                <Link href="/shop">
                  {" "}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/50 to-transparent" />
                </Link>
                <div className="absolute bottom-0 left-0 w-full flex flex-col items-start px-5 pb-6 text-white z-10 gap-y-2">
                  <h3 className="text-3xl font-semibold text-[#F39C12]">
                    Sam Tech
                  </h3>
                  <p className="text-lg opacity-90">Commerce technologique</p>
                  <div className="w-full flex items-center gap-x-1">
                    <MdStarRate className="text-2xl text-[#F39C12]" />
                    <MdStarRate className="text-2xl text-[#F39C12]" />
                    <MdStarRate className="text-2xl text-[#F39C12]" />
                    <MdStarRate className="text-2xl text-[#F39C12]" />
                    <MdOutlineStarRate className="text-2xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-end gap-x-5 text-xl text-[#F39C12] p-px ">
            <Link href="" className="">
              Explorer tout
            </Link>
            <FaArrowRight />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
