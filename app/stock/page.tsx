"use client";
import React from "react";
import { stockStore } from "./stockStore/stockStore";

const stock = () => {
  const { product, available, showStockDetails } = stockStore();
  return (
    <div>
      <h1>{showStockDetails(product, available)}</h1>
    </div>
  );
};

export default stock;
