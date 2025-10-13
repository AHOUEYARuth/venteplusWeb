import React from "react";
import { Badge } from "./ui/badge";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import "@/style/style.scss"
import Link from "next/link";
interface ShopProductCardProps {
  qualite: string;
  nom: string;
  prix: number;
  image: string; 
}

const ShopProductCard: React.FC<ShopProductCardProps> = ({
  qualite,
  nom,
  prix,
  image,
}) => {
  return (
    <div className="product_card w-[250px] flex flex-col gap-5 bg-[#F9FAFB] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
      <div className="w-full bg-gray-300 flex flex-col gap-5 rounded-tl-xl rounded-tr-xl">
        <div className="w-full flex items-center justify-between pt-2 px-5 ">
          <Badge className="text-lg">New</Badge>
          <MdOutlineFavoriteBorder size={30} />
        </div>
        <div
          className="w-full h-[200px] bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </div>
      <div className="w-full px-5 pb-2">
        <p className="text-[#F39C12]">{qualite}</p>
        <div className="w-full flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">{nom}</h3>
            <h4 className="text-xl font-semibold text-[#F39C12]">${prix}</h4>
          </div>
          <Link href="/cart">
            <div className="w-[40px] h-[40px] bg-black text-white rounded-full flex items-center justify-center">
              <FiShoppingCart size={20} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShopProductCard;
