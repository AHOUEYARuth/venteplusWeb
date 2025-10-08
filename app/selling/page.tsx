"use client";
import React from "react";
import { sellingStore } from "./sellingStore/sellingStore";

const selling = () => {
  const { name, details, showSellingsDetails } = sellingStore();
  return (
    <div>
      <h1>{showSellingsDetails(name, details)}</h1>
    </div>
  );
};

export default selling;
