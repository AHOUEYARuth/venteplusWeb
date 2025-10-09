"use client";

import Link from "next/link";
import React, { useState } from "react";
import "@/style/main.css";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { AiOutlineUser, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const NavBar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);


  const hidePaths = ["/register", "/login"];


  if (hidePaths.includes(pathname)) {
    return null;
  }

  return (
    <header className="w-full bg-[#F9FAFB] fixed top-0 left-0 z-50  py-4">
      <div className="max-w-[80%] mx-auto flex items-center justify-between py-4">
        <Link
          href="/"
          className="text-2xl md:text-3xl font-bold text-[#F39C12] tracking-wide"
        >
          Vente+
        </Link>

        <nav className="nav hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center space-x-6 lg:space-x-10 text-gray-700 font-medium">
            <li>
              <Link href="/" className={pathname === "/" ? "nav_active" : ""}>
                Accueil
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className={pathname === "/services" ? "nav_active" : ""}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className={pathname === "/shop" ? "nav_active" : ""}
              >
                Boutiques
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className={pathname === "/pricing" ? "nav_active" : ""}
              >
                Tarifs
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={pathname === "/about" ? "nav_active" : ""}
              >
                À Propos
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={pathname === "/contact" ? "nav_active" : ""}
              >
                Nous contacter
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
            {open ? <AiOutlineClose size={22} /> : <AiOutlineMenu size={22} />}
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
              href="/"
              onClick={() => setOpen(false)}
              className={pathname === "/" ? "nav_active block" : "block"}
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              onClick={() => setOpen(false)}
              className={
                pathname === "/services" ? "nav_active block" : "block"
              }
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className={pathname === "/shop" ? "nav_active block" : "block"}
            >
              Boutiques
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className={pathname === "/about" ? "nav_active block" : "block"}
            >
              À Propos
            </Link>
          </li>
          <li>
            <Link
              href="/pricing"
              onClick={() => setOpen(false)}
              className={pathname === "/pricing" ? "nav_active block" : "block"}
            >
              Tarifs
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={pathname === "/contact" ? "nav_active block" : "block"}
            >
              Nous contacter
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
  );
};

export default NavBar;
