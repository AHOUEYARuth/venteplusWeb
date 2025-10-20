"use client";
import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { registerStore } from "./registerStore/registerStore";
import Image from "next/image";
import Link from "next/link";
import RegisterP from "@/assets/images/login.jpg";
import "@/style/style.scss";

const Register = () => {
  const { activeForm, setActiveForm } = registerStore();
  const [logoImg, setLogoImg] = useState(null);
  const [coverImg, setCoverImg] = useState(null);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState,
  } = useForm();

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

  function submitForm(data) {
    console.log(data);
  }
  function validatoreStep() {
    console.log("Validateur Step");
    console.log(formState.isValid);
    handleSubmit;
    
    //setActiveForm(2);
    /* setActiveForm(2); */
  }

  useEffect(() => {
    (function init() {
     /*  console.log("errors changed:");
      console.log(formState.errors); */
    })();
  }, [formState.errors])


  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
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
                    Nom complet
                  </label>
                  <input
                    {...register("name", {
                      required: "Le nom complet est obligatoire",
                    })}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrez votre nom complet"
                  />
                  {formState.errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.name.message}
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
                  <input
                    {...register("phone", {
                      required: "Le numéro de téléphone est obligatoire",
                      pattern: {
                        value: /^[0-9]{8,15}$/,
                        message: "Numéro de téléphone invalide",
                      },
                    })}
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrez votre numéro de téléphone"
                  />
                  {formState.errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.phone.message}
                    </p>
                  )}
                </div>

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
                    Nom de la boutique
                  </label>
                  <input
                    {...register("shopName", {
                      required: "Le nom de la boutique est obligatoire",
                    })}
                    type="text"
                    name="shopName"
                
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] outline-none transition-all"
                    placeholder="Entrez le nom de votre boutique"
                  />
                  {formState.errors.shopName && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.shopName.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Description
                  </label>
                  <input
                    {...register("description", {
                      required: "La description est obligatoire",
                      minLength: {
                        value: 10,
                        message:
                          "La description doit contenir au moins 10 caractères",
                      },
                    })}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] outline-none transition-all"
                    placeholder="Brève description de votre boutique"
                  />
                  {formState.errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.description.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Adresse
                  </label>
                  <input
                    {...register("address", {
                      required: "L'adresse est obligatoire",
                    })}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] outline-none transition-all"
                    placeholder="Entrez l'adresse de votre boutique"
                  />
                  {formState.errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.address.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Domaine d'activité
                  </label>
                  <input
                    {...register("domain", {
                      required: "Le domaine d'activité est obligatoire",
                    })}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] outline-none transition-all"
                    placeholder="Entrez le domaine d'activité"
                  />
                  {formState.errors.domain && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.domain.message}
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
                    type="button"
                    onClick={() => setActiveForm(3)}
                    className="flex-1 bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d5850c] transition-all shadow-lg"
                  >
                    Suivant
                  </button>
                </div>
              </div>
            ) : activeForm === 3 ? (
              <div className="px-8 py-5">
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Logo
                  </label>
                  <div className="w-full border border-gray-300 flex flex-col justify-between p-5 gap-y-2">
                    <img
                      src={logoImg || "https://placehold.co/400"}
                      alt=""
                      className="w-full h-[100px] object-contain rounded-xl"
                    />
                    <input
                      {...register("logo", {
                        required: "Le logo est obligatoire",
                      })}
                      type="file"
                      accept="image/png, image/jpg, image/jpeg"
                      onChange={previewLogoImage}
                    />
                    {formState.errors.logo && (
                      <p className="text-red-500 text-sm mt-1">
                        {formState.errors.logo.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Image
                  </label>
                  <div className="w-full border border-gray-300 flex flex-col justify-between p-5 gap-y-2">
                    <img
                      src={coverImg || "https://placehold.co/400"}
                      alt=""
                      className="w-full h-[100px] object-contain rounded-xl"
                    />
                    <input
                      {...register("cover", {
                        required: "L'image est obligatoire",
                      })}
                      type="file"
                      accept="image/png, image/jpg, image/jpeg"
                      onChange={previewCoverImage}
                    />
                    {formState.errors.cover && (
                      <p className="text-red-500 text-sm mt-1">
                        {formState.errors.cover.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveForm(2)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-all shadow-lg"
                  >
                    Précédent
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d5850c] transition-all shadow-lg"
                  >
                    S&apos;inscrire
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
    </div>
  );
};

export default Register;
