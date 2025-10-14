"use client";
import React from "react";
import { reportStore } from "./reportStore/reportStore";

const report = () => {
  const { title, details, showReportDetails } = reportStore();
  return (
    <div>
      <h1 className="text-xl">Rapport et statistiques</h1>
      <p>{showReportDetails(title, details)}</p>
    </div>
  );
};

export default report;
