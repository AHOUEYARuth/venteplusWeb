import React from "react";
import UserImg from "@/assets/images/usrp.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GoAlert } from "react-icons/go";
import { TbInfoTriangle } from "react-icons/tb";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import "@/style/style.scss"
import { MdOutlineAdd } from "react-icons/md";


const DashboardRightSideB = () => {
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
                  style={{ backgroundImage: `url(${UserImg.src})` }}
                ></div>
              </div>
              <h2 className="font-semibold text-2xl">Hello Amra</h2>
              <p className="text-lg text-gray-600 text-center">
                Lorem ipsum dolor sit amet consectetu
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
              <div className="w-full relative flex items-center justify-between bg-white gap-x-2 rounded-lg">
                <input
                  type="text"
                  placeholder="Ajouter une catégorie"
                  className="size w-[60%] text-lg py-2 pl-2 outline-hidden rounded-lg focus:outline-none  transition-all"
                />
                <button className="py-2 w-[20%] bg-[#F39C12] flex items-center justify-center text-white rounded-tr-lg rounded-br-lg cursor-pointer">
                  <MdOutlineAdd size={30} />
                </button>
              </div>
            </div>
            <div className="w-full bg-white rounded-lg mt-5 p-5 space-y-5">
              <div className="w-full py-3 flex items-center justify-between cursor-pointer">
                <p className="text-xl">Coton</p>
                <IoMdClose />
              </div>

              <div className="w-full py-3 flex items-center justify-between cursor-pointer">
                <p className="text-xl">Soie</p>
                <IoMdClose />
              </div>

              <div className="w-full flex items-center justify-between cursor-pointer">
                <p className="text-xl">Coton</p>
                <IoMdClose />
              </div>

              <div className="w-full py-3 flex items-center justify-between cursor-pointer">
                <p className="text-xl">Soie</p>
                <IoMdClose />
              </div>

              <div className="w-full py-3 flex items-center justify-between cursor-pointer">
                <p className="text-xl">Coton</p>
                <IoMdClose />
              </div>

              <div className="w-full py-3 flex items-center justify-between cursor-pointer">
                <p className="text-xl">Soie</p>
                <IoMdClose />
              </div>
              {/* <div className="border border-gray-500 mt-2"></div> */}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardRightSideB;
