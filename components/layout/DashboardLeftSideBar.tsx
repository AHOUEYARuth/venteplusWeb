"use client";
import Link from "next/link";
import React from "react";
import { AiFillProduct } from "react-icons/ai";
import {
  FaTh,
  FaChartBar,
  FaShoppingCart,
  FaCreditCard,
  FaShoppingBag,
  FaUser,
} from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { FiChevronDown, FiList, FiDollarSign } from "react-icons/fi";
import { IoSettings, IoHelpCircle, IoLogOut } from "react-icons/io5";
import { usePathname } from "next/navigation";
import "@/style/style.scss";
const DashboardLeftSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full h-full flex flex-col">
      <Link
        href="/"
        className="text-3xl font-bold text-[#F39C12] mb-8 flex-shrink-0"
      >
        Vente+
      </Link>

      <div className="flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex flex-col gap-y-20 pr-2 pt-4">
          <div className="flex flex-col gap-y-8">
            <h2 className="text-xl font-bold">MENU</h2>
            <ul className="space-y-8">
              <li className="text-lg text-[#2C3E50] font-medium">
                <Link
                  href="/dashboard"
                  className={`flex flex-row items-center gap-x-3 hover:text-[#F39C12] transition-colors ${
                    pathname === "/dashboard" ? "active" : ""
                  }`}
                >
                  <FaTh className="flex-shrink-0 text-xl" />
                  <span>Tableau de Bord</span>
                </Link>
              </li>

              <li className="text-lg text-[#2C3E50] font-medium">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none hover:text-[#F39C12] transition-colors">
                    <div className="flex items-center gap-x-3">
                      <AiFillProduct className="text-xl flex-shrink-0" />
                      <span>Produits et Stocks</span>
                    </div>
                    <FiChevronDown className="w-4 h-4 transform group-open:rotate-180 transition-transform duration-300 flex-shrink-0" />
                  </summary>
                  <ul className="mt-3 ml-7 space-y-3">
                    <li className="text-lg text-[#2C3E50] font-medium">
                      <Link
                        href="/product"
                        className={`flex items-center gap-x-3 hover:text-[#F39C12] transition-colors w-full ${
                          pathname === "/product" ? "active" : ""
                        }`}
                      >
                        <FiList className="w-5 h-5 flex-shrink-0" />
                        Liste des Produits
                      </Link>
                    </li>
                    <li className="text-lg text-[#2C3E50] font-medium">
                      <Link
                        href="/stock"
                        className={`flex items-center gap-x-3 hover:text-[#F39C12] transition-colors w-full ${
                          pathname === "/stock" ? "active" : ""
                        }`}
                      >
                        <AiFillProduct className="w-5 h-5 flex-shrink-0" />
                        Gestion des Stocks
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>

              <li className="text-lg text-[#2C3E50] font-medium">
                <Link
                  href="/selling"
                  className={`flex flex-row items-center gap-x-3 hover:text-[#F39C12] transition-colors ${
                    pathname === "/selling" ? "active" : ""
                  }`}
                >
                  <FaShoppingCart className="text-xl flex-shrink-0" />
                  <span>Commandes et Ventes</span>
                </Link>
              </li>

              <li className="text-lg text-[#2C3E50] font-medium">
                <Link
                  href="/spending"
                  className={`flex flex-row items-center gap-x-3 hover:text-[#F39C12] transition-colors ${
                    pathname === "/spending" ? "active" : ""
                  }`}
                >
                  <FiDollarSign className="text-xl flex-shrink-0" />
                  <span>Dépenses et Achats</span>
                </Link>
              </li>

              <li className="text-lg text-[#2C3E50] font-medium">
                <Link
                  href="/customerCredits"
                  className={`flex flex-row items-center gap-x-3 hover:text-[#F39C12] transition-colors ${
                    pathname === "/customerCredits" ? "active" : ""
                  }`}
                >
                  <FaCreditCard className="text-xl flex-shrink-0" />
                  <span>Crédits Clients</span>
                </Link>
              </li>

              <li className="text-lg text-[#2C3E50] font-medium">
                <Link
                  href="/report"
                  className={`flex flex-row items-center gap-x-3 hover:text-[#F39C12] transition-colors ${
                    pathname === "/report" ? "active" : ""
                  }`}
                >
                  <FaChartBar className="text-xl flex-shrink-0" />
                  <span>Rapports & Statistiques</span>
                </Link>
              </li>
              <li className="text-lg text-[#2C3E50] font-medium">
                <Link
                  href="/customer"
                  className={`flex flex-row items-center gap-x-3 hover:text-[#F39C12] transition-colors ${
                    pathname === "/customer" ? "active" : ""
                  }`}
                >
                  <FaUser className="text-xl flex-shrink-0" />
                  <span>Clients</span>
                </Link>
              </li>
              <li className="text-lg text-[#2C3E50] font-medium">
                <Link
                  href="/employee"
                  className={`flex flex-row items-center gap-x-3 hover:text-[#F39C12] transition-colors ${
                    pathname === "/employee" ? "active" : ""
                  }`}
                >
                  <ImUsers className="text-xl flex-shrink-0" />
                  <span>Employées</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-y-8">
            <h2 className="text-xl font-bold">GÉNÉRAL</h2>
            <ul className="space-y-8">
              <li className="text-lg text-[#2C3E50] font-medium">
                <Link
                  href="/"
                  className={`flex flex-row items-center gap-x-3 hover:text-[#F39C12] transition-colors ${
                    pathname === "/" ? "active" : ""
                  }`}
                >
                  <IoLogOut className="text-xl flex-shrink-0" />
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLeftSideBar;
