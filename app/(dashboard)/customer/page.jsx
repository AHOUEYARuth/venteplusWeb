"use client";
import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { IoMdClose } from "react-icons/io";
import { PhoneInput } from "@/components/ui/phone-input";
import { MdOutlineMoreVert, MdSearch } from "react-icons/md";
import { customerStore } from "./customerStore/customerStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { useLoginStore } from "@/app/login/loginStore/loginStore";
import moment from "moment";
import { DatePicker } from "@/components/ui/date-picker";
import Product2 from "@/assets/images/emptyPro.png";
const Customer = () => {
  const container = useRef(null);
  const timeLineModal = useRef();
  const [nameFilter, setnameFilter] = useState("");
  const [rangeDate, setRangeDate] = useState(null);
  const [loadingClient, setloadingClient] = useState(false);
  const [listLoading, setlistLoading] = useState(false)
  const {
    customers,
    customerAction,
    getCustomersAction,
    setCustomers,
    deleteCustomersAction,
    filterCustomerAction,
  } = customerStore();
  const { shop } = useLoginStore();
  const { register, handleSubmit, formState, reset } = useForm({
    mode: "onChange",
  });

  async function applyGetCustomersAction(shopId) {
    setCustomers([]);
    setlistLoading(true);
    await getCustomersAction(shopId).then((response) => {
      console.log("data");
      console.log(response.data);
      setCustomers(response.data);
      setlistLoading(false);
    });
  }

  async function applyDelCustomersAction(customerId) {
    await deleteCustomersAction(customerId)
      .then((response) => {
        toast.success(response?.message);
      })
      .catch((error) => {
        toast.error(
          error.message
            ? error.message
            : "Un problème est survenu lors de la suppression"
        );
      });
    await applyGetCustomersAction(shop?.id);
  }

  async function submitForm(data) {
    setloadingClient(true);
    const payload = {
      ...data,
      shopId: shop?.id,
    };
    await customerAction(payload)
      .then((response) => {
        console.log("data");
        console.log(response);
        toast.success("Client ajouté avec succès");
        applyGetCustomersAction(shop?.id);
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
        setloadingClient(false);
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
      setloadingClient(true);
      console.log("shop");
      console.log(shop);
      if (shop?.id) {
        applyGetCustomersAction(shop?.id);
      }
    })();
  }, [shop]);

  useEffect(() => {
    (async function handleFilter() {
      if (nameFilter != "" || rangeDate != null) {
        const dateFrom = rangeDate?.from;
        const dateTo = rangeDate?.to;
        await filterCustomerAction(
          shop?.id,
          nameFilter,
          dateFrom != undefined && dateFrom != null
            ? moment(dateFrom).format("DD-MM-YYYY")
            : dateFrom,
          dateTo != undefined && dateTo != null
            ? moment(dateTo).format("DD-MM-YYYY")
            : dateTo
        ).then((response) => {
          setCustomers(response.data);
        });
      } else {
        if (shop?.id) {
          await applyGetCustomersAction(shop?.id);
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
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold ">Clients</h2>
          <p className="text-gray-500 text-xl pt-3">
            Suivez vos clients, consultez leur historique d’achat et renforcez
            leur fidélité grâce à une gestion simplifiée.
          </p>
        </div>
        <button
          onClick={() => {
            timeLineModal.current.play();
          }}
          className="bg-[#F39C12] cursor-pointer w-min-fit py-3 px-4 text-white rounded-lg"
        >
          Nouveau Client
        </button>
      </div>
      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full flex flex-row items-start justify-between mt-20">
          <h2 className="text-2xl font-semibold ">Listes des Clients</h2>
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
                className=" bg-[#F39C12] cursor-pointer py-3 px-4 text-white rounded-lg"
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
            {customers.length === 0 ? (
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
                <thead className=" text-black bg-gray-100  ">
                  <tr className="border-b border-gray-200 text-left">
                    <th className="p-5">N °</th>
                    <th className="p-5">Nom</th>
                    <th className="p-5">Prénoms</th>
                    <th className="p-5">Téléphone</th>
                    <th className="p-5">Date d&apos;ajout</th>
                    <th className=""></th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, index) => {
                    return (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-5 py-5 font-bold">{index + 1}</td>
                        <td className="px-5 py-5 text-black">
                          {customer.name}
                        </td>
                        <td className="px-5 py-5">{customer.firstName}</td>
                        <td className="px-5 py-5">{customer.phoneNumber}</td>
                        <td className="px-5 py-5">
                          {moment(customer.createdAt).format("DD-mm-yyyy")}
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
                              <DropdownMenuItem
                                className="text-lg"
                                onClick={() =>
                                  applyDelCustomersAction(customer.id)
                                }
                              >
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
              Ajouter un client
            </h3>
            <form action="" onSubmit={handleSubmit(submitForm)}>
              <div className="w-full space-y-5 py-10">
                <div className="w-full flex flex-col gap-y-2">
                  <label>Nom du client</label>
                  <input
                    type="text"
                    {...register("name", {
                      required: "Le nom du client est obligatoire",
                    })}
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer le nom du client"
                  />
                  {formState.errors.name && (
                    <p className="text-red-500 text-sm">
                      {formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div className="w-full flex flex-col gap-y-2">
                  <label>Prénom du client</label>
                  <input
                    type="text"
                    {...register("firstName", {
                      required: "Le prénom du client est obligatoire",
                    })}
                    name="firstName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer le prénom du client"
                  />
                  {formState.errors.firstName && (
                    <p className="text-red-500 text-sm">
                      {formState.errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="w-full flex flex-col gap-y-2">
                  <label>Numéro de téléphone</label>
                  <PhoneInput
                    {...register("phoneNumber", {
                      required: "Le numéro de téléphone est obligatoire",
                    })}
                    defaultCountry="BJ"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer le numéro du client"
                  />
                  {formState.errors.phoneNumber && (
                    <p className="text-red-500 text-sm">
                      {formState.errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                <button className="auth-btn flex flex-row items-center justify-center gap-x-2 w-full mt-5 bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d5850c] focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:ring-offset-2 transition-all shadow-lg">
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
      <Toaster />
    </div>
  );
};

export default Customer;
