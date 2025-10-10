"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu, AiOutlineUser } from 'react-icons/ai';
import { Button } from "../ui/button";
import "@/style/main.css";
const ShopDetailNavBar = () => {
    const pathname = usePathname();
     const [open, setOpen] = useState(false);
    return (
      <div>
        <header className="w-full bg-[#F9FAFB] fixed top-0 left-0 z-50  py-4">
          <div className="max-w-[80%] mx-auto flex items-center justify-between py-4">
            <Link
              href="/shop/read-more"
              className="text-2xl md:text-3xl font-bold text-[#F39C12] tracking-wide"
            >
              ShopLogo
            </Link>

            <nav className="nav hidden lg:flex flex-1 justify-center">
              <ul className="flex items-center space-x-6 lg:space-x-10 text-gray-700 font-medium">
                <li>
                  <Link
                    href="/shop/read-more"
                    className={
                      pathname === "/shop/read-more" ? "nav_active" : "inactive"
                    }
                  >
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className={
                      pathname === "/" ? "nav_active" : "inactive"
                    }
                  >
                    Explorer
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/register"
                className="hidden lg:flex items-center gap-2 text-[#F39C12]"
              >
                <AiOutlineUser size={20} />
                <span className="text-base lg:text-lg">Se connecter</span>
              </Link>

              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden p-2 rounded-md text-gray-700 "
              >
                {open ? (
                  <AiOutlineClose size={22} />
                ) : (
                  <AiOutlineMenu size={22} />
                )}
              </button>
              <Link href="/register">
                <Button className="btn bg-transparent border border-[#F39C12] text-[#F39C12] hover:bg-[#F39C12] hover:text-white rounded-3xl text-sm md:text-base lg:text-lg py-2 px-4 md:py-3 md:px-6 transition-all">
                  Commencer
                </Button>
              </Link>
            </div>
          </div>

          <div
            className={`lg:hidden mobile-nav transition-all duration-300 ease-in-out overflow-hidden ${
              open ? "max-h-[400px]" : "max-h-0"
            } bg-white border-t border-gray-200 shadow-inner`}
          >
            <ul className="max-w-[80%] mx-auto flex flex-col px-6 py-4 space-y-3 text-gray-700 font-medium">
              <li>
                <Link
                  href="/shop/read-more"
                  onClick={() => setOpen(false)}
                  className={
                    pathname === "/shop/read-more"
                      ? "nav_active block"
                      : "block"
                  }
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className={
                    pathname === "/"
                      ? "nav_active block"
                      : "block"
                  }
                >
                  Explorer
                </Link>
              </li>
              <li className="pt-3 border-t border-gray-200">
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 text-[#F39C12]"
                >
                  <AiOutlineUser size={18} />
                  <span>Se connecter</span>
                </Link>
              </li>
            </ul>
          </div>
        </header>
      </div>
    );
};

export default ShopDetailNavBar;