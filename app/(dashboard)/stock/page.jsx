"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { stockStore } from "./stockStore/stockStore";
import { gsap } from "gsap";
import { IoMdClose } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdOutlineMoreVert, MdSearch } from "react-icons/md";

export default function Stock() {
  const { stocks, fetchData } = stockStore();
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
          <h2 className="text-2xl font-bold ">Gestion de Stocks</h2>
          <p className="text-gray-500 text-xl pt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis, reprehenderit.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full flex flex-row items-start justify-between mt-20">
          <h2 className="text-2xl font-semibold ">Listes des Stocks</h2>
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
                Nouveau Stock
              </button>
            </div>
          </div>
        </div>
        <div className="w-[95%] overflow-x-auto pb-10 mt-5 bg-white">
          <table className="min-w-full text-xl  ">
            <thead className=" text-black bg-gray-100">
              <tr className="border-b border-gray-200 text-left">
                <th className="p-5">N°</th>
                <th className="p-5">Nom du stock</th>
                <th className="p-5">Produit</th>
                <th className="p-5">Quantité disponible</th>
                <th className="p-5 ">Quantité Minimale</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr
                  key={stock.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-5">{stock.id}</td>
                  <td className="p-5 font-bold">{stock.stockName}</td>
                  <td className="p-5">{stock.product}</td>
                  <td className="p-5">{stock.qteInStock}</td>
                  <td className="p-5">{stock.minQte}</td>
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
              Ajouter un nouveau stock
            </h3>
            <div className="w-full space-y-6 py-10">
              <div className="w-full flex flex-col gap-y-2">
                <label htmlFor="">Nom du Stock</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                  placeholder="Entrer le nom du stock"
                />
              </div>
              <div className="w-full flex flex-col gap-y-2">
                <label htmlFor="">Nom du produit</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                  placeholder="Entrer le nom du produit"
                />
              </div>
              <div className="w-full flex flex-col gap-y-2">
                <label htmlFor="">Quantité Disponible</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                  placeholder="Entrer la quantité de produit disponible"
                />
              </div>
              <div className="w-full flex flex-col gap-y-2">
                <label htmlFor="">Quantité Minimale</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                  placeholder="Entrer la quantité de produit minimale"
                />
              </div>

              <button className="auth-btn w-full mt-5 bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d5850c] focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:ring-offset-2 transition-all shadow-lg">
                Enrégistrer le stock
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
