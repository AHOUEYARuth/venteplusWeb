"use client";
import React from "react";
import { registerStore } from "./registerStore/registerStore";

const register = () => {
  const { nom, age, showUser } = registerStore();
  return (
    <div>
      <h1>Utilisateur</h1>
      <p>{showUser(nom, age)}</p>
    </div>
  );
};

export default register;
