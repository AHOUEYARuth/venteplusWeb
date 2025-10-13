import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { CiMail } from 'react-icons/ci';
import { IoNotificationsOutline } from 'react-icons/io5';
import UserImg from "@/assets/images/usrp.png"
const DashboardNavBar = () => {
    return (
      <div className="w-full flex flex items-center justify-between">
        <div className="relative w-full max-w-xs">
          <div className="relative flex items-center bg-white gap-x-2 p-2 rounded-full">
            <BiSearch className="text-gray-700 font-bold text-xl pointer-events-none" />
            <input
              type="text"
              placeholder="Recherche"
              className="text-xl outline-hidden rounded-lg focus:outline-none  transition-all"
            />
          </div>
        </div>
        <div className="flex flex-row items-center gap-x-5">
          <div className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center cursor-pointer">
            <CiMail className="text-2xl" />
          </div>
          <div className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center cursor-pointer">
            <IoNotificationsOutline className="text-2xl" />
          </div>
          <div className="flex flex-row items-center gap-x-5">
            <div
              className="w-[50px] h-[50px] rounded-full bg-center bg-cover bg-no-repeat cursor-pointer"
              style={{ backgroundImage: `url(${UserImg.src})` }}
            ></div>
            <div>
              <h2 className="text-xl font-semibold cursor-pointer">Amra Detch</h2>
              <p className="text-lg text-gray-600 cursor-pointer">amra@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default DashboardNavBar;