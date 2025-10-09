"use client";
import React from "react";
import { registerStore } from "./registerStore/registerStore";
import Image from "next/image";
import Link from "next/link";
import RegisterP from "@/assets/images/login.jpg";
import "@/style/style.scss";
const register = () => {
  const { nom, age, showUser } = registerStore();
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
      <div className="content w-[55%] bg-white rounded-xl flex items-center justify-between p-8">
        <div className="custom-box w-[50%] overflow-hidden">
          <div className="px-8 center-text">
            <h2 className="text-3xl font-bold mb-2 text-gray-700">
              Bienvenue sur Vente+
            </h2>
            <h2 className="text-2xl font-semibold mb-4 text-black">
              Créez votre compte
            </h2>
            <p className="text-gray-700">
              Inscrivez-vous pour rejoindre la communauté Vente+
            </p>
          </div>

          <div className="px-8 py-5">
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Nom complet
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                placeholder="Entrez votre nom complet"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Adresse e-mail
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                placeholder="Entrez votre adresse e-mail"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                placeholder="Créez un mot de passe"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                placeholder="Confirmez le mot de passe"
              />
            </div>

            <button className="auth-btn w-[50%] bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d5850c] focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:ring-offset-2 transition-all shadow-lg">
              S’inscrire
            </button>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Vous avez déjà un compte ?{" "}
                <Link
                  href="/login"
                  className="text-[#F39C12] hover:text-[#F39C12] font-semibold"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-md h-auto login">
          <Image
            src={RegisterP}
            alt="Illustration inscription"
            className="w-full rounded-t-md object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default register;
