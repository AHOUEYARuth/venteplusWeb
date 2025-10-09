"use client";
import React from "react";
import { contactStore } from "./contactStore/contactStore";
//import Hero from "@/components/layout/Hero";
import "@/style/style.scss";
const contact = () => {
  const { name, firstName, getFullName } = contactStore();

  return (
    <div>
      <section id="feat_location" className="w-full py-[70] mt-[80] ">
        <div className="max-w-[80%] mx-auto">
          <div className="w-full flex flex-col justify-center items-center  text-center py-10">
            <div className="font-medium text-sm text-[orangered]">
              BIENVENUE SUR CONTACT
            </div>
            <h1 className="font-medium">Nous-contactez</h1>
            <div className="text-lg text-[#2C3E50] w-[50%] text-center">
              Vente+ est une solution pensée pour accompagner les commerçants
              dans leur transformation digitale. Notre mission : rendre la
              gestion commerciale simple, accessible et performante. Ensemble,
              digitalisons le commerce de proximité.
            </div>
            <div className="column-reverse  w-full text-start flex  items-center justify-between pt-20 ">
              <div className="auth-btn w-[45%] h-[500px] bg-[#F9FAFB] rounded-xl flex flex-col justify-center items-start p-10">
                <h3 className="text-2xl font-semibold mb-6 text-[#F39C12]">
                  Nos coordonnées
                </h3>

                <p className="text-gray-700 mb-4">
                  Vous pouvez également nous contacter directement :
                </p>

                <div className="space-y-6 text-gray-800 text-lg">
                  <div>
                    <p className="font-semibold text-[#F39C12]"> Email</p>
                    <p>contact@venteplus.com</p>
                  </div>

                  <div>
                    <p className="font-semibold text-[#F39C12]">Téléphone</p>
                    <p>+229 62 00 45 78</p>
                  </div>

                  <div>
                    <p className="font-semibold text-[#F39C12]"> Adresse</p>
                    <p>Cotonou, Bénin</p>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-gray-600 text-lg">
                    Disponible du lundi au vendredi de 8h à 18h.
                  </p>
                </div>
              </div>
              <div className="custom-box w-[50%] overflow-full w-hidden border border-gray-300 rounded-lg">
                <div className="p-8">
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                      placeholder="Votre nom complet"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Adresse e-mail
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Écrivez votre message ici..."
                    ></textarea>
                  </div>

                  <button className="auth-btn w-[50%] bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d5850c] focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:ring-offset-2 transition-all shadow-lg">
                    Envoyer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default contact;
