"use client";
import React from "react";
import { shopStore } from "./shopStore/shopStore";

const shop = () => {
  const { name, location, showShopDetails } = shopStore();
  return (
    <div>
      <h1>Boutique Détails: {showShopDetails(name, location)}</h1>
    </div>
  );
};

export default shop;
