"use client";
import React from "react";
import ShopProductFilter from "../ShopProductFilter";
import ShopDetailsProductList from "../ShopDetailsProductList";
import "@/style/style.scss"
const ShopDetailProductSec = () => {
  return (
    <>
      <section className="w-full py-20">
        <div className="max-w-[80%] mx-auto">
          <div className="column w-full flex flex-row justify-between items-start">
            <ShopProductFilter />
           <ShopDetailsProductList/>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopDetailProductSec;
