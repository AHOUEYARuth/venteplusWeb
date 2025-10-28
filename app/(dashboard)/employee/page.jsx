"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MdOutlineMoreVert, MdSearch } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { PhoneInput } from "@/components/ui/phone-input";
import { employeeStore } from "./employeeStore/employeeStore";
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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { useForm } from "react-hook-form";
import { useLoginStore } from "@/app/login/loginStore/loginStore";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { baseUrlNotApi } from "@/lib/httpClient";
import { DatePicker } from "@/components/ui/date-picker";
import copy from "copy-to-clipboard";
const Employee = () => {
  const container = useRef(null);
  const timeLineModal = useRef();
  const [employeLoading, setemployeLoading] = useState(false);
  const {
    employees,
    getEmployeeAction,
    setEmployees,
    validateEmployeAccountAction,
    blockedEmployeeAction,
    filterEmployeeAction,
  } = employeeStore();
  const { shop } = useLoginStore();
  const [isModalOpen, setisModalOpen] = useState(false);
  const [traderId, settraderId] = useState("");
  const [isIdentityCardOpen, setIsIdentityCardOpen] = useState(false);
  const [currentIdentityUrl, setcurrentIdentityUrl] = useState("");
  const [isModalBlockedOpen, setIsModalBlockedOpen] = useState(false);
  const [linkModalOPen, setLinkModalOPen] = useState(false);
  const [shopId, setshopId] = useState("");
  const [role, setrole] = useState("")

  const [nameFilter, setnameFilter] = useState("");
  const [rangeDate, setRangeDate] = useState(null);

  function copyLink() {
    setemployeLoading(true)
   try {
    const base = "http://localhost:3000";
    const registerLink = `/register-employee/?shopId=${shop?.id}&role=${role}`;
    const link = base + registerLink;
    toast.success('Lien copié avec succès')
     setLinkModalOPen(false)
     setemployeLoading(false);
    return copy(link);
   } catch (error) {
    toast.error(error.message)
   }
  }

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

  async function applyValidateEmployeeAction(traderId, shopId) {
    setemployeLoading(true);
    await validateEmployeAccountAction(traderId, shopId)
      .then(async (response) => {
        setisModalOpen(false);
        if (response.message) toast.success(response.message);
        await applyGetEmployeAction(shop?.id);
      })
      .catch((error) => {
        toast.error(
          error.message
            ? error.message
            : "Un problème est survenu lors de validation du compte"
        );
      })
      .finally(() => {
        setemployeLoading(false);
      });
    await getEmployeeAction(shop?.id);
  }

  async function applyBlockedEmployeeAction(traderId, shopId) {
    setemployeLoading(true);
    await blockedEmployeeAction(traderId, shopId)
      .then(async (response) => {
        setIsModalBlockedOpen(false);
        if (response.message) toast.success(response.message);
        await applyGetEmployeAction(shop?.id);
      })
      .catch((error) => {
        toast.error(
          error.message
            ? error.message
            : "Un problème est survenu lors du blockage du compte"
        );
      })
      .finally(() => {
        setemployeLoading(false);
      });
    await getEmployeeAction(shop?.id);
  }

  async function applyGetEmployeAction(shopId) {
    setemployeLoading(true);
    await getEmployeeAction(shopId).then((response) => {
      console.log("data");
      console.log(response.data);
      setEmployees(response.data);
      setemployeLoading(false);
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
    (async function handleFilter() {
      if (nameFilter != "" || rangeDate != null) {
        const dateFrom = rangeDate?.from;
        const dateTo = rangeDate?.to;
        await filterEmployeeAction(
          shop?.id,
          nameFilter,
          dateFrom != undefined && dateFrom != null
            ? moment(dateFrom).format("DD-MM-YYYY")
            : dateFrom,
          dateTo != undefined && dateTo != null
            ? moment(dateTo).format("DD-MM-YYYY")
            : dateTo
        ).then((response) => {
          setEmployees(response.data);
        });
      } else {
        if (shop?.id) {
          await applyGetEmployeAction(shop?.id);
        }
      }
    })();
  }, [nameFilter, rangeDate]);

  function handleClearFilter() {
    setnameFilter("");
    setRangeDate("");
  }

  useEffect(() => {
    (function init() {
      setemployeLoading(true);
      console.log("shop");
      console.log(shop);
      if (shop?.id) {
        applyGetEmployeAction(shop?.id);
      }
    })();
  }, [shop]);
  return (
    <div ref={container} className="w-full h-full p-5 bg-gray-50 rounded-xl">
      <Dialog open={isModalOpen} onOpenChange={setisModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg">Valider un compte</DialogTitle>
            <DialogDescription className="text-base">
              Voulez-vous vraiment valider ce compte?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start items-center justify-center">
            <button
              onClick={() => applyValidateEmployeeAction(traderId, shopId)}
              className="w-50 auth-btn flex flex-row items-center justify-center gap-x-2 w-full mt-5 bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d5850c] focus:outline-none focus:ring-2 focus:ring-[#F39C12] cursor-pointer focus:ring-offset-2 transition-all shadow-lg"
            >
              OUI{" "}
              {employeLoading ? <ClipLoader color="white" size={20} /> : null}
            </button>
            <button
              type="button"
              className="w-50 auth-btn border border-1 border-gray-600 text-black flex flex-row items-center justify-center gap-x-2 w-full mt-5 text-black py-3 px-4 rounded-lg font-semibold hover:bg-[#000] hover:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#000] focus:ring-offset-2 transition-all shadow-lg"
              onClick={() => setisModalOpen(false)}
              variant="ghost"
            >
              NON
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isModalBlockedOpen} onOpenChange={setIsModalBlockedOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg">Bloqué l'employé</DialogTitle>
            <DialogDescription className="text-base">
              Voulez vous bloquer l'employé ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start items-center justify-center">
            <button
              onClick={() => applyBlockedEmployeeAction(traderId, shopId)}
              className="w-50 auth-btn flex flex-row items-center justify-center gap-x-2 w-full mt-5 bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d5850c] focus:outline-none focus:ring-2 focus:ring-[#F39C12] cursor-pointer focus:ring-offset-2 transition-all shadow-lg"
            >
              OUI{" "}
              {employeLoading ? <ClipLoader color="white" size={20} /> : null}
            </button>
            <button
              type="button"
              className="w-50 auth-btn border border-1 border-gray-600 text-black flex flex-row items-center justify-center gap-x-2 w-full mt-5 text-black py-3 px-4 rounded-lg font-semibold hover:bg-[#000] hover:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#000] focus:ring-offset-2 transition-all shadow-lg"
              onClick={() => setIsModalBlockedOpen(false)}
              variant="ghost"
            >
              NON
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isIdentityCardOpen} onOpenChange={setIsIdentityCardOpen}>
        <DialogContent className="w-fit flex flex-col items-center">
          <DialogHeader>
            <DialogTitle className="text-lg"></DialogTitle>
          </DialogHeader>
          <div
            className="w-[500px] h-[300px] rounded-lg bg-center bg-contain bg-no-repeat"
            style={{
              backgroundImage: `url("${baseUrlNotApi}${currentIdentityUrl}")`,
            }}
          ></div>
        </DialogContent>
      </Dialog>

      <Dialog open={linkModalOPen} onOpenChange={setLinkModalOPen} >
        <DialogContent className="w-[500px] ">
          <DialogHeader>
            <DialogTitle className="text-lg">Inviter un employé</DialogTitle>
            <DialogDescription className="text-base">
              Avant d'ajouter un employé vous devez définir le rôle de ce
              dernier
            </DialogDescription>
          </DialogHeader>
          <div className="w-full space-y-5 py-10">
            <div className="w-full flex flex-col gap-y-2">
              <label>Nom</label>
              <select
                name="role"
                onChange={(e) => setrole(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
              >
                <option value="">Rôle</option>
                <option value="MANAGER">Gérant</option>
                <option value="DELIVERYMAN">Livreur</option>
                <option value="CASHIER">Caissier</option>
              </select>
            </div>

            <DialogFooter className="sm:justify-start items-center justify-center">
              <button
                type="submit"
                onClick={() => copyLink()}
                className="w-50 auth-btn flex flex-row items-center justify-center gap-x-2 w-full mt-5 bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d5850c] focus:outline-none focus:ring-2 focus:ring-[#F39C12] cursor-pointer focus:ring-offset-2 transition-all shadow-lg"
              >
                Valider et copier le lien
                {employeLoading ? <ClipLoader color="white" size={20} /> : null}
              </button>
              <button
                type="button"
                className="w-50 auth-btn border border-1 border-gray-600 text-black flex flex-row items-center justify-center gap-x-2 w-full mt-5 text-black py-3 px-4 rounded-lg font-semibold hover:bg-[#000] hover:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#000] focus:ring-offset-2 transition-all shadow-lg"
                onClick={() => setLinkModalOPen(false)}
                variant="ghost"
              >
                Fermer
              </button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold ">Employées</h2>
          <p className="text-gray-500 text-xl pt-3">
            Attribuez des rôles, surveillez les performances et organisez le
            travail de votre équipe en toute efficacité.
          </p>
        </div>
        <button
          /* onClick={() => copyLink(base, registerLink)} */
          onClick={() => setLinkModalOPen(true)}
          className="bg-[#F39C12] cursor-pointer py-3 px-4 text-white rounded-lg"
        >
          Inviter un employé
        </button>
      </div>
      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full flex flex-row items-start justify-between mt-20">
          <h2 className="text-2xl font-semibold ">Listes des Employées</h2>
          <div className=" flex flex-row items-center justify-between gap-x-4">
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
            <div className="w-[60%] flex flex-row gap-x-4 items-center">
              <DatePicker
                className="p-5"
                onDateChange={(range) => setRangeDate(range)}
              />
              <button
                onClick={() => {
                  handleClearFilter();
                }}
                className="w-[200px] bg-[#F39C12] cursor-pointer py-3 px-4 text-white rounded-lg"
              >
                Effacer le filtre
              </button>
            </div>
          </div>
        </div>
        <div className="w-full overflow-x-auto pb-10 mt-5 bg-white">
          <table className="min-w-full text-xl">
            <thead className=" text-black bg-gray-100  ">
              <tr className="border-b border-gray-200 text-left">
                <th className="p-5">Nom</th>
                <th className="p-5">Prénoms</th>
                <th className="p-5">Post</th>
                <th className="p-5">Téléphone</th>
                <th className="p-5">Date d&apos;embauche</th>
                <th className="p-5">Status</th>
                <th className=""></th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-5 text-black">{employee.user.name}</td>
                  <td className="px-5 py-5">{employee.user.firstName}</td>
                  <td className="px-5 py-5">{employee.role}</td>
                  <td className="px-5 py-5">{employee.user.phoneNumber}</td>
                  <td className="px-5 py-5">
                    {moment(employee.user.createdAt).format("DD-MM-yyyy")}
                  </td>
                  <td
                    className={`px-5 py-5 ${
                      employee.isValidate ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {employee.isValidate ? "Validé" : "Non validé"}
                  </td>
                  <td className="pr-3">
                    {" "}
                    <DropdownMenu>
                      <DropdownMenuTrigger className="border border-transparent focus:border focus:border-transparent active:border active:border-transparent">
                        <MdOutlineMoreVert />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-50 border border-transparent">
                        <DropdownMenuLabel className="text-xl">
                          Actions
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {employee.isValidate == false ? (
                          <DropdownMenuItem
                            className="text-lg"
                            onClick={() => {
                              settraderId(employee.traderShops[0].traderId);
                              setshopId(employee.traderShops[0].shopId);
                              setisModalOpen(true);
                            }}
                          >
                            Valider
                          </DropdownMenuItem>
                        ) : undefined}

                        <DropdownMenuItem
                          onClick={() => {
                            setcurrentIdentityUrl(employee.identityCard);
                            setIsIdentityCardOpen(true);
                          }}
                          className="text-lg"
                        >
                          Voir carte d&apos;identité
                        </DropdownMenuItem>
                        {employee.isValidate == true ? (
                          <DropdownMenuItem
                            onClick={() => {
                              settraderId(employee.traderShops[0].traderId);
                              setshopId(employee.traderShops[0].shopId);
                              setIsModalBlockedOpen(true);
                            }}
                            className="text-lg"
                          >
                            Bloquer
                          </DropdownMenuItem>
                        ) : undefined}
                        {employee.isValidate == false ? (
                          <DropdownMenuItem className="text-lg">
                            Supprimer
                          </DropdownMenuItem>
                        ) : undefined}
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
              Ajouter un Employée
            </h3>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="w-full space-y-5 py-10">
                <div className="w-full flex flex-col gap-y-2">
                  <label>Nom</label>
                  <input
                    type="text"
                    {...register("name", { required: "Le nom est requis" })}
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer le nom de l'employée"
                  />
                  {formState.errors.name && (
                    <p className="text-red-500 text-sm">
                      {formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div className="w-full flex flex-col gap-y-2">
                  <label>Prénom</label>
                  <input
                    type="text"
                    {...register("firstName", {
                      required: "Le prénom est requis",
                    })}
                    name="firstName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer le prénom de l'employée"
                  />
                  {formState.errors.firstName && (
                    <p className="text-red-500 text-sm">
                      {formState.errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="w-full flex flex-col gap-y-2">
                  <label>Rôle</label>
                  <input
                    type="text"
                    {...register("role", { required: "Le rôle est requis" })}
                    name="role"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer le rôle de l'employée"
                  />
                  {formState.errors.role && (
                    <p className="text-red-500 text-sm">
                      {formState.errors.role.message}
                    </p>
                  )}
                </div>

                <div className="w-full flex flex-col gap-y-2">
                  <label>Email</label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "L'email est requis",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Adresse email invalide",
                      },
                    })}
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer l'email de l'employée"
                  />
                  {formState.errors.email && (
                    <p className="text-red-500 text-sm">
                      {formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="w-full flex flex-col gap-y-2">
                  <label>Salaire</label>
                  <input
                    type="number"
                    {...register("salary", {
                      required: "Le salaire est requis",
                      min: {
                        value: 1,
                        message: "Le salaire doit être positif",
                      },
                    })}
                    name="salary"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer le salaire de l'employée"
                  />
                  {formState.errors.salary && (
                    <p className="text-red-500 text-sm">
                      {formState.errors.salary.message}
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
                    placeholder="Entrer le numéro de l'employée"
                  />
                  {formState.errors.phoneNumber && (
                    <p className="text-red-500 text-sm">
                      {formState.errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="auth-btn w-full mt-5 bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d5850c] focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:ring-offset-2 transition-all shadow-lg"
                >
                  Ajouter
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

export default Employee;
