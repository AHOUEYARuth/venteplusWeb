"use client";
import React, { useState } from "react";
import { loginStore } from "./loginStore/loginStore";
import Link from "next/link";
import Image from "next/image";
import LoginP from "@/assets/images/login.jpg";
import "@/style/style.scss";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { PhoneInput } from "@/components/ui/phone-input";
import { useRouter } from "next/navigation";

const Login = () => {
  const { name, showLogin, loginActions,setToken,setUser,setShop } = loginStore();
  const router = useRouter();
  const { register, handleSubmit, watch, formState, trigger } = useForm({
    mode: "onChange",
  });
  const [loading, setLoading] = useState(false)
  const [isSelectedShop, setIsSelectedShop] = useState(false)
  const [shops, setShops] = useState([]);
  async function submitForm(data) {
    setLoading(true);
    console.log(data);
     await loginActions(data)
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response.data.shops) {
          setIsSelectedShop(true)
          setShops(response.data.shops)
        }else if(response.data.token){
          setToken(response.data.token) 
          setUser(response.data.user)
          setShop(response.data.shop)
          router.push('/dashboard')
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
    trigger().then((isValid) => {
      if (isValid) {
        console.log(data);
      }
    });
  }
    
  
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
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
                  {/* <Select
                    name="shopId"
                     
                  >
                    <SelectTrigger className="w-full py-6 outline-none">
                      <SelectValue placeholder="Chosissez une boutique " />
                    </SelectTrigger>
                    <SelectContent>
                      {shops.map((shop, index) => {
                       return <SelectItem key={index} value={shop.id}>{shop.name}</SelectItem>;
                      })}
                      
                    </SelectContent>
                  </Select> */}
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
                <Link
                  href=""
                  className="text-sm text-gray-700 hover:text-[#F39C12] font-medium"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <button className="auth-btn w-[50%] bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d6860f] focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:ring-offset-2 transition-all shadow-lg">
                Se connecter
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
    </div>
  );
};

export default Login;
