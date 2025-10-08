"use client";
import React from "react";
import { providerStore } from "./providerStore/providerStore";

const provider = () => {
  const { name, address, showProvider } = providerStore();
  return (
    <div>
      <h1>Fournisseurs: {showProvider(name, address)}</h1>
    </div>
  );
};

export default provider;
