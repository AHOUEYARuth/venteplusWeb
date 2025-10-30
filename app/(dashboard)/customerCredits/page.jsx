"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  customerCredits,
  useCustomerCreditsStore,
} from "./customerCreditsStore/customerCreditsStore";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useLoginStore } from "@/app/login/loginStore/loginStore";
import { ClipLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import { DatePicker } from "@/components/ui/date-picker";
import moment from "moment";
import Product2 from "@/assets/images/emptyPro.png";
export default function CustomerCredits() {
  const {
    customersCredits,
    recoveries,
    setRecoveries,
    setCustomersCredits,
    getRecoveryCreditAction,
    createRecoveryAction,
    getCustomersCreditsAction,
    filterCreditsAction,
  } = useCustomerCreditsStore();
  const { shop } = useLoginStore();
  const container = useRef(null);
  const timeLineModal = useRef();
  const [customerCreditsId, setcustomerCreditsId] = useState("");
  const [loadingRecovery, setloadingRecovery] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [nameFilter, setnameFilter] = useState("");
  const [rangeDate, setRangeDate] = useState(null);
  const [listLoading, setlistLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const submitForm = async (data) => {
    setloadingRecovery(true);
    const payload = {
      ...data,
      customerCreditId: customerCreditsId,
    };
    await createRecoveryAction(payload)
      .then((response) => {
        toast.success("Recouvrement effectué avec succès");
        applyGetCustomersCreditAction(shop?.id);
        reset();
        setisModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Recouvrement impossible");
        }
      })
      .finally(() => {
        setloadingRecovery(false);
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

  async function applyGetCustomersCreditAction(shopId) {
    setCustomersCredits([]);
    setlistLoading(true);
    await getCustomersCreditsAction(shopId)
      .then((response) => {
        setCustomersCredits(response.data);
      })
      .catch((error) => {})
      .finally(() => {
        setlistLoading(false);
      });
  }
  async function applyGetRecoveryCreditAction(customerCreditId) {
    setloadingRecovery(true);
    await getRecoveryCreditAction(customerCreditId).then((response) => {
      setRecoveries(response.data);
      setloadingRecovery(false);
    });
  }
  useEffect(() => {
    (function init() {
      if (shop?.id) {
        applyGetCustomersCreditAction(shop?.id);
      }
    })();
  }, [shop]);

  useEffect(() => {
    (async function handleFilter() {
      if (nameFilter != "" || rangeDate != null) {
        const dateFrom = rangeDate?.from;
        const dateTo = rangeDate?.to;
        await filterCreditsAction(
          shop?.id,
          nameFilter,
          dateFrom != undefined && dateFrom != null
            ? moment(dateFrom).format("DD-MM-YYYY")
            : dateFrom,
          dateTo != undefined && dateTo != null
            ? moment(dateTo).format("DD-MM-YYYY")
            : dateTo
        ).then((response) => {
          setCustomersCredits(response.data);
        });
      } else {
        if (shop?.id) {
          await applyGetCustomersCreditAction(shop?.id);
        }
      }
    })();
  }, [nameFilter, rangeDate]);

  function handleClearFilter() {
    setnameFilter("");
    setRangeDate("");
  }
  return (
    <div ref={container} className="w-full h-full p-5 bg-gray-50 rounded-xl">
      <Dialog open={isModalOpen} onOpenChange={setisModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg">Faire un recouvrement</DialogTitle>
            <DialogDescription className="text-base">
              Avant de lancer le recouvrement vous devez mettre le montant payer
              par le client.
            </DialogDescription>
          </DialogHeader>
          <form action="" onSubmit={handleSubmit(submitForm)}>
            <div className="w-full space-y-5 py-10">
              <div className="w-full flex flex-col gap-y-2">
                <label>Montant payer</label>
                <input
                  type="number"
                  {...register("amountPaid", {
                    required: "Le montant est obligatoire",
                    valueAsNumber: true,
                  })}
                  name="amountPaid"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                  placeholder="Entrer le montant  payé"
                />
                {errors.amountPaid && (
                  <p className="text-red-500 text-sm">
                    {errors.amountPaid.message}
                  </p>
                )}
              </div>

              <DialogFooter className="sm:justify-start items-center justify-center">
                <button
                  type="submit"
                  className="w-50 auth-btn flex flex-row items-center justify-center gap-x-2 w-full mt-5 bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d5850c] focus:outline-none focus:ring-2 focus:ring-[#F39C12] cursor-pointer focus:ring-offset-2 transition-all shadow-lg"
                >
                  Valider{" "}
                  {loadingRecovery ? (
                    <ClipLoader color="white" size={20} />
                  ) : null}
                </button>
                <button
                  type="button"
                  className="w-50 auth-btn border border-1 border-gray-600 text-black flex flex-row items-center justify-center gap-x-2 w-full mt-5 text-black py-3 px-4 rounded-lg font-semibold hover:bg-[#000] hover:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#000] focus:ring-offset-2 transition-all shadow-lg"
                  onClick={() => setisModalOpen(false)}
                  variant="ghost"
                >
                  Fermer
                </button>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold ">Dettes Clients</h2>
          <p className="text-gray-500 text-xl pt-3">
            Gérez les crédits accordés à vos clients. Suivez les remboursements
            et relancez facilement les paiements en attente.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full flex flex-row items-start justify-between mt-20">
          <h2 className="text-2xl font-semibold ">Listes des Dettes Clients</h2>
          <div className="w-[50%] flex flex-row items-center justify-center gap-x-4">
            <div className="w-[40%] relative flex items-center justify-between bg-white gap-x-2 rounded-lg">
              <input
                type="text"
                onChange={(event) => setnameFilter(event.target.value)}
                placeholder="Recherche par nom"
                className="bg-white text-sm py-3 pl-2 outline-hidden rounded-lg focus:outline-none  transition-all"
              />
              <button className="py-3 bg-[#F39C12] text-white rounded-tr-lg rounded-br-lg cursor-pointer px-4">
                <MdSearch size={25} />
              </button>
            </div>
            <div className="w-[70%] flex flex-row gap-x-4 items-center">
              <DatePicker
                className="p-5"
                onDateChange={(range) => setRangeDate(range)}
              />
              <button
                onClick={() => {
                  handleClearFilter();
                }}
                className="border-1 border-[#F39C12] text-[#F39C12] hover:bg-[#F39C12] cursor-pointer py-3 px-4 hover:text-white rounded-lg"
              >
                Effacer le filtre
              </button>
            </div>
          </div>
        </div>
        {listLoading ? (
          <div className="w-full h-[500px] flex items-center justify-center">
            <ClipLoader color="#F39C12" size={50} />
          </div>
        ) : (
          <div className="w-full overflow-x-auto pb-10 mt-5 bg-white">
            {customersCredits.length === 0 ? (
              <div className="w-full flex flex-col items-center gap-y-2 text-center py-5">
                <div
                  className="w-[50%] sm:w-[100%] lg:w-[32%] h-[200px] relative overflow-hidden bg-contain bg-center bg-no-repeat cursor-pointer"
                  style={{ backgroundImage: `url(${Product2.src})` }}
                ></div>
                <div>
                  <p className="text-2xl font-bold">
                    Aucun crédit client trouvé
                  </p>
                  <p className="">
                    Crédits client vide. La liste des crédits client s'affiche
                    ici
                  </p>
                </div>
              </div>
            ) : (
              <table className="min-w-full text-xl">
                <thead className=" text-black bg-gray-100">
                  <tr className="border-b border-gray-200 text-left">
                    <th className="p-5">Client</th>
                    <th className="p-5">Téléphone</th>
                    <th className="p-5">Produit</th>
                    <th className="p-5">Quantité</th>
                    <th className="p-5 ">Unité(FCFA)</th>
                    <th className="p-5 ">Reste(FCFA)</th>
                    <th className="p-5 ">Payé(FCFA)</th>
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
                      <td className="px-5 py-5 font-bold">
                        {credit.customer.name} {credit.customer.firstName}
                      </td>
                      <td className="px-5 py-5 text-black">
                        {credit.customer.phoneNumber}
                      </td>
                      <td className="px-5 py-5">
                        {credit.order.toOrders[0].product.name}
                      </td>
                      <td className="px-5 py-5">
                        {credit.order.toOrders[0].quantity}
                      </td>
                      <td className="px-5 py-5 font-medium text-gray-700">
                        {credit.order.toOrders[0].product.salePrice}
                      </td>
                      <td className="px-5 py-5 font-medium text-gray-700">
                        {credit.order.totalAmount - credit.amountPaid}
                      </td>
                      <td className="px-5 py-5 font-medium text-green-600">
                        {credit.amountPaid}
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
                          <DropdownMenuTrigger
                            onClick={() => setcustomerCreditsId(credit.id)}
                            className="border border-transparent focus:border focus:border-transparent active:border active:border-transparent"
                          >
                            <MdOutlineMoreVert />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-70 border border-transparent">
                            <DropdownMenuLabel className="text-xl">
                              Actions
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setcustomerCreditsId(credit.id);
                                setisModalOpen(true);
                              }}
                              className="text-lg"
                            >
                              Faire un Recouvrements
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setcustomerCreditsId(credit.id);
                                applyGetRecoveryCreditAction(credit.id);
                                timeLineModal.current.play();
                              }}
                              className="text-lg"
                            >
                              Recouvrements
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-lg">
                              Valider
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
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
              Liste des recouvrements
            </h3>
            {loadingRecovery ? (
              <div className="w-full h-[500px] flex items-center justify-center">
                <ClipLoader color="#F39C12" size={50} />
              </div>
            ) : recoveries.length === 0 ? (
              <div className="text-center mt-10 text-xl">
                Aucun recouvrement enrégistré
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                {recoveries.map((recovery) => (
                  <div
                    key={recovery.id}
                    className="w-full flex flex-row items-center justify-between border rounded-lg p-3 border-gray-200 py-3"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-lg text-gray-700">
                        Montant payé: {recovery.amountPaid} FCFA
                      </span>
                      <span className="text-gray-500 text-lg text-sm">
                        Date:{" "}
                        {new Date(recovery.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
