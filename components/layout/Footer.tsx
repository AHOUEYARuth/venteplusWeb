"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const Footer = () => {
  const pathname = usePathname();
  const hidePaths = ["/register", "/login"];

  if (hidePaths.includes(pathname)) {
    return null;
  }
  return (
    <footer className="footer bg-white text-black pt-[100] ">
      <div className="max-w-[80%] mx-auto  py-10 ">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <div className="flex flex-col gap-4 max-w-sm">
            <Link href="/" className="text-5xl font-bold text-[#F39C12]">
              Vente+
            </Link>
            <p className="footer-text text-lg leading-6 text-gray-700">
              Une plateforme complète pour votre commerce
            </p>
            <div className="flex flex-col items-start gap-3">
              <Link
                href="mailto:ruahoueya@gmail.com"
                className="footer-text text-lg text-gray-700"
              >
                ruahoueya@gmail.com
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-[#F39C12] font-semibold text-xl mb-3">
              Navigation
            </h4>
            <ul className="footer-menu flex flex-col gap-2 text-lg text-gray-700">
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#F39C12] transition"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#F39C12] transition">
                  Boutique
                </Link>
              </li>
              <li>
                <Link
                  href="/princin"
                  className="hover:text-[#F39C12] transition"
                >
                  Tarifs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#F39C12] transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#F39C12] font-semibold text-xl mb-3">
              Espace Membres
            </h4>
            <ul className="footer-menu flex flex-col gap-2 text-lg text-gray-700">
              <li>
                <Link
                  href="/register"
                  className="hover:text-[#F39C12] transition"
                >
                  S&apos;inscrire
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#F39C12] transition">
                  Se connecter
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#F39C12] transition">
                  Conditions d&apos;utilisation
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#F39C12] transition">
                  Politiques de confidentialité
                </Link>
              </li>
            </ul>
          </div>

          <div className="max-w-xs flex flex-col gap-4">
            <h4 className="footer-text text-[#F39C12] font-semibold text-xl">
              Inscription à la newsletter
            </h4>
            <p className="footer-text text-lg text-gray-700">
              Entrez votre address email
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email Address"
                className="border border-gray-400 rounded-full px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-red-500"
              />
              <button
                type="submit"
                className="bg-[#F39C12] text-white rounded-full py-2 text-lg font-medium hover:bg-red-700 transition"
              >
                S&apos;abonner
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
