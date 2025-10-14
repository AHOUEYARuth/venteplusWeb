import React from 'react';
import ShopProductCard from './ShopProductCard';
import Product1 from "@/assets/images/product1.png"
import Product2 from "@/assets/images/product2.png"
import Product3 from "@/assets/images/product3.png";
import Product4 from "@/assets/images/product8.png";
import Product5 from "@/assets/images/product5.png";
import Product6 from "@/assets/images/product6.png";
import Product7 from "@/assets/images/product7.png";
import Product8 from "@/assets/images/product9.png";
const ShopDetailsProductList = () => {
    return (
      <div className="column-img w-[75%]">
        <div className="w-full flex flex-col gap-8">
          <div className="head w-full flex items-center justify-between">
            <div className="title w-[50%]">
              <h3 className="text-xl text-[#F39C12] font-semibold">Products</h3>
              <h2 className="text-3xl font-bold text-gray-800">
                Our Best Products
              </h2>
            </div>
            {/* <div className="w-[40] h-[40] bg-black text-white rounded-full flex items-center justify-center">
              <IoIosArrowForward size={20} />
            </div> */}
          </div>
          <div className="w-full flex flex-wrap items-center gap-10">
            <ShopProductCard
              qualite="Coton"
              nom="Tee-shirt"
              prix={24}
              image={Product1.src}
            />
            <ShopProductCard
              qualite="Coton"
              nom="Pull-Over"
              prix={35}
              image={Product2.src}
            />
            <ShopProductCard
              qualite="Coton"
              nom="Pull-Over"
              prix={35}
              image={Product3.src}
            />
            <ShopProductCard
              qualite="Coton"
              nom="Tee-Shirt"
              prix={35}
              image={Product4.src}
            />
            <ShopProductCard
              qualite="Trico"
              nom="Chemise"
              prix={35}
              image={Product5.src}
            />
            <ShopProductCard
              qualite="Coton"
              nom="Tee-Shirt"
              prix={35}
              image={Product6.src}
            />
            <ShopProductCard
              qualite="Trico"
              nom="Bornet"
              prix={35}
              image={Product7.src}
            />
            <ShopProductCard
              qualite="Trico"
              nom="Bornet"
              prix={35}
              image={Product8.src}
            />
          </div>
        </div>
      </div>
    );
};

export default ShopDetailsProductList;