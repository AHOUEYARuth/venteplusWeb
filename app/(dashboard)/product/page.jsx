"use client";
import { Button } from "@/components/ui/button";
import React, { useLayoutEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {gsap} from "gsap"
import Product2 from "@/assets/images/product10.jpg";
import Product3 from "@/assets/images/product3.png";
import Product1 from "@/assets/images/product9.png";
import Product4 from "@/assets/images/product2.png";
import Product5 from "@/assets/images/product6.png";
import { GrFavorite } from "react-icons/gr";
import { TiShoppingCart } from "react-icons/ti";
import { productStore } from "./productStore/productStore";
import { IoAccessibility } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";

const Product = () => {
  const container = useRef(null);
  const timeLineModal = useRef();
  const [coverImg, setcoverImg] = useState(null)
  const [payloadImg, setpayloadImg] = useState(null)
 useLayoutEffect(() => {
   const context = gsap.context(() => {
     timeLineModal.current = gsap
       .timeline()
       .to(".modal_container", {
         opacity:1,
         duration:0.5
       })
       .to(".form_container", {
         xPercent: -200,
         duration: 0.5,
       },"-=0.5")
       .paused(true);
     }, [container])

   return () => {
     context.revert();
   }
 }, [container])
 
  function previewCoverImage(e) {
    setcoverImg(URL.createObjectURL(e.target.files[0]));
    setpayloadImg(e.target.files[0]);
  }

  return (
    <div
      ref={container}
      className="w-full h-full p-5 bg-gray-50 rounded-xl overflow-hidden"
    >
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold ">Produits</h2>
          <p className="text-gray-500 text-xl pt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis, reprehenderit.
          </p>
        </div>
        <div className="flex items-center gap-x-5">
          <Button
            onClick={() => {
              timeLineModal.current.play();
            }}
            className="bg-[#F39C12] cursor-pointer"
          >
            Nouveau Produit
          </Button>
          <Button className="bg-transparent cursor-pointer text-[#F39C12] border border-[#F39C12] hover:bg-[#F39C12] hover:text-white">
            Modifier un Produit
          </Button>
        </div>
      </div>
      <div className="w-full mt-8 flex items-center justify-between">
        <div className="w-[30%] relative flex items-center justify-between bg-white gap-x-2 rounded-lg">
          <input
            type="text"
            placeholder="Recherche par nom"
            className="text-xl py-3 pl-4 outline-hidden rounded-lg focus:outline-none  transition-all"
          />
          <button className="py-3 bg-[#F39C12] text-white rounded-tr-lg rounded-br-lg cursor-pointer px-5">
            Rechercher
          </button>
        </div>
        <div className="w-[50%] flex items-center justify-between">
          <div className="flex flex-row gap-x-5 items-center ">
            <label htmlFor="" className="text-lg">
              Filtrer par date :{" "}
            </label>
            <input
              type="date"
              name=""
              id=""
              className="border border-[#F39C12] py-2 px-4 rounded-lg"
            />
          </div>
          <Select>
            <SelectTrigger className="w-[200px] py-5 outline-none focus:outline-none border border-[#F39C12]">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="coton">Coton</SelectItem>
              <SelectItem value="cuir">Cuir</SelectItem>
              <SelectItem value="soie">Soie</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="py-8 mt-10">
        <h2 className="text-2xl font-bold mb-5">Liste des Produits</h2>
        <div className="w-full flex flex-row flex-wrap items-center justify-between gap-y-4">
          <div className="shop-item w-70 flex flex-col gap-5 bg-white rounded-2xl p-3 relative shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="w-full bg-gray-300 flex flex-col gap-5 rounded-tl-xl rounded-2xl">
              <div
                className="w-full h-[250px] bg-center bg-cover bg-no-repeat rounded-2xl"
                style={{ backgroundImage: `url(${Product2.src})` }}
              >
                <div>
                  <div className="w-full flex items-center justify-between pt-2 px-2 ">
                    <div className="flex flex-row gap-2 text-white items-center justify-between p-2 bg-black rounded-md font-bold">
                      <TiShoppingCart size={20} />
                      <span className="text-lg font-black">21</span>
                    </div>
                    <button className="w-[40px] h-[40px]  text-xl flex items-center justify-center bg-black text-white rounded-full cursor-pointer ">
                      <GrFavorite className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-2 flex flex-col gap-2">
              <p className="text-base">
                <span className="text-[#F39C12] font-semibold text-2xl">
                  Tee-Shirt
                </span>
              </p>

              <p className="font-medium text-lg text-gray-500">
                Lorem ipsum dolor sit amet consectetu amet consectetu..
              </p>
            </div>
            <div className="px-2 flex items-center justify-between gap-4 text-sm text-gray-700">
              <h3 className="text-2xl font-semibold">$10</h3>
              <button className="bg-[#F39C12] text-white text-xl py-2 px-4 rounded-xl cursor-pointer">
                <h3>
                  Prix d&apos;achat : <span className="font-bold">$8</span>
                </h3>
              </button>
            </div>
          </div>
          <div className="shop-item w-70 flex flex-col gap-5 bg-white rounded-2xl p-3 relative shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="w-full bg-gray-300 flex flex-col gap-5 rounded-tl-xl rounded-2xl">
              <div
                className="w-full h-[250px] bg-center bg-cover bg-no-repeat rounded-2xl"
                style={{ backgroundImage: `url(${Product3.src})` }}
              >
                <div>
                  <div className="w-full flex items-center justify-between pt-2 px-2 ">
                    <div className="flex flex-row gap-2 text-white items-center justify-between p-2 bg-black rounded-md font-bold">
                      <TiShoppingCart size={20} />
                      <span className="text-lg font-black">21</span>
                    </div>
                    <button className="w-[40px] h-[40px]  text-xl flex items-center justify-center bg-black text-white rounded-full cursor-pointer ">
                      <GrFavorite className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-2 flex flex-col gap-2">
              <p className="text-base">
                <span className="text-[#F39C12] font-semibold text-2xl">
                  Pull-over
                </span>
              </p>

              <p className="font-medium text-lg text-gray-500">
                Lorem ipsum dolor sit amet consectetu amet consectetu..
              </p>
            </div>
            <div className="px-2 flex items-center justify-between gap-4 text-sm text-gray-700">
              <h3 className="text-2xl font-semibold">$10</h3>
              <button className="bg-[#F39C12] text-white text-xl py-2 px-4 rounded-xl cursor-pointer">
                <h3>
                  Prix d&apos;achat : <span className="font-bold">$8</span>
                </h3>
              </button>
            </div>
          </div>
          <div className="shop-item w-70 flex flex-col gap-5 bg-white rounded-2xl p-3 relative shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="w-full bg-gray-300 flex flex-col gap-5 rounded-tl-xl rounded-2xl">
              <div
                className="w-full h-[250px] bg-center bg-cover bg-no-repeat rounded-2xl"
                style={{ backgroundImage: `url(${Product1.src})` }}
              >
                <div>
                  <div className="w-full flex items-center justify-between pt-2 px-2 ">
                    <div className="flex flex-row gap-2 text-white items-center justify-between p-2 bg-black rounded-md font-bold">
                      <TiShoppingCart size={20} />
                      <span className="text-lg font-black">21</span>
                    </div>
                    <button className="w-[40px] h-[40px]  text-xl flex items-center justify-center bg-black text-white rounded-full cursor-pointer ">
                      <GrFavorite className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-2 flex flex-col gap-2">
              <p className="text-base">
                <span className="text-[#F39C12] font-semibold text-2xl">
                  Tee-Shirt
                </span>
              </p>

              <p className="font-medium text-lg text-gray-500">
                Lorem ipsum dolor sit amet consectetu amet consectetu..
              </p>
            </div>
            <div className="px-2 flex items-center justify-between gap-4 text-sm text-gray-700">
              <h3 className="text-2xl font-semibold">$10</h3>
              <button className="bg-[#F39C12] text-white text-xl py-2 px-4 rounded-xl cursor-pointer">
                <h3>
                  Prix d&apos;achat : <span className="font-bold">$8</span>
                </h3>
              </button>
            </div>
          </div>
          <div className="shop-item w-70 flex flex-col gap-5 bg-white rounded-2xl p-3 relative shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="w-full bg-gray-300 flex flex-col gap-5 rounded-tl-xl rounded-2xl">
              <div
                className="w-full h-[250px] bg-center bg-cover bg-no-repeat rounded-2xl"
                style={{ backgroundImage: `url(${Product4.src})` }}
              >
                <div>
                  <div className="w-full flex items-center justify-between pt-2 px-2 ">
                    <div className="flex flex-row gap-2 text-white items-center justify-between p-2 bg-black rounded-md font-bold">
                      <TiShoppingCart size={20} />
                      <span className="text-lg font-black">21</span>
                    </div>
                    <button className="w-[40px] h-[40px]  text-xl flex items-center justify-center bg-black text-white rounded-full cursor-pointer ">
                      <GrFavorite className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-2 flex flex-col gap-2">
              <p className="text-base">
                <span className="text-[#F39C12] font-semibold text-2xl">
                  Pull-Over
                </span>
              </p>

              <p className="font-medium text-lg text-gray-500">
                Lorem ipsum dolor sit amet consectetu amet consectetu..
              </p>
            </div>
            <div className="px-2 flex items-center justify-between gap-4 text-sm text-gray-700">
              <h3 className="text-2xl font-semibold">$10</h3>
              <button className="bg-[#F39C12] text-white text-xl py-2 px-4 rounded-xl cursor-pointer">
                <h3>
                  Prix d&apos;achat : <span className="font-bold">$8</span>
                </h3>
              </button>
            </div>
          </div>
          <div className="shop-item w-70 flex flex-col gap-5 bg-white rounded-2xl p-3 relative shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="w-full bg-gray-300 flex flex-col gap-5 rounded-tl-xl rounded-2xl">
              <div
                className="w-full h-[250px] bg-center bg-cover bg-no-repeat rounded-2xl"
                style={{ backgroundImage: `url(${Product5.src})` }}
              >
                <div>
                  <div className="w-full flex items-center justify-between pt-2 px-2 ">
                    <div className="flex flex-row gap-2 text-white items-center justify-between p-2 bg-black rounded-md font-bold">
                      <TiShoppingCart size={20} />
                      <span className="text-lg font-black">21</span>
                    </div>
                    <button className="w-[40px] h-[40px]  text-xl flex items-center justify-center bg-black text-white rounded-full cursor-pointer ">
                      <GrFavorite className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-2 flex flex-col gap-2">
              <p className="text-base">
                <span className="text-[#F39C12] font-semibold text-2xl">
                  Tee-Shirt
                </span>
              </p>

              <p className="font-medium text-lg text-gray-500">
                Lorem ipsum dolor sit amet consectetu amet consectetu..
              </p>
            </div>
            <div className="px-2 flex items-center justify-between gap-4 text-sm text-gray-700">
              <h3 className="text-2xl font-semibold">$10</h3>
              <button className="bg-[#F39C12] text-white text-xl py-2 px-4 rounded-xl cursor-pointer">
                <h3>
                  Prix d&apos;achat : <span className="font-bold">$8</span>
                </h3>
              </button>
            </div>
          </div>
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
              Ajouter un produit
            </h3>
            <div className="w-full space-y-5 py-10">
              <div className="w-full h-70 border border-gray-300 flex flex-col justify-between p-5 gap-y-2">
                <img
                  id="image"
                  src={`${coverImg ?? "https://placehold.co/400"}`}
                  alt="Aperçu de l'image"
                  className="w-full h-[80%] object-contain rounded-xl"
                />
                <input
                  type="file"
                  className=""
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={previewCoverImage}
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
                <label htmlFor="">Prix d&apos;Achat</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                  placeholder="Entrer le prix d'achat du produit"
                />
              </div>
              <div className="w-full flex flex-col gap-y-2">
                <label htmlFor="">Prix de vente</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                  placeholder="Entrer le prix de vente du produit"
                />
              </div>
              <div className="w-full flex flex-col gap-y-2">
                <label htmlFor="">Catégorie</label>
                <Select>
                  <SelectTrigger className="w-full py-6 outline-none focus:outline-none border border-[#F39C12]">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coton">Coton</SelectItem>
                    <SelectItem value="cuir">Cuir</SelectItem>
                    <SelectItem value="soie">Soie</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full flex flex-col gap-y-2">
                <label htmlFor="">Nom du stock</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                  placeholder="Entrer le nom du stock"
                />
              </div>
              <div className="w-full flex flex-col gap-y-2">
                <label htmlFor="">Quantité achetée</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                  placeholder="quantité"
                />
              </div>
              <div className="w-full flex flex-col gap-y-2">
                <label htmlFor="">Frais supplémentaires</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                  placeholder="Entrer les frais supplémentaires"
                />
              </div>

              <button className="auth-btn w-full mt-5 bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d5850c] focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:ring-offset-2 transition-all shadow-lg">
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

