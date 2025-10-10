import React from 'react';
import ShopProductCard from './ShopProductCard';
import Product1 from "@/assets/images/product1.png"
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
              qualite="Soie"
              nom="Chemise"
              prix={35}
              image={Product1.src}
            />
            <ShopProductCard
              qualite="Soie"
              nom="Chemise"
              prix={35}
              image={Product1.src}
            />
            <ShopProductCard
              qualite="Soie"
              nom="Chemise"
              prix={35}
              image={Product1.src}
            />
            <ShopProductCard
              qualite="Soie"
              nom="Chemise"
              prix={35}
              image={Product1.src}
            />
            <ShopProductCard
              qualite="Soie"
              nom="Chemise"
              prix={35}
              image={Product1.src}
            />
            <ShopProductCard
              qualite="Soie"
              nom="Chemise"
              prix={35}
              image={Product1.src}
            />
          </div>
        </div>
      </div>
    );
};

export default ShopDetailsProductList;