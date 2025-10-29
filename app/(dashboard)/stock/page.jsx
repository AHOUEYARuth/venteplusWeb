"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { stockStore } from "./stockStore/stockStore";
import { gsap } from "gsap";
import { IoMdClose } from "react-icons/io";
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
import { MdOutlineMoreVert, MdSearch } from "react-icons/md";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useProductStore } from "../product/productStore/productStore";
import { useLoginStore } from "@/app/login/loginStore/loginStore";
import { ClipLoader } from "react-spinners";
import { cleanPayload } from "@/lib/utils";
import moment from "moment";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import Product2 from "@/assets/images/emptyPro.png";
export default function Stock() {
  const {
    products,
    getProductsActions,
    setProducts,
    editedProduct,
    editedProductAction,
    setEditingProduct,
    filterProducts,
  } = useProductStore();
  const { shop } = useLoginStore();
  const { stocks, fetchData } = stockStore();
  const container = useRef(null);
  const timeLineModal = useRef();
  const [isModalOpen, setisModalOpen] = useState(false);
  const [loadingProduct, setloadingProduct] = useState(false);
  const [productInfos, setproductInfos] = useState({});
  const [availableQuantity, setavailableQuantity] = useState("");
  const [categorieFilter, setCategorieFilter] = useState("");
  const [nameFilter, setnameFilter] = useState("");
  const [rangeDate, setRangeDate] = useState(null);

  const { register, handleSubmit, watch, formState, trigger, reset } = useForm({
    mode: "onChange",
  });
  async function applyGetProductAction(shopId) {
    setProducts([]);
    setloadingProduct(true)
    await getProductsActions(shopId).then((response) => {
      setProducts(response.data);
    }).catch((error) => {
      toast.error("Un problème est survenu lors de la récupération des stocks")
    }).finally(() => {
      setloadingProduct(false)
    });
  }
  async function applyUpdateProductAction(productId, payload) {
    await editedProductAction(productId, payload)
      .then(async () => {
        setloadingProduct(true);
        await applyGetProductAction(shop?.id);
        toast.success("Produit modifier avec succès");
        setisModalOpen(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          error.message || "Erreur lors de la modification du produit"
        );
      })
      .finally(() => {
        setloadingProduct(false);
      });
  }

  async function submitForm(data) {
    data = cleanPayload(data);
    const payload = {
      ...data,
      shopId: shop?.id,
      availableQuantity: data.availableQuantity
        ? parseInt(data.availableQuantity)
        : null,
      minimumQuantity: data.minimumQuantity
        ? parseInt(data.minimumQuantity)
        : null,
    };
    setloadingProduct(true);
    if (
      Object.entries(cleanPayload(payload)).length == 2 &&
      editedProduct != null
    ) {
      toast.error("Aucune modification apportée au produit");
      return;
    }
    if (editedProduct != null) {
      console.log("payload clean");
      console.log(cleanPayload(payload));
      await applyUpdateProductAction(editedProduct.id, cleanPayload(payload))
        .then(async (response) => {
          reset();
          await applyGetProductAc50tion(shop?.id);
          /* toast.success("Produit modifié avec succès"); */

          setEditingProduct(null);

          timeLineModal.current.reversed(true);
        })
        .catch((error) => {
          console.log(error);
          if (error.message) {
            toast.error(error.message);
          } else {
            toast.error("Produit non modifié ");
          }
        })
        .finally(() => {
          setloadingProduct(false);
        });
    }
    /* trigger().then((isValid) => {
      if (isValid) {
        console.log(data);
      }
    }); */
  }

  console.log("produits");
  console.log(products);

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

  function handleClearFilter() {
    setCategorieFilter("");
    setnameFilter("");
    setRangeDate("");
  }

  useEffect(() => {
    (async function handleFilter() {
      if (categorieFilter != "" || nameFilter != "" || rangeDate != null) {
        console.log("range init");
        console.log(categorieFilter);
        const dateFrom = rangeDate?.from;
        const dateTo = rangeDate?.to;
        await filterProducts(
          shop?.id,
          nameFilter,
          categorieFilter,
          dateFrom != undefined && dateFrom != null
            ? moment(dateFrom).format("DD-MM-YYYY")
            : dateFrom,
          dateTo != undefined && dateTo != null
            ? moment(dateTo).format("DD-MM-YYYY")
            : dateTo
        ).then((response) => {
          setProducts(response.data);
        });
      }
    })();
  }, [categorieFilter, nameFilter, rangeDate]);

  useEffect(() => {
    (function init() {
      if (shop?.id) {
        applyGetProductAction(shop?.id);
      }
    })();
  }, [shop]);
  return (
    <div ref={container} className="w-full h-full p-5 bg-gray-50 rounded-xl">
      <Dialog open={isModalOpen} onOpenChange={setisModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg">
              Mettre à jour le stock
            </DialogTitle>
            <DialogDescription className="text-base">
              Avant de mettre à jour un stock vous devez mettre la quantité de
              produits disponible.
            </DialogDescription>
          </DialogHeader>
          <form action="" onSubmit={handleSubmit(submitForm)}>
            <div className="w-full space-y-5 py-10">
              <div className="w-full flex flex-col gap-y-2">
                <label>Qantité disponible</label>
                <input
                  type="number"
                  {...register("availableQuantity", {
                    required:
                      "La quantité disponible du produit est obligatoire",
                  })}
                  name="availableQuantity"
                  value={productInfos?.availableQuantity ?? ""}
                  onChange={(e) =>
                    setproductInfos({
                      ...productInfos,
                      availableQuantity: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                  placeholder="Entrer la quantité disponible"
                />
                {formState.errors.availableQuantity && (
                  <p className="text-red-500 text-sm mt-1">
                    {formState.errors.availableQuantity.message}
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col gap-y-2">
                <label htmlFor="">Quantité Minimale d'alerte</label>
                <input
                  {...register("minimumQuantity", {
                    required: "La quantité disponible est obligatoire",
                  })}
                  type="number"
                  name="minimumQuantity"
                  value={productInfos?.minimumQuantity ?? ""}
                  onChange={(e) =>
                    setproductInfos({
                      ...productInfos,
                      minimumQuantity: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                  placeholder="quantité minimale"
                />
                {formState.errors.minimumQuantity && (
                  <p className="text-red-500 text-sm mt-1">
                    {formState.errors.minimumQuantity.message}
                  </p>
                )}
              </div>
              <DialogFooter className="sm:justify-start items-center justify-center">
                <button
                  type="submit"
                  className="w-50 auth-btn flex flex-row items-center justify-center gap-x-2 w-full mt-5 bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d5850c] focus:outline-none focus:ring-2 focus:ring-[#F39C12] cursor-pointer focus:ring-offset-2 transition-all shadow-lg"
                >
                  Valider{" "}
                  {loadingProduct ? (
                    <ClipLoader color="white" size={20} />
                  ) : null}
                </button>
                <button
                  type="button"
                  className="w-50 auth-btn border border-1 border-gray-600 text-black flex flex-row items-center justify-center gap-x-2 w-full mt-5 text-black py-3 px-4 rounded-lg font-semibold hover:bg-[#000] hover:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#000] focus:ring-offset-2 transition-all shadow-lg"
                  onClick={() => setisModalOpen(false)}
                  variant="ghost"
                >
                  Fermer
                </button>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold ">Gestion de Stocks</h2>
          <p className="text-gray-500 text-xl pt-3">
            Contrôlez vos stocks sans stress. Consultez les niveaux de produits
            et évitez les ruptures ou surplus grâce à un suivi automatisé.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full flex flex-row items-start justify-between mt-20">
          <h2 className="text-2xl font-semibold ">Listes des Stocks</h2>
          <div className="w-[60%] flex flex-row items-center justify-center gap-x-4">
            <div className="w-[40%] relative flex items-center justify-between bg-white gap-x-2 rounded-lg">
              <input
                type="text"
                onChange={(event) => setnameFilter(event.target.value)}
                placeholder="Recherche par nom"
                className="bg-white text-lg py-3 pl-2 outline-hidden rounded-lg focus:outline-none  transition-all"
              />
              <button className="py-3 bg-[#F39C12] text-white rounded-tr-lg rounded-br-lg cursor-pointer px-4">
                <MdSearch size={25} />
              </button>
            </div>
            <div className="w-[60%] flex flex-row gap-x-4 items-center">
              <div className="flex flex-row gap-x-5 items-center">
                <DatePicker onDateChange={(range) => setRangeDate(range)} />
              </div>
              <Button
                onClick={() => handleClearFilter()}
                variant="outline"
                className="border-[#F39C12] text-[#F39C12] hover:bg-[#F39C12] hover:text-white cursor-pointer"
              >
                Effacer le filtre
              </Button>
            </div>
          </div>
        </div>
        {loadingProduct ? (
          <div className="w-full h-[500px] flex items-center justify-center">
            <ClipLoader color="#F39C12" size={50} />
          </div>
        ) : (
          <div className="w-full overflow-x-auto pb-10 mt-5 bg-white">
            {products.length === 0 ? (
              <div className="w-full flex flex-col items-center gap-y-2 text-center py-5">
                <div
                  className="w-[50%] sm:w-[100%] lg:w-[32%] h-[200px] relative overflow-hidden bg-contain bg-center bg-no-repeat cursor-pointer"
                  style={{ backgroundImage: `url(${Product2.src})` }}
                ></div>
                <div>
                  <p className="text-2xl font-bold">Aucun produit trouvé</p>
                  <p className="">
                    Votre stock de produits est vide. La liste des produits
                    enrégistrés s'affiche ici
                  </p>
                </div>
              </div>
            ) : (
              <table className="min-w-full text-xl  ">
                <thead className=" text-black bg-gray-100">
                  <tr className="border-b border-gray-200 text-left">
                    <th className="p-5">N°</th>
                    <th className="p-5">Nom du stock</th>
                    <th className="p-5">Quantité disponible</th>
                    <th className="p-5 ">Quantité Minimale</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => {
                    return (
                      <tr
                        key={product.id}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-5">{index + 1}</td>
                        <td className="p-5 font-bold">
                          Stock de {product.name}
                        </td>
                        {/* <td className="p-5">{stock.product}</td> */}
                        <td className="p-5">{product.availableQuantity}</td>
                        <td className="p-5">{product.minimumQuantity}</td>
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
                              <DropdownMenuItem
                                className="text-lg"
                                onClick={() => {
                                  setEditingProduct(product);
                                  setproductInfos({
                                    ...product,
                                  });
                                  setavailableQuantity(
                                    product.availableQuantity
                                  );
                                  setisModalOpen(true);
                                }}
                              >
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-lg">
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
      <Toaster />
    </div>
  );
}
