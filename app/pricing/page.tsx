"use client";
import React from "react";
import { princingStore } from "./pricingStore/princingStore";
import { Button } from "@/components/ui/button";
import { IoCheckmark } from "react-icons/io5";
import "@/style/style.scss";
const pricing = () => {
  const { type, price, showPrincing } = princingStore();
  return (
    <div>
      <section id="feat_location" className="w-full py-[70] mt-[80] ">
        <div className="max-w-[80%] mx-auto">
          <div className="w-full flex flex-col justify-center items-center text-center py-10">
            <div className="font-medium text-sm text-[orangered]">
              BIENVENUE SUR TARIF
            </div>
            <h1 className="font-medium">Nos Tarifs</h1>
            <div className="text-lg text-[#2C3E50] lg:w-[50%] md:w-[90%] text-center">
              Choisissez le plan qui correspond à vos besoins et à la taille de
              votre activité. Que vous débutiez ou que vous soyez en pleine
              croissance, Vente+ évolue avec vous. Commencez dès aujourd’hui et
              faites passer votre commerce à un autre niveau.
            </div>
            <Button className="mt-5 bg-[#F39C12]">Commencer</Button>
          </div>
        </div>
      </section>
      <section className="w-full pb-10 ">
        <div className="max-w-[80%] mx-auto">
          <div className="column w-full flex flex-wrap justify-center gap-y-5 lg:justify-between pt-20 text-start">
            <div className="column-img w-[450px] h-[650px] flex flex-col justify-between mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-[#F39C12]">
              <div className="p-6">
                <h2 className="text-3xl font-bold">Gratuit</h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-600">/mois</span>
                </div>
                <p className="mt-2 text-gray-700 text-lg leading-relaxed">
                  Démarrez votre activité sans frais et découvrez les
                  fonctionnalités essentielles pour gérer vos ventes au
                  quotidien.
                </p>
              </div>

              <div className="border-t border-gray-200"></div>

              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <IoCheckmark /> Enregistrement des ventes et produits
                  </li>
                  <li className="flex items-center gap-3">
                    <IoCheckmark /> Suivi basique du stock
                  </li>
                  <li className="flex items-center gap-3">
                    <IoCheckmark /> Gestion des clients et dettes
                  </li>
                  <li className="flex items-center gap-3">
                    <IoCheckmark /> Tableau de bord simplifié
                  </li>
                  <li className="flex items-center gap-3">
                    <IoCheckmark /> Accès mobile et ordinateur
                  </li>
                </ul>
              </div>

              <div className="border-t border-gray-200"></div>

              <div className="p-6">
                <button className="w-full bg-[#F39C12] hover:bg-white border hover:text-[#F39C12] hover:border-[#F39C12] text-white font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Commencer Gratuitement
                </button>
              </div>
            </div>
            <div className="column-img w-[450px] h-[650px] flex flex-col justify-between mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-[#F39C12]">
              <div className="p-6">
                <h2 className="text-3xl font-bold">Pro</h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    $9.99
                  </span>
                  <span className="text-gray-600">/mois</span>
                </div>
                <p className="mt-2 text-gray-700 text-lg leading-relaxed">
                  Une solution complète pour les commerces en expansion.
                  Automatisez vos tâches et suivez vos performances en temps
                  réel.
                </p>
              </div>

              <div className="border-t border-gray-200"></div>

              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <IoCheckmark /> Toutes les fonctions du plan Gratuit
                  </li>
                  <li className="flex items-center gap-3">
                    <IoCheckmark /> Gestion des fournisseurs et commandes
                  </li>
                  <li className="flex items-center gap-3">
                    <IoCheckmark /> Rapports et statistiques détaillés
                  </li>
                  <li className="flex items-center gap-3">
                    <IoCheckmark /> Facturation automatique (PDF)
                  </li>
                  <li className="flex items-center gap-3">
                    <IoCheckmark /> Support prioritaire
                  </li>
                </ul>
              </div>

              <div className="border-t border-gray-200"></div>

              <div className="p-6">
                <button className="w-full bg-[#F39C12] hover:bg-white border hover:text-[#F39C12] hover:border-[#F39C12] text-white font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Passer au plan Pro
                </button>
              </div>
            </div>
            <div className="column-img w-[450px] h-[650px] flex flex-col justify-between mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-[#F39C12]">
              <div className="p-6">
                <h2 className="text-3xl font-bold">Premium</h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    $19.99
                  </span>
                  <span className="text-gray-600">/mois</span>
                </div>
                <p className="mt-2 text-gray-700 text-lg leading-relaxed">
                  Le pack tout-en-un pour une gestion avancée. Bénéficiez d’un
                  suivi intelligent, d’une boutique en ligne et d’un
                  accompagnement dédié.
                </p>
              </div>

              <div className="border-t border-gray-200"></div>

              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <IoCheckmark /> Toutes les fonctions du plan Pro
                  </li>
                  <li className="flex items-center gap-3">
                    <IoCheckmark /> Boutique e-commerce intégrée
                  </li>
                  <li className="flex items-center gap-3">
                    <IoCheckmark /> Gestion multi-utilisateurs
                  </li>
                  <li className="flex items-center gap-3">
                    <IoCheckmark /> Sauvegarde automatique et cloud
                  </li>
                  <li className="flex items-center gap-3">
                    <IoCheckmark /> Assistance technique dédiée
                  </li>
                </ul>
              </div>

              <div className="border-t border-gray-200"></div>

              <div className="p-6">
                <button className="w-full bg-[#F39C12] hover:bg-white border hover:text-[#F39C12] hover:border-[#F39C12] text-white font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Choisir Premium
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default pricing;

