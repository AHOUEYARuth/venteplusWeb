"use client";
import React from "react";
import { contactStore } from "./contactStore/contactStore";

const contact = () => {
  const { name, firstName, getFullName } = contactStore();

  return (
    <div>
      <h1>{getFullName(name, firstName)}</h1>
    </div>
  );
};

export default contact;
