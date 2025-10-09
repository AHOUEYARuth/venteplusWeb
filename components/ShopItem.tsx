"use client";

import Image, { StaticImageData } from "next/image";
import React from "react";
import { GrFavorite } from "react-icons/gr";
import { MdOutlineStar } from "react-icons/md";
import "@/style/style.scss";


interface ShopItemProps {
  image: StaticImageData;
  name: string;
  domainIntervention: string;
  rating: string;
  bedrooms: string;
  userImage: StaticImageData;
  userName: string;
  userRole: string;
}

const ShopItem: React.FC<ShopItemProps> = ({
  image,
  name,
  domainIntervention,
  rating,
  bedrooms,
  userImage,
  userName,
  userRole,
}) => {
  return (
    <div className="shop-item w-[480px] flex flex-col gap-5 border border-gray-200 rounded-md border-t-0 mt-5 relative hover:shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] transition-all duration-300 cursor-pointer">
      <div className="relative">
        <Image
          src={image}
          alt=""
          height={200}
          className="w-full rounded-t-md object-cover"
        />
        <button className="absolute text-xl flex items-center gap-x-1 top-3 right-3 bg-[#F39C12] text-white px-3 py-1 text-sm rounded ">
          <MdOutlineStar />
          <span>{rating}</span>
        </button>
      </div>

      <div className="px-5 flex flex-col gap-5">
        <p className="text-base">
          <span className="text-[#F39C12] font-semibold">{name}</span>
        </p>

        <p className="font-bold text-xl text-gray-800">{domainIntervention}</p>

        <div className="flex items-center gap-4 text-sm text-gray-700 flex-wrap">
          <p>{bedrooms}</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="relative w-[60px] h-[60px]">
            <Image
              src={userImage}
              alt={userName}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <p className="font-medium text-lg">{userName}</p>
            <span className="text-sm text-gray-500">{userRole}</span>
          </div>
        </div>

        <div>
          <GrFavorite size={30} />
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
