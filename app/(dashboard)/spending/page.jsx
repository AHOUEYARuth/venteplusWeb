"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { spendingStore } from "./spendingStore/spendingStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdOutlineMoreVert, MdSearch } from "react-icons/md";
import { IoMdArrowDropup, IoMdClose } from "react-icons/io";
import { FiArrowUpRight } from "react-icons/fi";
import gsap from "gsap";
import { useForm } from "react-hook-form";
import { useLoginStore } from "@/app/login/loginStore/loginStore";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import moment from "moment";

export default function Spending() {
  const container = useRef(null);
  const timeLineModal = useRef();
  const [expenseLoadind, setexpenseLoadind] = useState(false);
  const {
    spendings,
    fetchData,
    expenseActions,
    getExpenseAction,
    setExpenses,
  } = spendingStore();
  const { shop } = useLoginStore();

  const { register, handleSubmit, watch, formState, trigger, reset } = useForm({
    mode: "onChange",
  });

  async function applyGetExpenseAction(shopId) {
    setexpenseLoadind(true);
    await getExpenseAction(shopId).then((response) => {
      console.log("data");
      console.log(response.data);
      setExpenses(response.data);
      setexpenseLoadind(false);
    });
  }

  async function submitForm(data) {
    setexpenseLoadind(true);
    const payload = {
      ...data,
      shopId: shop?.id,
      spendAmount: parseInt(data.spendAmount),
      date: new Date(data.date),
    };
    await expenseActions(payload)
      .then((response) => {
        console.log("data");
        console.log(response);
        toast.success("Dépense ajouté avec succès");
        applyGetExpenseAction(shop?.id);
        reset();
        timeLineModal.current.reversed(true);
      })
      .catch((error) => {
        console.log(error);
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Dépense non ajouté ");
        }
      })
      .finally(() => {
        setexpenseLoadind(false);
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
      setexpenseLoadind(true);
      console.log("shop");
      console.log(shop);
      if (shop?.id) {
        applyGetExpenseAction(shop?.id);
      }
    })();
  }, [shop]);
  return (
    <div ref={container} className="w-full h-full p-5 bg-gray-50 rounded-xl">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold ">Dépenses</h2>
          <p className="text-gray-500 text-xl pt-5">
            Gardez le contrôle sur vos charges et achats. Suivez vos dépenses
            pour mieux maîtriser votre rentabilité.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-row flex-wrap items-center py-8 gap-x-10">
        <div className="w-90 bg-gradient-to-br from-[#F39C12]/70 to-[#F39C12] text-white rounded-xl p-5 shadow-md hover:shadow-xl flex flex-col justify-between cursor-pointer">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold">Montant dépensé (FCFA)</h2>
            <div className="bg-white hover:bg-white/30 transition-colors rounded-full p-2">
              <FiArrowUpRight className="text-[#F39C12]" size={16} />
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-4xl font-semibold">20 000</h2>
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
            <h2 className="text-2xl font-bold">Bénéfice du mois(FCFA)</h2>
            <div className="bg-[#F39C12] hover:bg-white/30 transition-colors rounded-full p-2">
              <FiArrowUpRight className="text-white" size={16} />
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-4xl font-semibold">26 000</h2>
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
            <h2 className="text-2xl font-bold">Dettes (FCFA)</h2>
            <div className="bg-[#F39C12] hover:bg-white/30 transition-colors rounded-full p-2">
              <FiArrowUpRight className="text-white" size={16} />
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-4xl font-semibold">0</h2>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <span className="flex items-center gap-1 border border-[#F39C12] px-1 py-0.5 rounded-xl text-lg font-medium">
              3
              <IoMdArrowDropup size={30} />
            </span>
            <p className="text-sm text-[#F39C12]">Progression mensuelle</p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full flex flex-row items-start justify-between mt-20">
          <h2 className="text-2xl font-semibold ">Listes des Dépenses</h2>
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
                Nouvelle Dépense
              </button>
            </div>
          </div>
        </div>
        <div className="w-[95%] overflow-x-auto pb-10 mt-5 bg-white">
          <table className="min-w-full text-xl">
            <thead className=" text-black bg-gray-100  ">
              <tr className="border-b border-gray-200 text-left">
                <th className="p-5">N °</th>
                <th className="p-5">Label</th>
                <th className="p-5">Montant(FCFA)</th>
                <th className="p-5">Description</th>
                <th className="p-5">Date</th>
                <th className=""></th>
              </tr>
            </thead>
            <tbody>
              {spendings.map((Spending, index) => {
                return (
                  <tr
                    key={Spending.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-5">{index + 1}</td>
                    <td className="px-5 py-5 font-bold">{Spending.label}</td>
                    <td className="px-5 py-5 text-black">{Spending.spendAmount}</td>
                    <td className="px-5 py-5 text-black">
                      {Spending.description}
                    </td>
                    <td className="px-5 py-5 text-black">
                      {moment(Spending.date).format('DD-mm-yyyy')}
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
                            Modifier
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
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
              Ajouter une nouvelle dépense
            </h3>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="w-full space-y-6 py-10">
                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="label">Label (Titre)</label>
                  <input
                    {...register("label", {
                      required: "Le titre de la dépense est obligatoire",
                      minLength: {
                        value: 3,
                        message: "Le titre doit contenir au moins 3 caractères",
                      },
                    })}
                    type="text"
                    name="label"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer le titre de la dépense"
                  />
                  {formState.errors.label && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.label.message}
                    </p>
                  )}
                </div>

                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="spendAmount">Montant dépensé</label>
                  <input
                    {...register("spendAmount", {
                      required: "Le montant dépensé est obligatoire",
                      min: {
                        value: 1,
                        message: "Le montant doit être supérieur à 0",
                      },
                    })}
                    type="number"
                    name="spendAmount"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer le montant dépensé"
                  />
                  {formState.errors.spendAmount && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.spendAmount.message}
                    </p>
                  )}
                </div>

                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="description">Description</label>
                  <input
                    {...register("description", {
                      required: "La description est obligatoire",
                      minLength: {
                        value: 5,
                        message:
                          "La description doit contenir au moins 5 caractères",
                      },
                    })}
                    type="text"
                    name="description"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer une brève description"
                  />
                  {formState.errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.description.message}
                    </p>
                  )}
                </div>

                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="date">Date de la dépense</label>
                  <input
                    {...register("date", {
                      required: "La date de la dépense est obligatoire",
                    })}
                    type="date"
                    name="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer la date de la dépense"
                  />
                  {formState.errors.date && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.date.message}
                    </p>
                  )}
                </div>

                <button className="auth-btn w-full flex flex-row items-center justify-center gap-x-2 mt-5 bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d5850c] focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:ring-offset-2 transition-all shadow-lg">
                  Enrégistrer la dépense{" "}
                  {expenseLoadind ? (
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
