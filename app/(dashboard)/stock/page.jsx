"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { stockStore } from "./stockStore/stockStore";
import { gsap } from "gsap";
import { IoMdClose } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdOutlineMoreVert, MdSearch } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useProductStore } from "../product/productStore/productStore";
import { useLoginStore } from "@/app/login/loginStore/loginStore";
export default function Stock() {
  const { products, getProductsActions, setProducts } = useProductStore();
  const { shop } = useLoginStore();
  const { stocks, fetchData } = stockStore();
  const container = useRef(null);
  const timeLineModal = useRef();

  const { register, handleSubmit, watch, formState, trigger } = useForm({
    mode: "onChange",
  });

  const submitForm = (data) => {
    trigger().then((isValid) => {
      if (isValid) {
        console.log(data);
      }
    });
  };

  console.log("produits");
  console.log(products);
async function applyGetProductAction(shopId) {
  await getProductsActions(shopId).then((response) => {
    setProducts(response.data);
  });
}
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

   useEffect(() => {
      (function init() {
        if (shop?.id) {
          applyGetProductAction(shop?.id);
        }
      })();
    }, [shop]);
  return (
    <div ref={container} className="w-full h-full p-5 bg-gray-50 rounded-xl">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold ">Gestion de Stocks</h2>
          <p className="text-gray-500 text-xl pt-3">
            Contrôlez vos stocks sans stress. Consultez les niveaux de produits
            et évitez les ruptures ou surplus grâce à un suivi automatisé.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full flex flex-row items-start justify-between mt-20">
          <h2 className="text-2xl font-semibold ">Listes des Stocks</h2>
          <div className="w-[50%] flex flex-row items-center justify-center gap-x-4">
            <div className="w-[40%] relative flex items-center justify-between bg-white gap-x-2 rounded-lg">
              <input
                type="text"
                placeholder="Recherche par nom"
                className="bg-white text-sm py-3 pl-2 outline-hidden rounded-lg focus:outline-none  transition-all"
              />
              <button className="py-3 bg-[#F39C12] text-white rounded-tr-lg rounded-br-lg cursor-pointer px-4">
                <MdSearch size={25} />
              </button>
            </div>
            <div className="w-[60%] flex flex-row gap-x-4 items-center">
              <input
                type="date"
                name=""
                id=""
                className="border border-[#F39C12] py-3 px-4 rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="w-[95%] overflow-x-auto pb-10 mt-5 bg-white">
          {products.length === 0 ? (
            <div>Aucun produit disponible dans votre stock</div>
          ) : (
            <table className="min-w-full text-xl  ">
              <thead className=" text-black bg-gray-100">
                <tr className="border-b border-gray-200 text-left">
                  <th className="p-5">N°</th>
                  <th className="p-5">Nom du stock</th>
                  <th className="p-5">Quantité disponible</th>
                  <th className="p-5 ">Quantité Minimale</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  return (
                    <tr
                      key={product.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-5">{index + 1}</td>
                      <td className="p-5 font-bold">Stock de {product.name}</td>
                      {/* <td className="p-5">{stock.product}</td> */}
                      <td className="p-5">{product.availableQuantity}</td>
                      <td className="p-5">{product.minimumQuantity}</td>
                      <td className="pr-5">
                        {" "}
                        <DropdownMenu>
                          <DropdownMenuTrigger className="border border-transparent focus:border focus:border-transparent active:border active:border-transparent">
                            <MdOutlineMoreVert />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-40 border border-transparent">
                            <DropdownMenuLabel className="text-xl">
                              Actions
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-lg">
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-lg">
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/*  <div
        style={{ pointerEvents: "none", opacity: 0 }}
        className={`modal_container w-full h-full fixed top-0 right-0 bg-black/30`}
      >
        <div
          style={{ transform: "translateX(200%)", pointerEvents: "all" }}
          className={`form_container flex flex-col items-start gap-y-10 bg-white w-110 p-5 rounded-xl h-[96vh] absolute top-5 right-3 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden `}
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
              Ajouter un nouveau stock
            </h3>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="w-full space-y-6 py-10">
                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="">Nom du Stock</label>
                  <input
                    {...register("stockName", {
                      required: "Le nom du stock est obligatoire",
                    })}
                    type="text"
                    name="stockName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer le nom du stock"
                  />
                  {formState.errors.stockName && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.stockName.message}
                    </p>
                  )}
                </div>

                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="">Nom du produit</label>
                  <select
                    name="productName"
                    {...register("productName", {
                      required: "Le nom du produit est obligatoire",
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Sélectionner un produit
                    </option>
                    <option value="teeShirt">Tee-Shirt</option>
                    <option value="pullOver">Pull-over</option>
                    <option value="jean">Jeans</option>
                  </select>
                  {formState.errors.productName && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.productName.message}
                    </p>
                  )}
                </div>

                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="">Quantité Disponible</label>
                  <input
                    {...register("availableQuantity", {
                      required: "La quantité disponible est obligatoire",
                      min: {
                        value: 1,
                        message:
                          "La quantité disponible doit être au moins de 1",
                      },
                    })}
                    type="number"
                    name="availableQuantity"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer la quantité de produit disponible"
                  />
                  {formState.errors.availableQuantity && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.availableQuantity.message}
                    </p>
                  )}
                </div>

                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="">Quantité Minimale</label>
                  <input
                    {...register("minQuantity", {
                      required: "La quantité minimale est obligatoire",
                      min: {
                        value: 1,
                        message: "La quantité minimale doit être au moins de 1",
                      },
                    })}
                    type="number"
                    name="minQuantity"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer la quantité de produit minimale"
                  />
                  {formState.errors.minQuantity && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.minQuantity.message}
                    </p>
                  )}
                </div>

                <button className="auth-btn w-full mt-5 bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d5850c] focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:ring-offset-2 transition-all shadow-lg">
                  Enrégistrer le stock
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> */}
    </div>
  );
}
