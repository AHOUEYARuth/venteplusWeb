"use client";
import React from "react";
import { sellingStore } from "./sellingStore/sellingStore";

const selling = () => {
  const { name, details, showSellingsDetails } = sellingStore();
  return (
    <div>
      <h2 className="text-2xl">{showSellingsDetails(name, details)}</h2>
    </div>
  );
};

export default selling;
