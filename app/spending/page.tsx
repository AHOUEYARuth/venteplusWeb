"use client";
import React from "react";
import { spendingStore } from "./spendingStore/spendingStore";

const spending = () => {
  const { name, date, showSpendingDetails } = spendingStore();
  return (
    <div>
      <h1>Dépenses: {showSpendingDetails(name, date)}</h1>
    </div>
  );
};

export default spending;
