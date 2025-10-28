"use client";
import React, { useState, useEffect } from "react";
import { useForm, useFormContext } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import RegisterP from "@/assets/images/login.jpg";
import "@/style/style.scss";
import { PhoneInput } from "@/components/ui/phone-input";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { registerStore } from "../register/registerStore/registerStore";
import toast, { Toaster } from "react-hot-toast";
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

export default function RegisterEmployee()  {
  const { activeForm, setActiveForm, registerAction, employeeRegisterAction } =
    registerStore();
  const [logoImg, setLogoImg] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [loading, setloading] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [params, setParams] = useState({})
  const router = useRouter();
  const [shopId, setshopId] = useState("");
  const [role, setrole] = useState("");

  const registerLink =
    "register-employee/?shopId=68f7be93cc6ba0ba5233b885&role=TRADER";
  /* const role = searchParams.get("role");
  const shopId = searchParams.get("shopId"); */
  /* console.log("Employee rôle");
  console.log(role); 
  console.log("Shop id");
  console.log(shopId); */


   

  useEffect(() => {
    const query = window.location.search
    const searchParams = new URLSearchParams(query)
    const entries = Object.fromEntries(searchParams.entries())
    setshopId(entries.shopId)
    setrole(entries.role)
    console.log("entries");
    console.log(entries)
    setParams(entries)
  }, [])

  const { register, handleSubmit, watch, formState, trigger, reset } =
    useForm({
      mode: "onChange",
    });

  function previewCoverImage(e) {
    if (e.target.files && e.target.files[0]) {
      setCoverImg(URL.createObjectURL(e.target.files[0]));
    }
  }

  function previewLogoImage(e) {
    if (e.target.files && e.target.files[0]) {
      setLogoImg(URL.createObjectURL(e.target.files[0]));
    }
  }

  async function submitForm(data) {
    setloading(true);
    console.log();
    const payload = {
      ...data,
      shopId: shopId,
      role: role.toString().toUpperCase(),
      avatar: data?.avatar[0],
      identityCard: data?.identityCard[0],
    };
    await employeeRegisterAction(payload)
      .then((response) => {
        setloading(false);
        console.log(response);
        reset();
        setisModalOpen(true);
      })
      .catch((error) => {
        setloading(false);
        console.log(error);
        if (error.message) toast.error(error.message);
        
      });
  }
  async function validatoreStep() {
    trigger().then((isValid) => {
      if (isValid) {
        setActiveForm(activeForm + 1);
      }
    });
  }
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
      <Dialog open={isModalOpen} onOpenChange={setisModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg">Inscription réussie</DialogTitle>
            <DialogDescription className="text-base">
              Veuillez attendre la validation de votre compte par
              l'administrateur de la boutique
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="w-[50] sm:justify-start items-center justify-center">
            <button
              type="button"
              className="w-[100px] auth-btn border border-1 border-[#F39C12] text-[#F39C12] flex flex-row items-center justify-center gap-x-2 w-full mt-5  py-2 px-4 rounded-lg font-semibold hover:bg-[#F39C12] hover:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:ring-offset-2 transition-all shadow-lg"
              onClick={() => setisModalOpen(false)}
              variant="ghost"
            >
              Ok
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="content w-[55%] bg-white rounded-xl flex items-center justify-between p-8">
        <div className="custom-box w-[50%] overflow-hidden">
          <div className="px-8 center-text">
            <h2 className="text-3xl font-bold mb-2 text-gray-700">
              Bienvenue sur Vente+
            </h2>
            <h2 className="text-2xl font-semibold mb-4 text-black">
              Créez votre compte
            </h2>
            <p className="text-gray-700">
              Inscrivez-vous pour rejoindre la communauté Vente+
            </p>
          </div>

          <form onSubmit={handleSubmit(submitForm)}>
            {activeForm === 1 ? (
              <div className="px-8 py-5">
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Nom
                  </label>
                  <input
                    {...register("name", {
                      required: "Le nom  est obligatoire",
                    })}
                    key={1}
                    name="name"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrez votre nom "
                  />
                  {formState.errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Prénoms
                  </label>
                  <input
                    {...register("firstName", {
                      required: "Le nom complet est obligatoire",
                    })}
                    key={1}
                    name="firstName"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrez vos prénoms"
                  />
                  {formState.errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Adresse e-mail
                  </label>
                  <input
                    {...register("email", {
                      required: "L'adresse e-mail est obligatoire",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Adresse e-mail invalide",
                      },
                    })}
                    key={2}
                    name="email"
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrez votre adresse e-mail"
                  />
                  {formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Téléphone
                  </label>
                  <PhoneInput
                    defaultCountry="BJ"
                    onChange={(e) => console.log(e)}
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

                <button
                  type="button"
                  onClick={() => validatoreStep()}
                  className="auth-btn w-[50%] bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d5850c] focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:ring-offset-2 transition-all shadow-lg"
                >
                  Suivant
                </button>

                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Vous avez déjà un compte ?{" "}
                    <Link
                      href="/login"
                      className="text-[#F39C12] font-semibold"
                    >
                      Se connecter
                    </Link>
                  </p>
                </div>
              </div>
            ) : activeForm === 2 ? (
              <div className="px-8 py-5">
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Mot de passe
                  </label>
                  <input
                    {...register("password", {
                      required: "Le mot de passe est obligatoire",
                      minLength: {
                        value: 6,
                        message:
                          "Le mot de passe doit contenir au moins 6 caractères",
                      },
                    })}
                    key={4}
                    name="password"
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Créez un mot de passe"
                  />
                  {formState.errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Confirmer le mot de passe
                  </label>
                  <input
                    {...register("confirmPassword", {
                      required: "Veuillez confirmer le mot de passe",
                      validate: (value) =>
                        value === watch("password") ||
                        "Les mots de passe ne correspondent pas",
                    })}
                    key={5}
                    mame="confirmPassword"
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Confirmez le mot de passe"
                  />
                  {formState.errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Photo de profil
                  </label>
                  <input
                    {...register("avatar", {
                      required: "Le nom complet est obligatoire",
                    })}
                    name="avatar"
                    type="file"
                    multiple={false}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrez votre nom complet"
                  />
                  {formState.errors.avatar && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.avatar.message}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label className="blocRegisterk text-gray-700 text-sm font-medium mb-2">
                    Carte d&apos;Identité
                  </label>
                  <input
                    {...register("identityCard", {
                      required: "Le nom complet est obligatoire",
                    })}
                    name="identityCard"
                    type="file"
                    multiple={false}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrez votre nom complet"
                  />
                  {formState.errors.identityCard && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.identityCard.message}
                    </p>
                  )}
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveForm(1)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-all shadow-lg"
                  >
                    Précédent
                  </button>
                  <button
                    type="submit"
                    className="auth-btn w-[50%] flex flex-row items-center gap-x-2 justify-center bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d6860f] focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:ring-offset-2 transition-all shadow-lg"
                  >
                    Se connecter{" "}
                    {loading ? <ClipLoader color="white" size={20} /> : null}
                  </button>
                </div>
              </div>
            ) : null}
          </form>
        </div>

        <div className="max-w-md h-auto login">
          <Image
            src={RegisterP}
            alt="Illustration inscription"
            className="w-full rounded-t-md object-cover"
            priority
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
};


