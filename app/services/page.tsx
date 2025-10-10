"use client";
import React from "react";
import { servicesStore } from "./servicesStore/servicesStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Service1 from "@/assets/images/serviceCredit1.jpg"; 
import Service2 from "@/assets/images/serviceFacture.jpg"; 
import Service3 from "@/assets/images/serviceStat1.jpg"; 
import Service4 from "@/assets/images/sec1.jpg"; 
import "@/style/style.scss";

const services = () => {
  const { name, description, showService } = servicesStore();
  return (
    <div>
      <section id="feat_location" className="w-full py-[70] mt-[80] ">
        <div className="max-w-[80%] mx-auto">
          <div className="w-full flex flex-col justify-center items-center text-center py-10">
            <div className="font-medium text-sm text-[orangered]">
              BIENVENUE SUR SERVICE
            </div>
            <h1 className="font-medium">Nos Services</h1>
            <div className="text-lg text-[#2C3E50] lg:w-[50%] md:w-[90%] text-center">
              Découvrez l’ensemble des solutions que Vente+ met à votre
              disposition pour booster la performance de votre commerce. De la
              gestion des ventes au suivi du stock, tout est pensé pour
              simplifier votre quotidien. Adoptez une gestion moderne, rapide et
              efficace.
            </div>
            <Link href="/register">
              {" "}
              <Button className="mt-5 bg-[#F39C12] text-lg">Commencer</Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full bg-white pb-[40] sm:px-6 lg:px-8 my-3">
        <div className="max-w-[80%] mx-auto">
          <div className="list w-full flex flex-col items-start gap-y-25 ">
            <div className="column item w-full flex  items-center justify-between">
              <div
                className="column-img w-[45%] h-[450px] relative rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${Service1.src})` }}
              ></div>
              <div className="column-text w-[40%] h-[300px] flex flex-col items-start justify-between rounded-xl text-start">
                <span className="text-5xl font-bold text-[#F39C12]">01</span>
                <h3 className="text-3xl text-[#2C3E50] font-semibold">
                  Gestion Crédits Clients
                </h3>
                <p className="text-xl text-gray-700">
                  Gardez le contrôle sur les paiements différés. Enregistrez,
                  suivez et relancez vos clients en toute transparence grâce à
                  un système de gestion des crédits intégré.
                </p>
                <div className=" flex items-center justify-start gap-x-5 text-xl text-[#F39C12] p-px ">
                  <Link href="/register" className="">
                    Commencer{" "}
                  </Link>
                  <FaArrowRight />
                </div>
              </div>
            </div>

            <div className="column-reverse item w-full flex items-center justify-between">
              <div className="column-text w-[40%] h-[300px] flex flex-col items-start justify-between rounded-xl text-start">
                <span className="text-5xl font-bold text-[#F39C12]">02</span>
                <h3 className="text-3xl text-[#2C3E50] font-semibold">
                  Facturation et Reçus Automatisés
                </h3>
                <p className="text-xl text-gray-700">
                  Gardez le contrôle sur les paiements différés. Enregistrez,
                  suivez et relancez vos clients en toute transparence grâce à
                  un système de gestion des crédits intégré.
                </p>
                <div className=" flex items-center justify-start gap-x-5 text-xl text-[#F39C12] p-px ">
                  <Link href="/register" className="">
                    Commencer{" "}
                  </Link>
                  <FaArrowRight />
                </div>
              </div>
              <div
                className="column-img w-[45%] h-[450px] relative rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${Service2.src})` }}
              ></div>
            </div>

            <div className="column item w-full flex items-center justify-between ">
              <div
                className="column-img w-[45%] h-[450px] relative rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${Service3.src})` }}
              ></div>
              <div className="column-text w-[40%] h-[300px] flex flex-col items-start justify-between rounded-xl text-start">
                <span className="text-5xl font-bold text-[#F39C12]">03</span>
                <h3 className="text-3xl text-[#2C3E50] font-semibold">
                  Analyse et Statistiques Avancées
                </h3>
                <p className="text-xl text-gray-700">
                  Prenez des décisions éclairées grâce à des rapports détaillés.
                  Analysez vos ventes, identifiez les tendances et anticipez vos
                  besoins en un coup d’œil.
                </p>
                <div className=" flex items-center justify-start gap-x-5 text-xl text-[#F39C12] p-px ">
                  <Link href="/register" className="">
                    Commencer{" "}
                  </Link>
                  <FaArrowRight />
                </div>
              </div>
            </div>

            <div className="column-reverse item w-full flex litems-center justify-between ">
              <div className="column-text w-[40%] h-[300px] flex flex-col items-start justify-between rounded-xl text-start">
                <span className="text-5xl font-bold text-[#F39C12]">04</span>
                <h3 className="text-3xl text-[#2C3E50] font-semibold">
                  Boutique Virtuelle
                </h3>
                <p className="text-xl text-gray-700">
                  Automatisez vos opérations comptables et gardez une vision
                  claire de vos finances. Suivez vos dépenses, vos marges et vos
                  bénéfices en toute simplicité.
                </p>
                <div className=" flex items-center justify-start gap-x-5 text-xl text-[#F39C12] p-px ">
                  <Link href="/register" className="">
                    Commencer{" "}
                  </Link>
                  <FaArrowRight />
                </div>
              </div>
              <div
                className="column-img w-[45%] h-[400px] relative rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${Service4.src})` }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default services;
