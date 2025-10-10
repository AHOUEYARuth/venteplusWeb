"use client";
import React from "react";
import { shopStore } from "./shopStore/shopStore";
import ShopItem from "@/components/ShopItem";
import Shop1 from "@/assets/images/shopves1.jpg";
import Shop2 from "@/assets/images/shopBeauty.jpg";
import Shop3 from "@/assets/images/shopTech.jpg";
import UserPic from "@/assets/images/usrp.png"
import Link from "next/link";
import { Button } from "@/components/ui/button";

const shop = () => {
  const { name, location, showShopDetails } = shopStore();
  return (
    <div>
      <section id="feat_location" className="w-full py-[70] mt-[80] ">
        <div className="max-w-[80%] mx-auto">
          <div className="w-full flex flex-col justify-center items-center text-center py-10">
            <div className="font-medium text-sm text-[orangered]">
              BIENVENUE SUR BOUTIQUE
            </div>
            <h1 className="font-medium">Nos Boutiques</h1>
            <div className="text-lg text-[#2C3E50] lg:w-[50%] md:w-[90%] text-center">
              Créez votre propre vitrine en ligne et donnez plus de visibilité à
              vos produits. Attirez de nouveaux clients grâce à une boutique
              professionnelle et facile à gérer. Vendez partout, à tout moment,
              avec Vente+
            </div>
            <Link href="/register">
              {" "}
              <Button className="mt-5 bg-[#F39C12] text-lg">Commencer</Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full pb-10 my-3">
        <div className="max-w-[80%] mx-auto">
          <div className="w-full flex flex-wrap justify-center gap-y-5 lg:justify-between text-start">
            <ShopItem
              image={Shop1}
              domainIntervention="Commerce vestimentaire"
              name="Lux' Shop"
              rating="4.1"
              bedrooms="3 Bedrooms"
              userImage={UserPic}
              userName="Amra Detch"
              userRole="Propriétaire"
            />
            <ShopItem
              image={Shop1}
              domainIntervention="Commerce Alimentaire"
              name="Lux' Shop"
              rating="4.1"
              bedrooms="3 rayons"
              userImage={UserPic}
              userName="Amra Detch"
              userRole="Propriétaire"
            />

            <ShopItem
              image={Shop2}
              domainIntervention="Beauté & soins"
              name="Belle Nature"
              rating="4.7"
              bedrooms="5 gammes de produits"
              userImage={UserPic}
              userName="Sarah Kanko"
              userRole="Gérante"
            />

            <ShopItem
              image={Shop3}
              domainIntervention="Électronique & gadgets"
              name="TechZone"
              rating="4.5"
              bedrooms="Étagères connectées"
              userImage={UserPic}
              userName="Jonas Liko"
              userRole="Responsable boutique"
            />

            <ShopItem
              image={Shop1}
              domainIntervention="Épicerie fine"
              name="Saveurs d’Afrique"
              rating="4.3"
              bedrooms="Rayon produits locaux"
              userImage={UserPic}
              userName="Mireille Adjovi"
              userRole="Propriétaire"
            />

            <ShopItem
              image={Shop2}
              domainIntervention="Matériaux de construction"
              name="BuildPro Market"
              rating="4.0"
              bedrooms="Zone matériaux lourds"
              userImage={UserPic}
              userName="Thierry Agossou"
              userRole="Gérant principal"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default shop;
