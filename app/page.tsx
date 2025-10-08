"use client";
import About from "@/components/About";
import { myStore } from "./customerCredits/customerCreditsStore/customerCreditsStore";
import Header from "@/components/layout/Header";
import Services from "@/components/Services";
import Shop from "@/components/Shop";
export default function Home() {
  const { firstName, lastName, getFullName } = myStore();

  return (
    <div>
      <Header />
      <About />
      <Services />
      <Shop/>
    </div>
  );
}
