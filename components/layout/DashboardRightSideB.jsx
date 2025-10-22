import React, { useEffect, useState } from "react";
import UserImg from "@/assets/images/usrp.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GoAlert } from "react-icons/go";
import { TbInfoTriangle } from "react-icons/tb";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import "@/style/style.scss";
import { MdOutlineAdd } from "react-icons/md";

import { baseURL, baseUrlNotApi } from "@/lib/httpClient";
import Image from "next/image";
import { useLoginStore } from "@/app/login/loginStore/loginStore";
import { useForm } from "react-hook-form";
import { useProductStore } from "@/app/(dashboard)/product/productStore/productStore";

const DashboardRightSideB = () => {
  const {shop} = useLoginStore()
  const { register, handleSubmit, watch, formState, trigger ,reset} = useForm({
    mode: "onChange",
  });
  const { categoryAction, getCategoriesAction, setCategories, categories, deleteCategoriesAction } = useProductStore();
  const [catLoading, setCatLoading] = useState(false)
  function applyGetCatAction(shopId) {
    getCategoriesAction(shopId).then((response) => {
      setCategories(response.data);
      console.log("data");
      console.log(response.data);

      setCatLoading(false);
    });
  }
  async function applyDelCatAction(catId) {
    await deleteCategoriesAction(catId);
    await  applyGetCatAction(shop?.id); 
  }
  async function submitForm(data) {
    const payload = {
      ...data,
      shopId:shop?.id
    }
    await categoryAction(payload)
      .then(async (response) => {
        console.log(response);
        await applyGetCatAction(shop?.id);
        reset()
      })
      .catch((error) => {
        console.log(error);
      });
    trigger().then((isValid) => {
      if (isValid) {
        console.log(data);
      }
    });
  };

  

  useEffect(() => {
    (function init() {
      setCatLoading(true)
      console.log("shop");
      console.log(shop);
      if (shop?.id) {
        applyGetCatAction(shop?.id);
      }
    })();
  }, [shop])

  return (
    <div className="w-[100%] h-[90vh] bg-gray-50 rounded-xl  overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="w-full flex flex-col items-start gap-y-15">
        <Tabs defaultValue="alertes" className="w-[100%]">
          <TabsList className="w-[100%] py-5">
            <TabsTrigger value="alertes" className="p-4">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="actions" className="p-4">
              Actions
            </TabsTrigger>
          </TabsList>
          <TabsContent value="alertes" className="w-[100%] py-10">
            <div className="w-full flex flex-col items-center gap-y-4">
              <div className="w-[115px] h-[115px] flex items-center justify-center border border-gray-500 rounded-full cursor-pointer ">
                <div
                    className="w-[100px] h-[100px] rounded-full bg-center bg-cover bg-no-repeat "
                    style={{ backgroundImage: `url("${baseUrlNotApi}${shop?.image}")` }}
                                    
                ></div>
              </div>
              <h2 className="font-semibold text-2xl">{shop?.name}</h2>
              <p className="text-lg text-gray-600 text-center">
                {shop?.description}
              </p>
              <div className="w-full flex flex-col items-start bg-white rounded-xl p-4 mt-10">
                <div className="w-full cursor-pointer flex justify-end">
                  <IoMdClose color="red" size={20} />
                </div>
                <div className="w-full flex flex-col justify-between">
                  <div className="flex flex-row items-center gap-x-3">
                    <div className="min-w-[30px] min-h-[30px] rounded-full flex items-center justify-center bg-gray-500">
                      <GoAlert className="text-white text-base" />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold cursor-pointer">
                        Stock Faible
                      </h2>
                      <p className="text-sm text-gray-600 cursor-pointer">
                        Certains produits sont bientôt en rupture ! Pensez à
                        réapprovisionner vos stocks pour éviter les manques lors
                        des prochaines ventes.
                      </p>
                    </div>
                  </div>
                  <p className="text-base self-end mt-3 font-semibold">
                    <span>24 </span>Heures
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-col items-start bg-white rounded-xl p-4">
                <div className="w-full cursor-pointer flex justify-end">
                  <IoMdClose color="red" size={20} />
                </div>
                <div className="w-full flex flex-col justify-between">
                  <div className="flex flex-row items-center gap-x-3">
                    <div className="min-w-[30px] min-h-[30px] rounded-full flex items-center justify-center bg-gray-500">
                      <TbInfoTriangle className="text-white text-base" />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold cursor-pointer">
                        Commande client
                      </h2>
                      <p className="text-sm text-gray-600 cursor-pointer">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit.
                      </p>
                    </div>
                  </div>
                  <p className="text-base self-end mt-3 font-semibold">
                    <span>24 </span>Heures
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-col items-start bg-white rounded-xl p-4">
                <div className="w-full cursor-pointer flex justify-end">
                  <IoMdClose color="red" size={20} />
                </div>
                <div className="w-full flex flex-col justify-between">
                  <div className="flex flex-row items-center gap-x-3">
                    <div className="min-w-[30px] min-h-[30px] rounded-full flex items-center justify-center bg-gray-500">
                      <FaRegCircleCheck className="text-white text-base" />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold cursor-pointer">
                        Paiement reçu
                      </h2>
                      <p className="text-sm text-gray-600 cursor-pointer">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit.
                      </p>
                    </div>
                  </div>
                  <p className="text-base self-end mt-3 font-semibold">
                    <span>24 </span>Heures
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="actions" className="w-[100%] py-10">
            <div className="flex items-center justify-between">
              <p className="text-[#F39C12] text-xl font-bold"> Catégories</p>
            </div>
            <div className="w-full mt-10">
              <h3 className="text-base text-gray-600 mb-2">
                Nom de la catégorie
              </h3>
              <form action="" onSubmit={handleSubmit(submitForm)}>
                <div>
                  <div className="w-full relative flex items-center justify-between bg-white gap-x-2 rounded-lg">
                    <input
                      {...register("name", {
                        required: "Le nom de la catégorie est obligatoire",
                      })}
                      type="text"
                      name="name"
                      placeholder="Ajouter une catégorie"
                      className="size w-[60%] text-lg py-2 pl-2 outline-hidden rounded-lg focus:outline-none  transition-all z-1"
                    />
                    <button type="submit" className="py-2 w-[20%] bg-[#F39C12] flex items-center justify-center text-white rounded-tr-lg rounded-br-lg cursor-pointer">
                      <MdOutlineAdd size={30} />
                    </button>
                  </div>
                  {formState.errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.name.message}
                    </p>
                  )}
                </div>
              </form>
            </div>
            <div className="w-full bg-white rounded-lg mt-5 p-5 space-y-5">

              {categories.map((category, index) => {
                return (
                  <div key={index} className="w-full py-3 flex items-center justify-between cursor-pointer">
                    <p className="text-xl">{category.name}</p>
                    <IoMdClose onClick={()=>{ applyDelCatAction(category.id)}}/>
                  </div>
                );
              })}
              </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardRightSideB;
