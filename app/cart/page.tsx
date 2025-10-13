import CartProductCard from "@/components/CartProductCard";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Product1 from "@/assets/images/product9.png";
import Product2 from "@/assets/images/product10.jpg";
import Product4 from "@/assets/images/product8.png";
import Product5 from "@/assets/images/product5.png";
import Product6 from "@/assets/images/product2.png";
import "@/style/style.scss";
const cart = () => {
  return (
    <div>
      <section id="feat_location" className="w-full py-[70] mt-[80] ">
        <div className="max-w-[80%] mx-auto">
          <div className="w-full flex flex-col justify-center items-center text-center py-10">
            <div className="font-medium text-sm text-[orangered]">
              BIENVENUE SUR À PANIER
            </div>
            <h1 className="font-medium">Votre Panier</h1>
            <div className="text-lg text-[#2C3E50] lg:w-[50%] md:w-[90%] text-center">
              Vente+ est une solution pensée pour accompagner les commerçants
              dans leur transformation digitale. Notre mission : rendre la
              gestion commerciale simple, accessible et performante. Ensemble,
              digitalisons le commerce de proximité.
            </div>
          </div>
        </div>
      </section>
      <section className="py-10 my-5">
        <div className="max-w-[80%] mx-auto">
          <div className="column w-full text-start flex  gap-7 items-start justify-center ">
            <div className="column column-img w-[60%] flex flex-row flex-wrap gap-y-8 justify-between border border-[#F39C12] p-5 rounded-xl">
              <CartProductCard
                image={Product1.src}
                name="Tee-Shirt"
                category="Coton"
                price={10}
                quantity={1}
              />
              <CartProductCard
                image={Product2.src}
                name="Tee-Shirt"
                category="Coton"
                price={25}
                quantity={1}
              />
              <CartProductCard
                image={Product4.src}
                name="Tee-Shirt"
                category="Coton"
                price={25}
                quantity={1}
              />
              <CartProductCard
                image={Product5.src}
                name="Chemise"
                category="Trico"
                price={25}
                quantity={1}
              />
              <CartProductCard
                image={Product6.src}
                name="Pull"
                category="Coton"
                price={25}
                quantity={1}
              />
            </div>

            <div className="column-img w-[30%] flex flex-col   bg-white rounded-xl overflow-hidden border border-gray-200  transition-all duration-300 hover:border-[#F39C12]">
              <div className="p-6">
                <div className="w-full flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Montant Total</h2>
                  </div>
                  <p className="text-2xl text-[#F39C12] font-semibold">$134</p>
                </div>
                <p className="mt-6 text-gray-700 text-lg leading-relaxed">
                  Démarrez votre activité sans frais et découvrez les
                </p>
              </div>

              <div className="px-6 gap-2 flex justify-between">
                <div className="w-[50%] relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Nom & Prénom"
                  />
                </div>
                <div className="w-[50%] relative">
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="px-6 mt-5 gap-2 flex justify-between">
                <div className="w-[50%] relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="address de livraison"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-[50%] py-6 outline-none">
                    <SelectValue placeholder="Mode de paiement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">MTN</SelectItem>
                    <SelectItem value="dark">MOOV</SelectItem>
                    <SelectItem value="system">Virement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-6">
                <button className="cursor-pointer w-full bg-[#F39C12] hover:bg-white border hover:text-[#F39C12] hover:border-[#F39C12] text-white font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Commander
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default cart;
