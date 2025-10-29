"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LoginP from "@/assets/images/login.jpg";
import { ClipLoader } from "react-spinners";

import "@/style/style.scss";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { PhoneInput } from "@/components/ui/phone-input";
import { useRouter } from "next/navigation";
import { useLoginStore } from "./loginStore/loginStore";

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

const Login = () => {
  const {
    name,
    showLogin,
    loginActions,
    setToken,
    setUser,
    setShop,
    forgotPasswordAction,
    setFcmTokenActions,
    postOtpCodeAction,
    postNewPasswordAction,
  } = useLoginStore();
  const router = useRouter();
  const { register, handleSubmit, watch, formState, trigger, reset } = useForm({
    mode: "onChange",
  });

    const {
      register: registerPhoneNumber,
      handleSubmit: handleSubmitPhoneNumber,
      formState: formStatePhoneNumber,
      reset:resetPhoneNumber,
    } = useForm({
      mode: "onChange",
    });
  
   const {
     register: registerOtp,
     handleSubmit: handleSubmitOtp,
     formState: formStateOtp,
     reset: resetOtp,
     trigger:triggerOtp
   } = useForm({
     mode: "onChange",
   });
  
     const {
       register: registerMdp,
       handleSubmit: handleSubmitMdp,
       formState: formStateMdp,
       reset: resetMdp,
       trigger: triggerMdp,
       watch: watchMdp,
     } = useForm({
       mode: "onChange",
     });
  
  
  const [loading, setLoading] = useState(false);
  const [isSelectedShop, setIsSelectedShop] = useState(false);
  const [shops, setShops] = useState([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [phoneNum, setphoneNum] = useState("");
  const [isOtpModalOpen, setisOtpModalOpen] = useState(false);
  const [newpassModal, setnewpassModal] = useState(false);
  const [resetMdpLoader, setresetMdpLoader] = useState(false)
  const [currentPhoneNumber, setcurrentPhoneNumber] = useState("")
  const [currentCode, setcurrentCode] = useState("")

  async function submitForm(data) {
    setLoading(true);
    console.log(data);
    await loginActions(data)
      .then(async (response) => {
        setLoading(false);
        console.log(response);
        if (response.data.shops) {
          setIsSelectedShop(true);
          setShops(response.data.shops);
        } else if (response.data.token) {
          const token = localStorage.getItem("fcmToken");
          console.log("access-token");
          console.log(JSON.stringify(response.data.token));
          localStorage.setItem("access-token", response.data.token);

          setFcmTokenActions({ fcmToken: token });
          setToken(response.data.token);
          setUser(response.data.user);
          setShop(response.data.shop);
          router.push("/dashboard");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        /* reset(); */
        if (error.message) toast.error(error.message);
      });
    trigger().then((isValid) => {
      if (isValid) {
        console.log(data);
      }
    });
  }

  async function submitPassForm(data) {
    setresetMdpLoader(true);
    await forgotPasswordAction(data)
      .then((response) => {
        setcurrentPhoneNumber(data.phoneNumber)
        setisModalOpen(false)
        setisOtpModalOpen(true)
      })
      .catch((error) => {
        toast.error(
          error.message
            ? error.message
            : "Un problème est survenu réessayez plus tard"
        );
      }).finally(() => {
        setresetMdpLoader(false);
      });
  }

  async function submitOtpForm(data) {
    triggerOtp().then(async (isValid) => {
      if (isValid) {
        const payload = {
          code: data.otp1 + data.otp2 + data.otp3 + data.otp4,
          phoneNumber:currentPhoneNumber
        }
        setcurrentCode(payload.code)
         await postOtpCodeAction(payload)
           .then((response) => {
             setisOtpModalOpen(false);
             setnewpassModal(true);
           })
           .catch((error) => {
             toast.error(
               error.message
                 ? error.message
                 : "Un problème est survenu réessayez plus tard"
             );
           });
      }
    });
   
  }

  async function submitnewPasswForm(data) {
    const payload = {
      code: currentCode,
      phoneNumber: currentPhoneNumber,
      ...data
    };
    await postNewPasswordAction(payload)
      .then((response) => {
        router.push("/login")
      })
      .catch((error) => {
        toast.error(
          error.message
            ? error.message
            : "Un problème est survenu réessayez plus tard"
        );
      });
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
      <Dialog open={isModalOpen} onOpenChange={setisModalOpen}>
        <DialogContent className="w-[500px] ">
          <DialogHeader>
            <DialogTitle className="text-lg">Mot de passe oublié</DialogTitle>
            <DialogDescription className="text-base">
              Veuillez saisir le numéro de téléphone avec lequel vous avez créé
              le compte
            </DialogDescription>
          </DialogHeader>
          <form action="" onSubmit={handleSubmitPhoneNumber(submitPassForm)}>
            <div className="w-full space-y-5">
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Téléphone
                </label>
                <PhoneInput
                  defaultCountry="BJ"
                  {...registerPhoneNumber("phoneNumber", {
                    required: "Le numéro de téléphone est obligatoire",
                  })}
                />
                {formStatePhoneNumber.errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {formStatePhoneNumber.errors.phoneNumber.message}
                  </p>
                )}
              </div>

              <DialogFooter className="sm:justify-start items-center justify-center">
                <button
                  type="submit"
                  className="w-50 auth-btn flex flex-row items-center justify-center gap-x-2 w-full mt-5 bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d5850c] focus:outline-none focus:ring-2 focus:ring-[#F39C12] cursor-pointer focus:ring-offset-2 transition-all shadow-lg"
                >
                  Valider
                  {/* {employeLoading ? <ClipLoader color="white" size={20} /> : null} */}
                </button>
                <button
                  type="button"
                  className="w-50 auth-btn border border-1 border-gray-600 text-black flex flex-row items-center justify-center gap-x-2 w-full mt-5 text-black py-3 px-4 rounded-lg font-semibold hover:bg-[#000] hover:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#000] focus:ring-offset-2 transition-all shadow-lg"
                  onClick={() => setisModalOpen(false)}
                >
                  Fermer
                </button>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isOtpModalOpen} onOpenChange={setisOtpModalOpen}>
        <DialogContent className="w-[500px] ">
          <DialogHeader>
            <DialogTitle className="text-lg">Code OTP</DialogTitle>
            <DialogDescription className="text-base">
              Veuillez saisir le code OTP envoyé sur le 67xxxxxx
            </DialogDescription>
          </DialogHeader>
          <form action="" onSubmit={handleSubmitOtp(submitOtpForm)}>
            <div className="w-full space-y-5">
              <div className="w-full flex flex-row justify-center gap-x-5 ">
                <input
                  type="text"
                  name="otp1"
                  {...registerOtp("otp1", {
                    required: "Le numéro de téléphone est obligatoire",
                  })}
                  className="w-[60px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                />
                <input
                  type="text"
                  name="otp2"
                  {...registerOtp("otp2", {
                    required: "Le numéro de téléphone est obligatoire",
                  })}
                  className="w-[60px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                />
                <input
                  type="text"
                  name="otp3"
                  {...registerOtp("otp3", {
                    required: "Le numéro de téléphone est obligatoire",
                  })}
                  className="w-[60px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                />
                <input
                  type="text"
                  name="otp4"
                  {...registerOtp("otp4", {
                    required: "Le numéro de téléphone est obligatoire",
                  })}
                  className="w-[60px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                />
              </div>
              <p className="text-red-500 text-lg">
                {formStateOtp.errors.otp1 ||
                formStateOtp.errors.otp2 ||
                formStateOtp.errors.otp3 ||
                formStateOtp.errors.otp4
                  ? "Entrez le code otp"
                  : ""}
              </p>
              <DialogFooter className="sm:justify-start items-center justify-center">
                <button
                  type="submit"
                  className="w-50 auth-btn flex flex-row items-center justify-center gap-x-2 w-full mt-5 bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d5850c] focus:outline-none focus:ring-2 focus:ring-[#F39C12] cursor-pointer focus:ring-offset-2 transition-all shadow-lg"
                >
                  Valider
                  {/* {employeLoading ? <ClipLoader color="white" size={20} /> : null} */}
                </button>
                <button
                  type="button"
                  className="w-50 auth-btn border border-1 border-gray-600 text-black flex flex-row items-center justify-center gap-x-2 w-full mt-5 text-black py-3 px-4 rounded-lg font-semibold hover:bg-[#000] hover:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#000] focus:ring-offset-2 transition-all shadow-lg"
                  onClick={() => setisOtpModalOpen(false)}
                >
                  Fermer
                </button>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={newpassModal} onOpenChange={setnewpassModal}>
        <DialogContent className="w-[500px] ">
          <DialogHeader>
            <DialogTitle className="text-lg">Nouveau mot de passe</DialogTitle>
            <DialogDescription className="text-base">
              Veuillez saisir votre nouveau mot de passe
            </DialogDescription>
          </DialogHeader>

          <form action="" onSubmit={handleSubmitMdp(submitnewPasswForm)}>
            <div className="w-full space-y-5">
              <div className=" ">
                <label htmlFor="">Nouveau mot de passe</label>
                <input
                  type="password"
                  name="newPassword"
                  {...registerMdp("newPassword", {
                    required: "Veuillez confirmer le mot de passe",
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                  placeholder="saisissez votre nouveau mot de passe"
                />
                {formStateMdp.errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {formStateMdp.errors.newPassword.message}
                  </p>
                )}
              </div>
              <div className=" ">
                <label htmlFor="">Confimer le mot de passe</label>
                <input
                  type="password"
                  name="confirmPassword"
                  {...registerMdp("confirmPassword", {
                    required: "Veuillez confirmer le mot de passe",
                    validate: (value) =>
                      value === watchMdp("newPassword") ||
                      "Les mots de passe ne correspondent pas",
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                  placeholder="confirmer le nouveau mot de passe"
                />
                {formStateMdp.errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {formStateMdp.errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <DialogFooter className="sm:justify-start items-center justify-center">
                <button
                  type="submit"
                  /*  onClick={() => submitPassForm(phoneNum)} */
                  className="w-50 auth-btn flex flex-row items-center justify-center gap-x-2 w-full mt-5 bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d5850c] focus:outline-none focus:ring-2 focus:ring-[#F39C12] cursor-pointer focus:ring-offset-2 transition-all shadow-lg"
                >
                  Valider
                  {/* {employeLoading ? <ClipLoader color="white" size={20} /> : null} */}
                </button>
                <button
                  type="button"
                  className="w-50 auth-btn border border-1 border-gray-600 text-black flex flex-row items-center justify-center gap-x-2 w-full mt-5 text-black py-3 px-4 rounded-lg font-semibold hover:bg-[#000] hover:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#000] focus:ring-offset-2 transition-all shadow-lg"
                  onClick={() => setnewpassModal(false)}
                >
                  Fermer
                </button>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <div className="content w-[55%] bg-white rounded-xl flex items-center justify-between p-5">
        <div className="custom-box w-[50%] overflow-hidden">
          <div className="p-8 center-text">
            <h2 className="text-3xl font-bold mb-2 text-[#F39C12]">Vente+</h2>
            <h2 className="text-2xl font-semibold mb-4 text-black">
              Heureux de vous revoir
            </h2>
            <p className="text-gray-700">
              Connectez-vous pour accéder à votre espace personnel.
            </p>
          </div>

          <form action="" onSubmit={handleSubmit(submitForm)}>
            <div className="p-8">
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Numéro de téléphone
                </label>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Téléphone
                  </label>
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
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: "Le mot de passe est obligatoire",
                    })}
                    type="password"
                    name="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrez votre mot de passe"
                  />
                  {formState.errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.password.message}
                    </p>
                  )}
                </div>
              </div>
              {isSelectedShop == true && (
                <div className="mb-6">
                  <select
                    name="shopId"
                    {...register("shopId", {
                      required: "Le mot de passe est obligatoire",
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                  >
                    {shops.map((shop, index) => {
                      return (
                        <option key={index} value={shop.id}>
                          {shop.name}
                        </option>
                      );
                    })}
                  </select>
                  {formState.errors.shopId && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.shopId.message}
                    </p>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-[#F39C12] focus:ring-[#F39C12] border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Se souvenir de moi
                  </label>
                </div>
                <div
                  onClick={() => setisModalOpen(true)}
                  className="text-sm text-gray-700 hover:text-[#F39C12] font-medium cursor-pointer"
                >
                  Mot de passe oublié ?
                </div>
              </div>

              <button className="auth-btn w-[50%] flex flex-row items-center gap-x-2 justify-center bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d6860f] focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:ring-offset-2 transition-all shadow-lg cursor-pointer">
                Se connecter{" "}
                {loading ? <ClipLoader color="white" size={20} /> : null}
              </button>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Vous n’avez pas encore de compte ?{" "}
                  <Link
                    href="/register"
                    className="text-[#F39C12] hover:text-[#d6860f] font-semibold"
                  >
                    Créez-en un
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>

        <div className="max-w-md h-auto login">
          <Image
            src={LoginP}
            alt="Illustration de connexion"
            className="w-full rounded-t-md object-cover"
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
