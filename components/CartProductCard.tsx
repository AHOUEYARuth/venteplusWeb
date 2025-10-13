"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { IoClose } from "react-icons/io5";

interface CartProductCardProps {
  image: string;
  name: string;
  category: string;
  price: number;
  quantity?: number;
}

const CartProductCard: React.FC<CartProductCardProps> = ({
  image,
  name,
  category,
  price,
  quantity = 1, 
}) => {
  const [quantite, setQuantite] = useState<number>(quantity);

  const incrementerQuantite = () => {
    setQuantite((prev) => prev + 1);
  };

  const decrementerQuantite = () => {
    setQuantite((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="column-img w-[48%] border border-gray-300 flex justify-between py-4 px-4 rounded-xl cursor-pointer">
      <div
        className="w-[40%] h-[150px] bg-center bg-cover rounded-md bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      <div className="w-[55%] flex flex-col justify-between">
        <div className="w-full flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold">{name}</h2>
            <p className="text-lg text-[#F39C12]">{category}</p>
          </div>
          <p className="text-xl text-[#F39C12] font-semibold">${price}</p>
        </div>

        <div className="w-full flex items-start justify-between">
          <div className="w-[50%] flex border border-gray-200 p-2 rounded-full flex-row justify-between items-center">
            <div
              className="cursor-pointer text-lg font-bold select-none"
              onClick={decrementerQuantite}
            >
              –
            </div>
            <div className="text-xl font-semibold">{quantite}</div>
            <div
              className="cursor-pointer text-lg font-bold select-none"
              onClick={incrementerQuantite}
            >
              +
            </div>
          </div>

          <Button className="bg-[#F39C12] text-white hover:bg-[#e58e09] cursor-pointer">
            <IoClose />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
