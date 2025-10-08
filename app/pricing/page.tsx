"use client";
import React from "react";
import { princingStore } from "./pricingStore/princingStore";

const pricing = () => {
  const { type, price, showPrincing } = princingStore();
  return (
    <div>
      <h1>Pricing</h1>
      <p>{showPrincing(type, price)}</p>
    </div>
  );
};

export default pricing;
