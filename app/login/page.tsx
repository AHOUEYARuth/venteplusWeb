"use client";
import React from "react";
import { loginStore } from "./loginStore/loginStore";
import Link from "next/link";
import Image from "next/image";
import LoginP from "@/assets/images/login.jpg";
import "@/style/style.scss";

const Login = () => {
  const { name, showLogin } = loginStore();

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
      <div className="content w-[55%] bg-white rounded-xl flex items-center justify-between p-5">
        <div className="custom-box w-[50%] overflow-hidden">
          <div className="p-8 center-text">
            <h2 className="text-3xl font-bold mb-2 text-[#F39C12]">Vente+</h2>
            <h2 className="text-2xl font-semibold mb-4 text-black">
              Heureux de vous revoir 
            </h2>
            <p className="text-gray-700">
              Connectez-vous pour accéder à votre espace personnel.
            </p>
          </div>

          <div className="p-8">
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Adresse e-mail
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                  placeholder="Entrez votre adresse e-mail"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                  placeholder="Entrez votre mot de passe"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-[#F39C12] focus:ring-[#F39C12] border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Se souvenir de moi
                </label>
              </div>
              <Link
                href=""
                className="text-sm text-gray-700 hover:text-[#F39C12] font-medium"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            <button className="auth-btn w-[50%] bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d6860f] focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:ring-offset-2 transition-all shadow-lg">
              Se connecter
            </button>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Vous n’avez pas encore de compte ?{" "}
                <Link
                  href="/register"
                  className="text-[#F39C12] hover:text-[#d6860f] font-semibold"
                >
                  Créez-en un
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-md h-auto login">
          <Image
            src={LoginP}
            alt="Illustration de connexion"
            className="w-full rounded-t-md object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
