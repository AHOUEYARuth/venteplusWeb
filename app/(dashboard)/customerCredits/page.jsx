"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { customerCredits, useCustomerCreditsStore } from "./customerCreditsStore/customerCreditsStore";
import { gsap } from "gsap";
import { MdOutlineMoreVert, MdSearch } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { PhoneInput } from "@/components/ui/phone-input";
import { useLoginStore } from "@/app/login/loginStore/loginStore";


export default function CustomerCredits() {
  const { customersCredits,setCustomersCredits, getCustomersCreditsAction} = useCustomerCreditsStore();
  const {shop} = useLoginStore()
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

   async function applyGetCustomersAction(shopId) {
      await getCustomersCreditsAction(shopId).then((response) => {
        setCustomersCredits(response.data);
      });
    }
    useEffect(() => {
       (function init() {
         if (shop?.id) {
           applyGetCustomersAction(shop?.id);
         }
       })();
     }, [shop]);
  return (
    <div ref={container} className="w-full h-full p-5 bg-gray-50 rounded-xl">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold ">Dettes Clients</h2>
          <p className="text-gray-500 text-xl pt-3">
            Gérez les crédits accordés à vos clients. Suivez les remboursements
            et relancez facilement les paiements en attente.
          </p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
          reprehenderit.
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full flex flex-row items-start justify-between mt-20">
          <h2 className="text-2xl font-semibold ">Listes des Dettes Clients</h2>
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
              <button
                onClick={() => {
                  timeLineModal.current.play();
                }}
                className="bg-[#F39C12] cursor-pointer py-3 px-4 text-white rounded-lg"
              >
                Nouvelle Dette
              </button>
            </div>
          </div>
        </div>
        <div className="w-[95%] overflow-x-auto pb-10 mt-5 bg-white">
          <table className="min-w-full text-xl">
            <thead className=" text-black bg-gray-100">
              <tr className="border-b border-gray-200 text-left">
                <th className="p-5">Client</th>
                <th className="p-5">Téléphone</th>
                <th className="p-5">Produit</th>
                <th className="p-5">Quantité</th>
                <th className="p-5 ">Unité(FCFA)</th>
                <th className="p-5 ">Total(FCFA)</th>
                <th className="p-5 ">Status</th>
                <th className=""></th>
              </tr>
            </thead>
            <tbody>
              {customersCredits.map((credit) => (
                <tr
                  key={credit.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-5 font-bold">{credit.customer.name} {credit.customer.firstName}</td>
                  <td className="px-5 py-5 text-black">{credit.customer.phoneNumber}</td>
                  <td className="px-5 py-5">{credit.order.toOrders[0].product.name}</td>
                  <td className="px-5 py-5">{credit.order.toOrders[0].quantity}</td>
                  <td className="px-5 py-5 font-medium text-gray-700">
                    {credit.order.toOrders[0].product.purchasePrice}
                  </td>
                  <td className="px-5 py-5 font-medium text-gray-700">
                    {credit.order.totalAmount}
                  </td>
                  <td
                    className={`px-5 py-5 font-medium text-gray-700 ${
                      credit.isPaid === false
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {credit.isPaid === false ? "Impayé" : "Payé"}
                  </td>
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
                          Recouvrements
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-lg">
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-lg">
                          Valider
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-lg">
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
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
              Ajouter une nouvelle dette
            </h3>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="w-full space-y-6 py-10">
                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="clientName">Nom du client</label>
                  <input
                    {...register("clientName", {
                      required: "Le nom du client est obligatoire",
                      minLength: {
                        value: 2,
                        message:
                          "Le nom du client doit contenir au moins 2 caractères",
                      },
                    })}
                    type="text"
                    name="clientName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer le nom du client"
                  />
                  {formState.errors.clientName && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.clientName.message}
                    </p>
                  )}
                </div>

                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="phone">Téléphone</label>
                  <PhoneInput
                    defaultCountry="BJ"
                    {...register("phoneNumber", {
                      required: "Le numéro de téléphone est obligatoire",
                    })}
                  />
                  {formState.errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="product">Produit acheté</label>
                  <select
                    {...register("product", {
                      required: "Le produit acheté est obligatoire",
                    })}
                    name="product"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Sélectionner un produit
                    </option>
                    <option value="Ciment">Ciment</option>
                    <option value="Fer à béton">Fer à béton</option>
                    <option value="Peinture">Peinture</option>
                    <option value="Carrelage">Carrelage</option>
                    <option value="Plâtre">Plâtre</option>
                  </select>
                  {formState.errors.product && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.product.message}
                    </p>
                  )}
                </div>

                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="quantity">Quantité</label>
                  <input
                    {...register("quantity", {
                      required: "La quantité est obligatoire",
                      min: {
                        value: 1,
                        message: "La quantité doit être au moins de 1",
                      },
                    })}
                    type="number"
                    name="quantity"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Quantité achetée"
                  />
                  {formState.errors.quantity && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.quantity.message}
                    </p>
                  )}
                </div>

                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="unitPrice">Prix Unitaire</label>
                  <input
                    {...register("unitPrice", {
                      required: "Le prix unitaire est obligatoire",
                      min: {
                        value: 1,
                        message: "Le prix unitaire doit être supérieur à 0",
                      },
                    })}
                    type="number"
                    name="unitPrice"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Prix unitaire"
                  />
                  {formState.errors.unitPrice && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.unitPrice.message}
                    </p>
                  )}
                </div>

                <button className="auth-btn w-full mt-5 bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d5850c] focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:ring-offset-2 transition-all shadow-lg">
                  Enrégistrer la dette
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
