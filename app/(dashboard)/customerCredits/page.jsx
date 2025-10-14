"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { customerCredits } from "./customerCreditsStore/customerCreditsStore";
import { gsap } from "gsap";
import { MdOutlineMoreVert, MdSearch } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMdClose } from "react-icons/io";
export default function CustomerCredits() {
  const { customersCredits, fetchData } = customerCredits();
  const container = useRef(null);
  const timeLineModal = useRef();

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      timeLineModal.current = gsap
        .timeline()
        .to(".modal_container", {
          opacity: 1,
          duration: 0.5,
        })
        .to(
          ".form_container",
          {
            xPercent: -200,
            duration: 0.5,
          },
          "-=0.5"
        )
        .paused(true);
    }, [container]);

    return () => {
      context.revert();
    };
  }, [container]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div ref={container} className="w-full h-full p-5 bg-gray-50 rounded-xl">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold ">Dettes Clients</h2>
          <p className="text-gray-500 text-xl pt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis, reprehenderit.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full flex flex-row items-start justify-between mt-20">
          <h2 className="text-2xl font-semibold ">Listes des Dettes Clients</h2>
          <div className="w-[50%] flex flex-row items-center justify-center gap-x-4">
            <div className="w-[40%] relative flex items-center justify-between bg-white gap-x-2 rounded-lg">
              <input
                type="text"
                placeholder="Recherche par nom"
                className="bg-white text-sm py-3 pl-2 outline-hidden rounded-lg focus:outline-none  transition-all"
              />
              <button className="py-3 bg-[#F39C12] text-white rounded-tr-lg rounded-br-lg cursor-pointer px-4">
                <MdSearch size={25} />
              </button>
            </div>
            <div className="w-[60%] flex flex-row gap-x-4 items-center">
              <input
                type="date"
                name=""
                id=""
                className="border border-[#F39C12] py-3 px-4 rounded-lg"
              />
              <button
                onClick={() => {
                  timeLineModal.current.play();
                }}
                className="bg-[#F39C12] cursor-pointer py-3 px-4 text-white rounded-lg"
              >
                Nouvelle Dette
              </button>
            </div>
          </div>
        </div>
        <div className="w-[95%] overflow-x-auto pb-10 mt-5 bg-white">
          <table className="min-w-full text-xl">
            <thead className=" text-black bg-gray-100  ">
              <tr className="border-b border-gray-200 text-left">
                <th className="p-5">Client</th>
                <th className="p-5">Téléphone</th>
                <th className="p-5">Produit</th>
                <th className="p-5">Quantité</th>
                <th className="p-5 ">Unité(FCFA)</th>
                <th className="p-5 ">Total(FCFA)</th>
                <th className="p-5 ">Status</th>
                <th className=""></th>
              </tr>
            </thead>
            <tbody>
              {customersCredits.map((credit) => (
                <tr
                  key={credit.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-5 font-bold">{credit.client}</td>
                  <td className="px-5 py-5 text-black">{credit.phoneNumber}</td>
                  <td className="px-5 py-5">{credit.product}</td>
                  <td className="px-5 py-5">{credit.quantity}</td>
                  <td className="px-5 py-5 font-medium text-gray-700">
                    {credit.unitPrice}
                  </td>
                  <td className="px-5 py-5 font-medium text-gray-700">
                    {credit.totalPrice}
                  </td>
                  <td
                    className={`px-5 py-5 font-medium text-gray-700 ${
                      credit.status.toLocaleLowerCase() === "non payée"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {credit.status}
                  </td>
                  <td className="pr-5">
                    {" "}
                    <DropdownMenu>
                      <DropdownMenuTrigger className="border border-transparent focus:border focus:border-transparent active:border active:border-transparent">
                        <MdOutlineMoreVert />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40 border border-transparent">
                        <DropdownMenuLabel className="text-xl">
                          Actions
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-lg">
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-lg">
                          Valider
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-lg">
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        style={{ pointerEvents: "none", opacity: 0 }}
        className={`modal_container w-full h-full fixed top-0 right-0 bg-black/30`}
      >
        <div
          style={{ transform: "translateX(200%)", pointerEvents: "all" }}
          className={`form_container flex flex-col items-start gap-y-10 bg-white w-110 p-5 rounded-xl h-[96vh] absolute top-5 right-3 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden `}
        >
          <button
            onClick={() => {
              timeLineModal.current.reversed(true);
            }}
          >
            <IoMdClose size={35} />
          </button>
          <div className="w-full">
            <h3 className="text-xl text-[#F39C12] font-bold text-center">
              Ajouter une nouvelle dette
            </h3>
            <div className="w-full space-y-6 py-10">
              <div className="w-full flex flex-col gap-y-2">
                <label htmlFor="">Nom du client</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                  placeholder="Entrer le nom du client"
                />
              </div>
              <div className="w-full flex flex-col gap-y-2">
                <label htmlFor="">Téléphone</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                  placeholder="Entrer le numéro de téléphone"
                />
              </div>
              <div className="w-full flex flex-col gap-y-2">
                <label htmlFor="">Produit acheté</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                  placeholder="Entrer le nom du produit"
                />
              </div>
              <div className="w-full flex flex-col gap-y-2">
                <label htmlFor="">Quantité</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                  placeholder="quantité achetée"
                />
              </div>
              <div className="w-full flex flex-col gap-y-2">
                <label htmlFor="">Prix Unitaire</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                  placeholder="prix unitaire"
                />
              </div>

              <button className="auth-btn w-full mt-5 bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d5850c] focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:ring-offset-2 transition-all shadow-lg">
                Enrégistrer la dette
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
