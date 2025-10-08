"use client";
import React from "react";
import { loginStore } from "./loginStore/loginStore";

const login = () => {
  const { name, showLogin } = loginStore();
  return (
    <div>
      <h1>login: {showLogin(name)}</h1>
    </div>
  );
};

export default login;
