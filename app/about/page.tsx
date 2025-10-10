import { Button } from "@/components/ui/button";
import React from "react";
import Shop1 from "@/assets/images/shopves1.jpg";
import Link from "next/link";
import Profile1 from "@/assets/images/profile6.jpg";
import Profile2 from "@/assets/images/profile2.jpg";
import Profile3 from "@/assets/images/profile3.jpg";
import Profile4 from "@/assets/images/profile5.jpg";
import Profile from "@/assets/images/maskProfil.jpg";
import "@/style/style.scss";
import {FaLaptop, FaSeedling, FaShoppingCart } from "react-icons/fa";
const about = () => {
  return (
    <div>
      <section id="feat_location" className="w-full py-[70] mt-[80] ">
        <div className="max-w-[80%] mx-auto">
          <div className="w-full flex flex-col justify-center items-center text-center py-10">
            <div className="font-medium text-sm text-[orangered]">
              BIENVENUE SUR À PROPOS
            </div>
            <h1 className="font-medium">À Propos</h1>
            <div className="text-lg text-[#2C3E50] lg:w-[50%] md:w-[90%] text-center">
              Vente+ est une solution pensée pour accompagner les commerçants
              dans leur transformation digitale. Notre mission : rendre la
              gestion commerciale simple, accessible et performante. Ensemble,
              digitalisons le commerce de proximité.
            </div>
            <Link href="/register">
              {" "}
              <Button className="mt-5 bg-[#F39C12]">Devenir partenaire</Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-[#F4F4F4] py-10 my-5 ">
        <div className="max-w-[80%] mx-auto">
          <div className="column w-full text-start flex  items-center justify-between   ">
            <div className="column-text center-text w-[25%]">
              <h2 className="text-5xl text-[#1c1c1c] font-semibold">
                Nos Objectifs, Votre Réussite
              </h2>
            </div>

            <div className="column column-img card_list flex items-center gap-8">
              <div className="column-text card_item bg-[#1c1c1c] text-white w-[350px] h-[150px] flex flex-col items-center justify-center rounded-lg gap-2 cursor-pointer hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] transition-shadow">
                <FaLaptop className="text-5xl" />
                <p className="text-xl">Digitaliser les petits commerces</p>
              </div>

              <div className="column-text card_item bg-[#1c1c1c] text-white w-[350px] h-[150px] flex flex-col items-center justify-center rounded-lg gap-2 cursor-pointer hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] transition-shadow">
                <FaShoppingCart className="text-5xl" />
                <p className="text-xl">Dynamiser la gestion des ventes</p>
              </div>

              <div className="column-text card_item bg-[#1c1c1c] text-white w-[350px] h-[150px] flex flex-col items-center justify-center rounded-lg gap-2 cursor-pointer hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] transition-shadow">
                <FaSeedling className="text-5xl" />
                <p className="text-xl">Favoriser la croissance locale</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-25 mt-10">
        <div className="max-w-[80%] mx-auto">
          <div className="w-full flex flex-col justify-center items-center text-center gap-y-20">
            <h2 className="text-4xl font-bold">Notre Mission et Vision</h2>
            <div className="column-reverse  w-full flex gap-x-[30px]">
              <div className="column-img res-card-padding w-[60%] text-start pt-[40px] pr-[100px] pb-[40px] pl-[40px] bg-[#000000] text-white ">
                <h2 className="text-[30px]">Mission</h2>
                <p className="text-xl">
                  Notre mission est d’accompagner les entreprises dans leur
                  transformation digitale en leur offrant des solutions de
                  gestion simples, performantes et accessibles. Nous visons à
                  optimiser leurs opérations quotidiennes, à renforcer leur
                  visibilité en ligne et à favoriser leur croissance durable
                  grâce à des outils technologiques innovants.
                </p>
              </div>
              <div className="column-img res-card-position w-[50%] text-start p-[40px] relative top-20 right-24 bg-[#F39C12] text-white">
                <h2 className="text-[30px]">Vision</h2>
                <p className="text-xl">
                  Devenir une référence en matière de digitalisation des
                  entreprises en Afrique, en construisant un écosystème où la
                  technologie simplifie la gestion, stimule la productivité et
                  crée de nouvelles opportunités pour chaque acteur économique.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-25 mt-10">
        <div className="max-w-[80%] mx-auto">
          <div className="w-full flex flex-col justify-center items-center gap-y-15">
            <div className="value-col flex flex-row items-center justify-between">
              <div className="value-text flex flex-col w-[60%]">
                <h2 className="text-4xl font-bold">
                  Les Valeurs qui nous tiennent à coeur
                </h2>
                <div className="text-lg mt-2 text-gray-500">
                  Nos valeurs reposent sur la fiabilité, la transparence et
                  l’innovation. Chaque fonctionnalité de Vente+ est pensée pour
                  soutenir durablement la réussite des commerçants.
                </div>
              </div>

              <Link href="/register">
                <Button className="bg-transparent border-2 border-[#000] text-gray-600 hover:bg-[#000] cursor-pointer hover:text-white rounded-3xl text-sm md:text-base lg:text-lg py-2 px-4 md:py-3 md:px-6 transition-all">
                  Accompagnez nous
                </Button>
              </Link>
            </div>

            <div className="column-img w-full flex flex-col gap-x-[30px] items-center text-start ">
              <div
                className="column-img w-full  h-[500px] relative rounded-2xl overflow-hidden bg-cover bg-top bg-no-repeat"
                style={{ backgroundImage: `url(${Shop1.src})` }}
              ></div>
              <div className="column w-full flex flex-row justify-between pt-15">
                <div className="column-img value-card bg-slate-100 text-gray-500 w-[500px] h-[200px] flex flex-col items-start justify-center p-5 rounded-lg gap-2 cursor-pointer hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] transition-shadow">
                  <h3 className="text-xl font-bold text-[#F39C12]">
                    Simplicité
                  </h3>
                  <p className="text-xl">
                    Vente+ est conçue pour être intuitive et accessible à tous.
                    Même sans compétences techniques, chaque commerçant peut
                    facilement enregistrer ses ventes, suivre ses stocks et
                    gérer son activité en toute autonomie.
                  </p>
                </div>
                <div className="column-img value-card bg-slate-100 text-gray-500 w-[500px] h-[200px] flex flex-col items-start justify-between p-5 rounded-lg gap-2 cursor-pointer hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] transition-shadow">
                  <h3 className="text-xl font-bold text-[#F39C12]">
                    Fiabilité
                  </h3>
                  <p className="text-xl">
                    Nos outils garantissent la sécurité et la précision de vos
                    données. Fini les pertes d’informations ou les erreurs de
                    calcul vous pouvez suivre l’évolution de votre commerce en
                    toute confiance.
                  </p>
                </div>
                <div className="column-img value-card bg-slate-100 text-gray-500 w-[500px] h-[200px] flex flex-col items-start justify-center p-5  rounded-lg gap-2 cursor-pointer hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] transition-shadow">
                  <h3 className="text-xl font-bold text-[#F39C12]">
                    Croissance
                  </h3>
                  <p className="text-xl">
                    Vente+ accompagne chaque commerçant dans le développement de
                    son activité. En optimisant la gestion quotidienne, la
                    plateforme vous aide à augmenter vos revenus, fidéliser vos
                    clients et élargir votre visibilité en ligne.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full pb-25 mt-10">
        <div className="max-w-[80%] mx-auto">
          <div className="w-full flex flex-col justify-center items-center gap-y-5">
            <h2 className="text-4xl font-bold">Notre Équipe</h2>
            <div className="flex lg:w-[50%] md:w-[90%]">
              <p className="text-center text-lg  text-gray-500">
                Notre équipe, jeune et innovante, met la technologie au service
                de votre succès. Nous croyons qu’un bon outil commence par une
                bonne écoute des besoins réels des commerçants. Chez Vente+,
                nous construisons chaque jour l’avenir du commerce connecté.
              </p>
            </div>

            <div className="w-full flex flex-col gap-x-[30px] items-center text-start pt-5 ">
              <div
                className="w-full  h-[500px] relative rounded-2xl flex flex-col justify-center overflow-hidden bg-cover bg-center  bg-no-repeat"
                style={{ backgroundImage: `url(${Profile.src})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/50 to-transparent" />
                <div className="column-img team-position absolute bottom-20 left-10 px-10 w-[40%] flex flex-col gap-5">
                  <p className="text-white z-10 font-semibold text-3xl">
                    Ensemble, nous innovons pour faire grandir vos ambitions
                  </p>
                  <Link href="/contact">
                    <Button className="bg-transparent border-1 border-[#FFF] text-white hover:bg-[#FFF] hover:text-[#000] cursor-pointer rounded-3xl text-sm md:text-base lg:text-lg py-2 px-4 md:py-3 md:px-6 transition-all">
                      Rejoignez nous
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="column w-full flex flex-row justify-between pt-15">
                <div className="column-img text-black w-[350px] border border-gray-200 flex flex-col rounded-lg gap-2 cursor-pointer hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] transition-shadow">
                  <div
                    className="w-full h-[400px] px-5 pb-5 flex flex-col justify-end bg-cover bg-center bg-no-repeat rounded-lg"
                    style={{ backgroundImage: `url(${Profile1.src})` }}
                  >
                    {" "}
                    <div className="p-2 bg-white flex flex-row items-center justify-between rounded-lg">
                      <div className="flex flex-col w-[60%]">
                        <h2 className="text-lg font-bold">Amra Detch</h2>
                        <div className="text-sm">Développeur full-stack</div>
                      </div>

                      <Link href="/register"></Link>
                    </div>
                  </div>
                </div>
                <div className="column-img text-black w-[350px] border border-gray-200 flex flex-col rounded-lg gap-2 cursor-pointer hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] transition-shadow">
                  <div
                    className="w-full h-[400px] px-5 pb-5 flex flex-col justify-end bg-cover bg-center bg-no-repeat rounded-lg"
                    style={{ backgroundImage: `url(${Profile2.src})` }}
                  >
                    {" "}
                    <div className="p-2 bg-white flex flex-row items-center justify-between rounded-lg">
                      <div className="flex flex-col w-[60%]">
                        <h2 className="text-lg font-bold">Amra Detch</h2>
                        <div className="text-sm">Développeur full-stack</div>
                      </div>

                      <Link href="/register"></Link>
                    </div>
                  </div>
                </div>
                <div className="column-img text-black w-[350px] border border-gray-200 flex flex-col rounded-lg gap-2 cursor-pointer hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] transition-shadow">
                  <div
                    className="w-full h-[400px] px-5 pb-5 flex flex-col justify-end bg-cover bg-center bg-no-repeat rounded-lg"
                    style={{ backgroundImage: `url(${Profile3.src})` }}
                  >
                    {" "}
                    <div className="p-2 bg-white flex flex-row items-center justify-between rounded-lg">
                      <div className="flex flex-col w-[60%]">
                        <h2 className="text-lg font-bold">Amra Detch</h2>
                        <div className="text-sm">Développeur full-stack</div>
                      </div>

                      <Link href="/register"></Link>
                    </div>
                  </div>
                </div>
                <div className="column-img text-black w-[350px] border border-gray-200 flex flex-col rounded-lg gap-2 cursor-pointer hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] transition-shadow">
                  <div
                    className="w-full h-[400px] px-5 pb-5 flex flex-col justify-end bg-cover bg-center bg-no-repeat rounded-lg"
                    style={{ backgroundImage: `url(${Profile4.src})` }}
                  >
                    {" "}
                    <div className="p-2 bg-white flex flex-row items-center justify-between rounded-lg">
                      <div className="flex flex-col w-[60%]">
                        <h2 className="text-lg font-bold">Amra Detch</h2>
                        <div className="text-sm">Développeur full-stack</div>
                      </div>

                      <Link href="/register"></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default about;
