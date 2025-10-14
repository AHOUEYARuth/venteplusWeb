"use client";
import React from "react";
import { stockStore } from "./stockStore/stockStore";

const stock = () => {
  const { product, available, showStockDetails } = stockStore();
  return (
    <div>
      <h2 className="text-xl">{showStockDetails(product, available)}</h2>
    </div>
  );
};

export default stock;
