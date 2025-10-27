"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
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
import { useForm } from "react-hook-form";
const Employee = () => {
  const container = useRef(null);
  const timeLineModal = useRef();
  const { employees, fetchData } = employeeStore();

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
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <div ref={container} className="w-full h-full p-5 bg-gray-50 rounded-xl">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold ">Employées</h2>
          <p className="text-gray-500 text-xl pt-3">
            Attribuez des rôles, surveillez les performances et organisez le
            travail de votre équipe en toute efficacité.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full flex flex-row items-start justify-between mt-20">
          <h2 className="text-2xl font-semibold ">Listes des Employées</h2>
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
                Nouveau Employée
              </button>
            </div>
          </div>
        </div>
        <div className="w-[95%] overflow-x-auto pb-10 mt-5 bg-white">
          <table className="min-w-full text-xl">
            <thead className=" text-black bg-gray-100  ">
              <tr className="border-b border-gray-200 text-left">
                <th className="p-5">Nom</th>
                <th className="p-5">Prénoms</th>
                <th className="p-5">Post</th>
                <th className="p-5">Téléphone</th>
                <th className="p-5">Salaire (FCFA)</th>
                <th className="p-5">Date d&apos;embauche</th>
                <th className=""></th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-5 text-black">{employee.name}</td>
                  <td className="px-5 py-5">{employee.firstName}</td>
                  <td className="px-5 py-5">{employee.role}</td>
                  <td className="px-5 py-5">{employee.phoneNumber}</td>
                  <td className="px-5 py-5">{employee.salary}</td>
                  <td className="px-5 py-5">{employee.hireDate}</td>
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
                        <DropdownMenuItem className="text-lg">
                          Valider
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-lg">
                          Voir carte d&apos;identité
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-lg">
                          Bloquer
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
    </div>
  );
};

export default Employee;
