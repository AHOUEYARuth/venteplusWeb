"use client";
import About from "@/components/About";
import Header from "@/components/layout/Header";
import Services from "@/components/Services";
//import Shop from "@/components/Shop";
export default function Home() {

  return (
    <div>
      <Header />
      <About />
      <Services />
      {/* <Shop/> */}
    </div>
  );
}
