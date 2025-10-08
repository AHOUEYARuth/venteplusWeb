"use client";
import React from "react";
import { servicesStore } from "./servicesStore/servicesStore";

const services = () => {
  const { name, description, showService } = servicesStore();
  return (
    <div>
      <h1>Services</h1>
      <p>{showService(name, description)}</p>
    </div>
  );
};

export default services;
