"use client";
import React from "react";
import { spendingStore } from "./spendingStore/spendingStore";

const spending = () => {
  const { name, date, showSpendingDetails } = spendingStore();
  return (
    <div>
      <h2 className="text-xl">Dépenses: {showSpendingDetails(name, date)}</h2>
      <p>{name}</p>
    </div>
  );
};

export default spending;
