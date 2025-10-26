"use client";
import React, { useEffect, useLayoutEffect, useState,useRef } from "react";
import { MdClose, MdOutlineMoreVert, MdSearch } from "react-icons/md";
import { sellingStore, useSellingStore } from "./sellingStore/sellingStore";
import { FaCheckCircle } from "react-icons/fa";
import { RiProgress2Fill } from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { gsap } from "gsap";
import { IoMdArrowDropup, IoMdClose } from "react-icons/io";
import { FiArrowUp, FiArrowUpRight } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useProductStore } from "../product/productStore/productStore";
import { useLoginStore } from "@/app/login/loginStore/loginStore";
import { customerStore } from "../customer/customerStore/customerStore";
import { PhoneInput } from "@/components/ui/phone-input";
import { ClipLoader } from "react-spinners";
import toast,{Toaster} from "react-hot-toast";
import { toBoolean } from "@/lib/utils";

export default function Selling() {
  const { orders, sellings, activeMenu, orderAction ,setActiveMenu,setSellings,getOrdersAndSellingsAction,setOrders } = useSellingStore();
  const { customers,setCustomers,getCustomersAction,customerAction } = customerStore();
  const { products, setProducts, getProductsActions } = useProductStore();
  const { shop } = useLoginStore();
  const [loadingClient, setloadingClient] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const container = useRef(null);
  const timeLineModal = useRef();
  const timeLineModalClient = useRef();

  const { register, setValue, handleSubmit,reset, watch, formState, trigger } = useForm({
    mode: "onChange",
  });
  const {
    register: registerClient,
    handleSubmit: handleSubmitClient,
    reset: resetClient,
    formState: { errors: clientErrors },
  } = useForm()

  


    async function submitFormClient(data) {
      setloadingClient(true);
      const payload = {
        ...data,
        shopId: shop?.id,
      };
      await customerAction(payload)
        .then((response) => {
          toast.success("Client ajouté avec succès");
          applyGetCustomersAction(shop?.id);
          resetClient();
          timeLineModalClient.current.reversed(true);
          setValue("customerId", response.data.id);
          timeLineModal.current.play();
        })
        .catch((error) => {
          console.log(error);
          if (error.message) {
            toast.error(error.message);
          } else {
            toast.error("Client non ajouté ");
          }
        })
        .finally(() => {
          setloadingClient(false);
        });
    }
  const submitForm = async (data) => {
   setLoadingOrder(true);
      const payload = {
        ...data,
        shopId: shop?.id,
        quantity: parseInt(data.quantity, 10),
        isSale: toBoolean(data.isSale),
        isCredit: toBoolean(data.isCredit),
      };
      await orderAction(payload)
        .then((response) => {
          toast.success("Commande ajoutée avec succès");
          if(data.isSale === 'true'){
            setActiveMenu("ventes");
            applyGetSellingsAction(shop?.id);
          }else{
            applyGetOrdersAction(shop?.id);
          }
      
          reset();
          timeLineModal.current.reversed(true);
        })
        .catch((error) => {
          console.log(error);
          if (error.message) {
            toast.error(error.message);
          } else {
            toast.error("Client non ajouté ");
          }
        })
        .finally(() => {
          setLoadingOrder(false);
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

        timeLineModalClient.current = gsap
                .timeline()
                .to(".modal_container_client", {
                  opacity: 1,
                  duration: 0.5,
                })
                .to(
                  ".form_container_client",
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


   async function applyGetOrdersAction(shopId) {
    await getOrdersAndSellingsAction(shopId,false).then((response) => {
      setOrders(response.data);
    });
  }

   async function applyGetSellingsAction(shopId) {
    await getOrdersAndSellingsAction(shopId,true).then((response) => {
      setSellings(response.data);
    });
  }

   async function applyGetCustomersAction(shopId) {
    await getCustomersAction(shopId).then((response) => {
      setCustomers(response.data);
    });
  }
  async function applyGetProductAction(shopId) {
    await getProductsActions(shopId).then((response) => {
      setProducts(response.data);
  
    });
  }
  useEffect(() => {
     (function init() {
       if (shop?.id) {
         applyGetOrdersAction(shop?.id);
         applyGetProductAction(shop?.id);
         applyGetCustomersAction(shop?.id);
       }
     })();
   }, [shop]);

 /*  useEffect(() => {
    fetchData();
  }, []); */

  return (
    <div ref={container} className="w-full h-full p-5 bg-gray-50 rounded-xl">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold ">Commandes et Ventes</h2>
          <p className="text-gray-500 text-xl pt-5">
            Enregistrez vos ventes et suivez vos commandes clients avec
            précision. Chaque transaction est tracée pour une meilleure
            visibilité.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-row flex-wrap items-center py-8 gap-x-10">
        {activeMenu === "commandes" ? (
          <>
            <div className="w-90 bg-gradient-to-br from-[#F39C12]/70 to-[#F39C12] text-white rounded-xl p-5 shadow-md hover:shadow-xl flex flex-col justify-between cursor-pointer">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold">Commandes clients</h2>
                <div className="bg-white hover:bg-white/30 transition-colors rounded-full p-2">
                  <FiArrowUpRight className="text-[#F39C12]" size={16} />
                </div>
              </div>

              <div className="mt-4">
                <h2 className="text-4xl font-semibold">34</h2>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <span className="flex items-center gap-1 border border-white/30 px-1 py-0.5 rounded-xl text-lg font-medium">
                  5
                  <IoMdArrowDropup size={30} />
                </span>
                <p className="text-sm text-white/80">Progression mensuelle</p>
              </div>
            </div>

            <div className="w-90 bg-white text-black rounded-xl p-5 shadow-md hover:shadow-xl flex flex-col justify-between cursor-pointer">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold">Commandes annulées</h2>
                <div className="bg-[#F39C12] hover:bg-white/30 transition-colors rounded-full p-2">
                  <FiArrowUpRight className="text-white" size={16} />
                </div>
              </div>

              <div className="mt-4">
                <h2 className="text-4xl font-semibold">3</h2>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <span className="flex items-center gap-1 border border-[#F39C12] px-1 py-0.5 rounded-xl text-lg font-medium">
                  3
                  <IoMdArrowDropup size={30} />
                </span>
                <p className="text-sm text-[#F39C12]">Progression mensuelle</p>
              </div>
            </div>

            <div className="w-90 bg-white text-black rounded-xl p-5 shadow-md hover:shadow-xl flex flex-col justify-between cursor-pointer">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold">Commandes Livrées</h2>
                <div className="bg-[#F39C12] hover:bg-white/30 transition-colors rounded-full p-2">
                  <FiArrowUpRight className="text-white" size={16} />
                </div>
              </div>

              <div className="mt-4">
                <h2 className="text-4xl font-semibold">10</h2>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <span className="flex items-center gap-1 border border-[#F39C12] px-1 py-0.5 rounded-xl text-lg font-medium">
                  3
                  <IoMdArrowDropup size={30} />
                </span>
                <p className="text-sm text-[#F39C12]">Progression mensuelle</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-90 bg-gradient-to-br from-[#F39C12]/70 to-[#F39C12] text-white rounded-xl p-5 shadow-md hover:shadow-xl flex flex-col justify-between cursor-pointer">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold">Vente du jour</h2>
                <div className="bg-white hover:bg-white/30 transition-colors rounded-full p-2">
                  <FiArrowUpRight className="text-[#F39C12]" size={16} />
                </div>
              </div>

              <div className="mt-4">
                <h2 className="text-4xl font-semibold">10</h2>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <span className="flex items-center gap-1 border border-white/30 px-1 py-0.5 rounded-xl text-lg font-medium">
                  3
                  <IoMdArrowDropup size={30} />
                </span>
                <p className="text-sm text-white/80">Progression mensuelle</p>
              </div>
            </div>

            <div className="w-90 bg-white text-black rounded-xl p-5 shadow-md hover:shadow-xl flex flex-col justify-between cursor-pointer">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold">Bénéfice net(FCFA)</h2>
                <div className="bg-[#F39C12] hover:bg-white/30 transition-colors rounded-full p-2">
                  <FiArrowUpRight className="text-white" size={16} />
                </div>
              </div>

              <div className="mt-4">
                <h2 className="text-4xl font-semibold">15 000</h2>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <span className="flex items-center gap-1 border border-[#F39C12] px-1 py-0.5 rounded-xl text-lg font-medium">
                  3
                  <IoMdArrowDropup size={30} />
                </span>
                <p className="text-sm text-[#F39C12]">Progression mensuelle</p>
              </div>
            </div>

            <div className="w-90 bg-white text-black rounded-xl p-5 shadow-md hover:shadow-xl flex flex-col justify-between cursor-pointer">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold">Bénéfice Total(FCFA)</h2>
                <div className="bg-[#F39C12] hover:bg-white/30 transition-colors rounded-full p-2">
                  <FiArrowUpRight className="text-white" size={16} />
                </div>
              </div>

              <div className="mt-4">
                <h2 className="text-4xl font-semibold">45 000</h2>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <span className="flex items-center gap-1 border border-[#F39C12] px-1 py-0.5 rounded-xl text-lg font-medium">
                  3
                  <IoMdArrowDropup size={30} />
                </span>
                <p className="text-sm text-[#F39C12]">Progression mensuelle</p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full flex flex-row items-start justify-between mt-5">
          <div className="bg-white flex flex-row items-center gap-x-5 rounded-lg p-2">
            <button
              onClick={() => setActiveMenu("commandes")}
              className={`w-[200px] px-2 py-2  rounded-lg text-xl cursor-pointer ${
                activeMenu === "commandes"
                  ? "text-white bg-[#F39C12]"
                  : "text-black"
              }`}
            >
              Commande
            </button>
            <button
              onClick={async () => {
                setActiveMenu("ventes");
                await applyGetSellingsAction(shop?.id);
              }}
              className={`w-[200px] px-2 py-2 rounded-lg text-xl cursor-pointer ${
                activeMenu === "ventes"
                  ? "text-white bg-[#F39C12]"
                  : "text-black"
              }`}
            >
              Ventes
            </button>
          </div>
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
                Nouvelle Commande
              </button>
            </div>
          </div>
        </div>
        <div className="w-[95%] overflow-x-auto pb-10 mt-5 bg-white">
          {activeMenu === "commandes" ? (
            <table className="w-full text-xl ">
              <thead className=" text-black bg-gray-100  ">
                <tr className="border-b border-gray-200 text-left">
                  <th className="p-5">Client</th>
                  <th className="p-5">Téléphone</th>
                  <th className="p-5">Produit</th>
                  <th className="p-5">Quantité</th>
                  <th className="p-5 ">Unité(FCFA)</th>
                  <th className="p-5 ">Total(FCFA)</th>
                  <th className="p-5">livraison</th>
                  <th className="p-5 ">Status</th>
                  <th className=""></th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-5 font-bold">{order.customer.name} {order.customer.firstName}</td>
                    <td className="px-5 py-5">{order.customer.phoneNumber}</td>
                    <td className="px-5 py-5">{order.toOrders[0].product.name}</td>
                    <td className="px-5 py-5">{order.toOrders[0].quantity}</td>
                    <td className="px-5 py-5 font-medium text-gray-700">
                      {order.toOrders[0].product.salePrice}
                    </td>
                    <td className={`px-5 py-5 font-medium ${order.customerCredit ? "text-red-600" : "text-green-600"}`}>
                      {order.totalAmount}
                    </td>
                    <td className="px-5 py-5 text-gray-700">
                      {order.deliveryAddress}
                    </td>
                    <td className="px-5 py-5">
                      <span
                        className={`w-[110px] flex gap-x-2 items-center justify-center text-base  rounded-sm ${
                          order.status === "DELIVERED"
                            ? "bg-green-50"
                            : order.status === "PENDING"
                            ? "bg-blue-50"
                            : order.status === "CANCELLED"
                            ? "bg-red-50"
                            : "text-gray-600"
                        }`}
                      >
                        {order.status === "DELIVERED" ? (
                          <FaCheckCircle size={14} className="text-green-600" />
                        ) : order.status === "PENDING" ? (
                          <RiProgress2Fill
                            size={15}
                            className="text-blue-600"
                          />
                        ) : order.status === "CANCELLED" ? (
                          <MdClose size={15} className="text-red-600" />
                        ) : null}
                        {order.status == "PENDING" ? "En attente" : order.status == "DELIVERED" ? "Livrée" : order.status == "CANCELLED" ? "Annulée" : null}
                      </span>
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
                            Annuler
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-lg">
                            Confirmer
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-lg">
                            Livrer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-xl ">
              <thead className=" text-black bg-gray-100">
                <tr className="border-b border-gray-200 text-left">
                  <th className="p-5">Client</th>
                  <th className="p-5">Téléphone</th>
                  <th className="p-5">Produit</th>
                  <th className="p-5">Quantité</th>
                  <th className="p-5 ">Prix d&apos;achat(FCFA)</th>
                  <th className="p-5 ">Prix vente(FCFA)</th>
                  <th className="p-5 ">Total(FCFA)</th>
                  <th className="p-5 ">Bénéfice net(FCFA)</th>
                </tr>
              </thead>
              <tbody>
                {sellings.map((selling) => (
                  <tr
                    key={selling.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                     <td className="px-5 py-5 font-bold">{selling.customer.name} {selling.customer.firstName}</td>
                    <td className="px-5 py-5">{selling.customer.phoneNumber}</td>
                    <td className="p-5">{selling.toOrders[0].product.name}</td>
                    <td className="p-5">{selling.toOrders[0].quantity}</td>
                    <td className="p-5">{selling.toOrders[0].product.purchasePrice}</td>
                    <td className="p-5">{selling.toOrders[0].product.salePrice}</td>
                    <td className="p-5">{selling.totalAmount}</td>
                    <td className="p-5 text-green-600">{(selling.toOrders[0].product.salePrice - selling.toOrders[0].product.purchasePrice) * selling.toOrders[0].quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>


       <div
        style={{ pointerEvents: "none", opacity: 0 }}
        className={`modal_container_client w-full h-full fixed top-0 right-0 bg-black/30`}
      >
        <div
          style={{ transform: "translateX(200%)", pointerEvents: "all" }}
          className={`form_container_client flex flex-col items-start gap-y-10 bg-white w-110 p-5 rounded-xl h-[96vh] absolute top-5 right-3 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden `}
        >
          <button
            onClick={() => {
              timeLineModalClient.current.reversed(true);
              timeLineModal.current.play();
            }}
          >
            <IoMdClose size={35} />
          </button>
          <div className="w-full">
            <h3 className="text-xl text-[#F39C12] font-bold text-center">
              Ajouter un client
            </h3>
            <form action="" onSubmit={handleSubmitClient(submitFormClient)}>
              <div className="w-full space-y-5 py-10">
                <div className="w-full flex flex-col gap-y-2">
                  <label>Nom du client</label>
                  <input
                    type="text"
                    {...registerClient("name", {
                      required: "Le nom du client est obligatoire",
                    })}
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer le nom du client"
                  />
                  {clientErrors.name && (
                    <p className="text-red-500 text-sm">
                      {clientErrors.name.message}
                    </p>
                  )}
                </div>

                <div className="w-full flex flex-col gap-y-2">
                  <label>Prénom du client</label>
                  <input
                    type="text"
                    {...registerClient("firstName", {
                      required: "Le prénom du client est obligatoire",
                    })}
                    name="firstName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer le prénom du client"
                  />
                  {clientErrors.firstName && (
                    <p className="text-red-500 text-sm">
                      {clientErrors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="w-full flex flex-col gap-y-2">
                  <label>Numéro de téléphone</label>
                  <PhoneInput
                    {...registerClient("phoneNumber", {
                      required: "Le numéro de téléphone est obligatoire",
                    })}
                    defaultCountry="BJ"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer le numéro du client"
                  />
                  {clientErrors.phoneNumber && (
                    <p className="text-red-500 text-sm">
                      {clientErrors.phoneNumber.message}
                    </p>
                  )}
                </div>

                <button type="submit" className="auth-btn flex flex-row items-center justify-center gap-x-2 w-full mt-5 bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d5850c] focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:ring-offset-2 transition-all shadow-lg">
                  Ajouter{" "}
                  {loadingClient ? (
                    <ClipLoader color="white" size={20} />
                  ) : null}
                </button>
              </div>
            </form>
          </div>
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
              Enrégistrer une nouvelle commande
            </h3>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="w-full space-y-6 py-10">
                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="productId">Nom du produit</label>
                  <select
                    {...register("productId", {
                      required: "Le nom du produit est obligatoire",
                    })}
                    name="productId"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Sélectionner un produit
                    </option>
                    {
                      products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))
                    }
  
                  </select>
                  {formState.errors.productId && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.productId.message}
                    </p>
                  )}
                </div>

                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="quantity">Quantité achetée</label>
                  <input
                    {...register("quantity", {
                      required: "La quantité achetée est obligatoire",
                      min: {
                        value: 1,
                        message: "La quantité doit être au moins de 1",
                      },
                    })}
                    type="number"
                    name="quantity"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Quantité"
                  />
                  {formState.errors.quantity && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.quantity.message}
                    </p>
                  )}
                </div>

                 <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="customerId">Client</label>
                  <select
                    {...register("customerId", {
                      required: "Le client est obligatoire",
                    })}
                    name="customerId"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    defaultValue=""
                    
                  >
                    <option value="" disabled>
                      Sélectionner un client
                    </option>
                    {
                      customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.name} {customer.firstName}
                        </option>
                      ))
                    }
  
                  </select>
                  {formState.errors.customerId && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.customerId.message}
                    </p>
                  )}
                </div>


                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="isSale">Vente</label>
                  <select
                    {...register("isSale", {
                      required: false
                    })}
                    name="isSale"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    defaultValue=""
                  >
                    <option value={false}>
                         Non
                    </option>
                    <option value={true}>
                         Oui
                    </option>
                  </select>
                  {formState.errors.productName && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.productName.message}
                    </p>
                  )}
                </div>




                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="isCredit">Est ce un crédit ?</label>
                  <select
                    {...register("isCredit", {
                      required: false
                    })}
                    name="isCredit"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    defaultValue=""
                  >
                    <option value={false}>
                         Non
                    </option>
                    <option value={true}>
                         Oui
                    </option>
                  </select>

                </div>




                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="Addresse de livraison">Addresse de livraison</label>
                  <input
                    {...register("deliveryAddress", {
                      required: false,
                    })}
                    type="text"
                    name="deliveryAddress"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer l'adresse de livraison"
                  />
                  {formState.errors.deliveryAddress && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.deliveryAddress.message}
                    </p>
                  )}
                </div>
                <button type="button" onClick={()=>{
                  timeLineModal.current.reversed(true)
                  timeLineModalClient.current.play();
                }} className="auth-btn w-full mt-5  text-black border border-1 cursor-pointer border-gray-500 py-3 px-4 rounded-lg font-semibold hover:bg-gray focus:outline-none focus:ring-2  focus:ring-offset-2 transition-all">
                  Ajouter un nouveau client
                </button>
                <button className="auth-btn w-full mt-2 bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d5850c] focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:ring-offset-2 transition-all shadow-lg">
                  Enrégistrer la commande{" "}
                  {loadingOrder ? (
                    <ClipLoader color="white" size={20} />
                  ) : null}
                </button>
              </div>
            </form>
            
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
