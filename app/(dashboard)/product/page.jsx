"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { gsap } from "gsap";
import Product2 from "@/assets/images/product10.jpg";
import Product3 from "@/assets/images/product3.png";
import Product1 from "@/assets/images/product9.png";
import Product4 from "@/assets/images/product2.png";
import Product5 from "@/assets/images/product6.png";
import { GrFavorite } from "react-icons/gr";
import { TiShoppingCart } from "react-icons/ti";
import { useProductStore } from "./productStore/productStore";
import { IoAccessibility } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useLoginStore } from "@/app/login/loginStore/loginStore";
import { baseUrlNotApi } from "@/lib/httpClient";

export default function Product() {
  const container = useRef(null);
  const timeLineModal = useRef();
  const [coverImg, setcoverImg] = useState(null);
  const [payloadImg, setpayloadImg] = useState(null);
  const { products, createProductAction,setProducts,getProductsActions,categories} = useProductStore();
  const { shop } = useLoginStore();
  const [additionalCoast, setadditionalCoast] = useState(0);
  const [productLoading, setproductLoading] = useState(false);
  const [productsListe, setproductsListe] = useState([])

  const { register, handleSubmit, watch, formState, trigger, reset } = useForm({
    mode: "onChange",
  });
  async function applyGetProductAction(shopId) {
   setproductLoading(true);
    await getProductsActions(shopId).then((response) => {
          setProducts(response.data);
          setproductLoading(false);
    });
  }
  async function submitForm(data) {
    const payload = {
      ...data,
      shopId: shop?.id,
      additionalCosts: parseInt(additionalCoast),
      purchasePrice: parseInt(data.purchasePrice),
      salePrice: parseInt(data.salePrice),
      image: data?.image[0],
      availableQuantity: parseInt(data.availableQuantity),
      minimumQuantity: parseInt(data.minimumQuantity),
    };
    await createProductAction(payload)
      .then(async (response) => {
        console.log("product");
        console.log(response);
         await applyGetProductAction(shop?.id);
        reset()
      })
      .catch((error) => {
        console.log(error);
      });

    trigger().then((isValid) => {
      if (isValid) {
        console.log(data);
      }
    });
  }

  useEffect(() => {
    (function init() {
      if (shop?.id) {
        applyGetProductAction(shop?.id);
      }
    })();
  }, [shop]);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      timeLineModal.current = gsap
        .timeline()
        .to(".modal_container", {
          opacity: 1,
          duration: 0.5,
        })
        .to(
          ".form_container",
          {
            xPercent: -200,
            duration: 0.5,
          },
          "-=0.5"
        )
        .paused(true);
    }, [container]);

    return () => {
      context.revert();
    };
  }, [container]);

  function previewCoverImage(e) {
    setcoverImg(URL.createObjectURL(e.target.files[0]));
    setpayloadImg(e.target.files[0]);
  }

  return (
    <div
      ref={container}
      className="w-full h-full p-5 bg-gray-50 rounded-xl overflow-hidden"
    >
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold ">Produits</h2>
          <p className="text-gray-500 text-xl pt-3">
            Gérez facilement vos articles : ajoutez, modifiez ou supprimez vos
            produits et surveillez leur disponibilité à tout moment.
          </p>
        </div>
        <div className="flex items-center gap-x-5">
          <Button
            onClick={() => {
              timeLineModal.current.play();
            }}
            className="bg-[#F39C12] cursor-pointer"
          >
            Nouveau Produit
          </Button>
          <Button className="bg-transparent cursor-pointer text-[#F39C12] border border-[#F39C12] hover:bg-[#F39C12] hover:text-white">
            Modifier un Produit
          </Button>
        </div>
      </div>
      <div className="w-full mt-8 flex items-center justify-between">
        <div className="w-[30%] relative flex items-center justify-between bg-white gap-x-2 rounded-lg">
          <input
            type="text"
            placeholder="Recherche par nom"
            className="text-xl py-3 pl-4 outline-hidden rounded-lg focus:outline-none  transition-all"
          />
          <button className="py-3 bg-[#F39C12] text-white rounded-tr-lg rounded-br-lg cursor-pointer px-5">
            Rechercher
          </button>
        </div>
        <div className="w-[50%] flex items-center justify-between">
          <div className="flex flex-row gap-x-5 items-center ">
            <label htmlFor="" className="text-lg">
              Filtrer par date :{" "}
            </label>
            <input
              type="date"
              name=""
              id=""
              className="border border-[#F39C12] py-2 px-4 rounded-lg"
            />
          </div>
          <Select>
            <SelectTrigger className="w-[200px] py-5 outline-none focus:outline-none border border-[#F39C12]">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="coton">Coton</SelectItem>
              <SelectItem value="cuir">Cuir</SelectItem>
              <SelectItem value="soie">Soie</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="py-8 mt-10">
        <h2 className="text-2xl font-bold mb-5">Liste des Produits</h2>
        <div className="w-full flex flex-row flex-wrap items-center justify-between gap-y-4">
          {products.map((product, index) => {
            return <div
               key={index}
               className="shop-item w-70 flex flex-col gap-5 bg-white rounded-2xl p-3 relative shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
             >
               <div className="w-full bg-gray-300 flex flex-col gap-5 rounded-tl-xl rounded-2xl">
                 <div
                   className="w-full h-[250px] bg-center bg-cover bg-no-repeat rounded-2xl"
                   style={{ backgroundImage: `url("${baseUrlNotApi}${product?.image}")` }}
                 >
                   <div>
                     <div className="w-full flex items-center justify-between pt-2 px-2 ">
                       <div className="flex flex-row gap-2 text-white items-center justify-between p-2 bg-black rounded-md font-bold">
                         <TiShoppingCart size={20} />
                         <span className="text-lg font-black">21</span>
                       </div>
                       <button className="w-[40px] h-[40px]  text-xl flex items-center justify-center bg-black text-white rounded-full cursor-pointer ">
                         <GrFavorite className="text-2xl" />
                       </button>
                     </div>
                   </div>
                 </div>
               </div>

               <div className="px-2 flex flex-col gap-2">
                 <p className="text-base">
                   <span className="text-[#F39C12] font-semibold text-2xl">
                     {product.name}
                   </span>
                 </p>

                 <p className="font-medium text-lg text-gray-500">
                   {product.description}
                 </p>
               </div>
               <div className="px-2 flex items-center justify-between gap-4 text-sm text-gray-700">
                 <h3 className="text-2xl font-semibold">
                   {product.salePrice}fcfa
                 </h3>
                 <button className="bg-[#F39C12] text-white text-xl py-2 px-4 rounded-xl cursor-pointer">
                   <h3>
                     Prix d&apos;achat :{" "}
                     <span className="font-bold">{product.purchasePrice}</span>
                   </h3>
                 </button>
               </div>
             </div>;
          })}
          {/* <div className="shop-item w-70 flex flex-col gap-5 bg-white rounded-2xl p-3 relative shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="w-full bg-gray-300 flex flex-col gap-5 rounded-tl-xl rounded-2xl">
              <div
                className="w-full h-[250px] bg-center bg-cover bg-no-repeat rounded-2xl"
                style={{ backgroundImage: `url(${Product3.src})` }}
              >
                <div>
                  <div className="w-full flex items-center justify-between pt-2 px-2 ">
                    <div className="flex flex-row gap-2 text-white items-center justify-between p-2 bg-black rounded-md font-bold">
                      <TiShoppingCart size={20} />
                      <span className="text-lg font-black">21</span>
                    </div>
                    <button className="w-[40px] h-[40px]  text-xl flex items-center justify-center bg-black text-white rounded-full cursor-pointer ">
                      <GrFavorite className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-2 flex flex-col gap-2">
              <p className="text-base">
                <span className="text-[#F39C12] font-semibold text-2xl">
                  Pull-over
                </span>
              </p>

              <p className="font-medium text-lg text-gray-500">
                Lorem ipsum dolor sit amet consectetu amet consectetu..
              </p>
            </div>
            <div className="px-2 flex items-center justify-between gap-4 text-sm text-gray-700">
              <h3 className="text-2xl font-semibold">$10</h3>
              <button className="bg-[#F39C12] text-white text-xl py-2 px-4 rounded-xl cursor-pointer">
                <h3>
                  Prix d&apos;achat : <span className="font-bold">$8</span>
                </h3>
              </button>
            </div>
          </div>
          <div className="shop-item w-70 flex flex-col gap-5 bg-white rounded-2xl p-3 relative shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="w-full bg-gray-300 flex flex-col gap-5 rounded-tl-xl rounded-2xl">
              <div
                className="w-full h-[250px] bg-center bg-cover bg-no-repeat rounded-2xl"
                style={{ backgroundImage: `url(${Product1.src})` }}
              >
                <div>
                  <div className="w-full flex items-center justify-between pt-2 px-2 ">
                    <div className="flex flex-row gap-2 text-white items-center justify-between p-2 bg-black rounded-md font-bold">
                      <TiShoppingCart size={20} />
                      <span className="text-lg font-black">21</span>
                    </div>
                    <button className="w-[40px] h-[40px]  text-xl flex items-center justify-center bg-black text-white rounded-full cursor-pointer ">
                      <GrFavorite className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-2 flex flex-col gap-2">
              <p className="text-base">
                <span className="text-[#F39C12] font-semibold text-2xl">
                  Tee-Shirt
                </span>
              </p>

              <p className="font-medium text-lg text-gray-500">
                Lorem ipsum dolor sit amet consectetu amet consectetu..
              </p>
            </div>
            <div className="px-2 flex items-center justify-between gap-4 text-sm text-gray-700">
              <h3 className="text-2xl font-semibold">$10</h3>
              <button className="bg-[#F39C12] text-white text-xl py-2 px-4 rounded-xl cursor-pointer">
                <h3>
                  Prix d&apos;achat : <span className="font-bold">$8</span>
                </h3>
              </button>
            </div>
          </div>
          <div className="shop-item w-70 flex flex-col gap-5 bg-white rounded-2xl p-3 relative shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="w-full bg-gray-300 flex flex-col gap-5 rounded-tl-xl rounded-2xl">
              <div
                className="w-full h-[250px] bg-center bg-cover bg-no-repeat rounded-2xl"
                style={{ backgroundImage: `url(${Product4.src})` }}
              >
                <div>
                  <div className="w-full flex items-center justify-between pt-2 px-2 ">
                    <div className="flex flex-row gap-2 text-white items-center justify-between p-2 bg-black rounded-md font-bold">
                      <TiShoppingCart size={20} />
                      <span className="text-lg font-black">21</span>
                    </div>
                    <button className="w-[40px] h-[40px]  text-xl flex items-center justify-center bg-black text-white rounded-full cursor-pointer ">
                      <GrFavorite className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-2 flex flex-col gap-2">
              <p className="text-base">
                <span className="text-[#F39C12] font-semibold text-2xl">
                  Pull-Over
                </span>
              </p>

              <p className="font-medium text-lg text-gray-500">
                Lorem ipsum dolor sit amet consectetu amet consectetu..
              </p>
            </div>
            <div className="px-2 flex items-center justify-between gap-4 text-sm text-gray-700">
              <h3 className="text-2xl font-semibold">$10</h3>
              <button className="bg-[#F39C12] text-white text-xl py-2 px-4 rounded-xl cursor-pointer">
                <h3>
                  Prix d&apos;achat : <span className="font-bold">$8</span>
                </h3>
              </button>
            </div>
          </div>
          <div className="shop-item w-70 flex flex-col gap-5 bg-white rounded-2xl p-3 relative shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="w-full bg-gray-300 flex flex-col gap-5 rounded-tl-xl rounded-2xl">
              <div
                className="w-full h-[250px] bg-center bg-cover bg-no-repeat rounded-2xl"
                style={{ backgroundImage: `url(${Product5.src})` }}
              >
                <div>
                  <div className="w-full flex items-center justify-between pt-2 px-2 ">
                    <div className="flex flex-row gap-2 text-white items-center justify-between p-2 bg-black rounded-md font-bold">
                      <TiShoppingCart size={20} />
                      <span className="text-lg font-black">21</span>
                    </div>
                    <button className="w-[40px] h-[40px]  text-xl flex items-center justify-center bg-black text-white rounded-full cursor-pointer ">
                      <GrFavorite className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-2 flex flex-col gap-2">
              <p className="text-base">
                <span className="text-[#F39C12] font-semibold text-2xl">
                  Tee-Shirt
                </span>
              </p>

              <p className="font-medium text-lg text-gray-500">
                Lorem ipsum dolor sit amet consectetu amet consectetu..
              </p>
            </div>
            <div className="px-2 flex items-center justify-between gap-4 text-sm text-gray-700">
              <h3 className="text-2xl font-semibold">$10</h3>
              <button className="bg-[#F39C12] text-white text-xl py-2 px-4 rounded-xl cursor-pointer">
                <h3>
                  Prix d&apos;achat : <span className="font-bold">$8</span>
                </h3>
              </button>
            </div>
          </div> */}
        </div>
      </div>

      <div
        style={{ pointerEvents: "none", opacity: 0 }}
        className={`modal_container z-100 w-full h-full fixed top-0 right-0 bg-black/30`}
      >
        <div
          style={{ transform: "translateX(200%)", pointerEvents: "all" }}
          className={`form_container z-100 flex  flex-col items-start gap-y-10 bg-white w-110 p-5 rounded-xl h-[96vh] absolute top-5 right-3 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden `}
        >
          <button
            onClick={() => {
              timeLineModal.current.reversed(true);
            }}
          >
            <IoMdClose size={35} />
          </button>
          <div className="w-full">
            <h3 className="text-xl text-[#F39C12] font-bold text-center">
              Ajouter un produit
            </h3>
            <form action="" onSubmit={handleSubmit(submitForm)}>
              <div className="w-full space-y-5 py-10">
                <div className="w-full h-70 border border-gray-300 flex flex-col justify-between p-5 gap-y-2">
                  <img
                    id="image"
                    src={`${coverImg ?? "https://placehold.co/400"}`}
                    alt="Aperçu de l'image"
                    className="w-full h-[80%] object-contain rounded-xl"
                  />
                  <input
                    {...register("image", {
                      required: "l'image du produit est obligatoire",
                    })}
                    type="file"
                    name="image"
                    className=""
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={previewCoverImage}
                    multiple={false}
                  />
                  {formState.errors.image && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.image.message}
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="">Nom du produit</label>
                  <input
                    {...register("name", {
                      required: "Le nom du produit est obligatoire",
                    })}
                    type="text"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer le nom du produit"
                  />
                  {formState.errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="">Description du produit</label>
                  <input
                    {...register("description", {
                      required: "Le nom du produit est obligatoire",
                    })}
                    type="text"
                    name="description"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer une brève description du produit"
                  />
                  {formState.errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.description.message}
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="">Prix d&apos;Achat</label>
                  <input
                    {...register("purchasePrice", {
                      required: "Le prix d'achat du produit est obligatoire",
                    })}
                    type="number"
                    name="purchasePrice"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer le prix d'achat du produit"
                  />
                  {formState.errors.purchasePrice && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.purchasePrice.message}
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="">Prix de vente</label>
                  <input
                    {...register("salePrice", {
                      required: "Le prix de vente du produit est obligatoire",
                    })}
                    type="number"
                    name="salePrice"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer le prix de vente du produit"
                  />
                  {formState.errors.salePrice && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.salePrice.message}
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="">Catégorie</label>
                  <select
                    name="categoryId"
                    {...register("categoryId", {
                      required: "La catégorie du produit est obligatoire",
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    defaultValue=""
                  >
                    {categories.map((category, index) => {
                      return (
                        <option key={index} value={category.id}>
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                  {formState.errors.categoryId && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.categoryId.message}
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="">Quantité achetée</label>
                  <input
                    {...register("availableQuantity", {
                      required: "La quantité du produit est obligatoire",
                    })}
                    type="number"
                    name="availableQuantity"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="quantité"
                  />
                  {formState.errors.availableQuantity && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.availableQuantity.message}
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="">Quantité Minimale d'alerte</label>
                  <input
                    {...register("minimumQuantity", {
                      required:
                        "La quantité minimun du produit est obligatoire",
                    })}
                    type="number"
                    name="minimumQuantity"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="quantité minimale"
                  />
                  {formState.errors.minimumQuantity && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.minimumQuantity.message}
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="">Unité de mesure</label>
                  <select
                    name="unitMeasurement"
                    id="unitMeasurement"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                  >
                    <option value="nbr">Nombre</option>
                    <option value="kilo">Kilo(Kg)</option>
                    <option value="litre">Litre(L)</option>
                  </select>
                  {/* <input
                   
                    type="number"
                    name="unitMesurement"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="unité de mesure"
                  /> */}
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="">Frais supplémentaires</label>
                  <input
                    type="number"
                    onChange={(e) => setadditionalCoast(e.target.value)}
                    name="additionalCosts"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer les frais supplémentaires"
                  />
                </div>

                <button className="auth-btn w-full mt-5 bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d5850c] focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:ring-offset-2 transition-all shadow-lg">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


