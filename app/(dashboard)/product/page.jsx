"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { gsap } from "gsap";
import Product2 from "@/assets/images/emptyPro.png";
import { useProductStore } from "./productStore/productStore";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useLoginStore } from "@/app/login/loginStore/loginStore";
import { baseUrlNotApi } from "@/lib/httpClient";
import { ClipLoader, PuffLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import moment from "moment";
import { cleanPayload } from "@/lib/utils";
import { DatePicker } from "@/components/ui/date-picker";

export default function Product() {
  const container = useRef(null);
  const timeLineModal = useRef();
  const [coverImg, setcoverImg] = useState(null);
  const [payloadImg, setpayloadImg] = useState(null);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [productId, setproductId] = useState("");
  const {
    products,
    createProductAction,
    setProducts,
    getProductsActions,
    categories,
    deleteProductAction,
    filterProducts,
    clearCategoryFilter,
    editedProduct,
    editedProductAction,
    setEditingProduct,
  } = useProductStore();
  const { shop } = useLoginStore();
  const [additionalCoast, setadditionalCoast] = useState(0);
  const [productLoading, setproductLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [categorieFilter, setCategorieFilter] = useState("");
  const [nameFilter, setnameFilter] = useState("");
  const [rangeDate, setRangeDate] = useState(null);

  const [productInfos, setproductInfos] = useState({});
  const [availableQuantity, setavailableQuantity] = useState("");
  const [additionalCosts, setadditionalCosts] = useState("");

  const { register, handleSubmit, formState, reset } = useForm({
    mode: "onChange",
  });

  async function applyUpdateProductAction(productId, payload) {
    await editedProductAction(productId, payload)
      .then(async () => {
        setproductLoading(true);
        await applyGetProductAction(shop?.id);
        timeLineModal.current.reversed(true);
        toast.success("Produit modifier avec succès");
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          error.message || "Erreur lors de la modification du produit"
        );
      })
      .finally(() => {
        setproductLoading(false);
      });
  }
  async function applyGetProductAction(shopId) {
    setProducts([]);
    setproductLoading(true);
    await getProductsActions(shopId).then((response) => {
      setProducts(response.data);
      clearCategoryFilter();
      setproductLoading(false);
    });
  }
  async function applyDeleteProdAction(productId) {
    setDeleteLoading(true);
    await deleteProductAction(productId)
      .then(async () => {
        await applyGetProductAction(shop?.id);
        toast.success("Produit supprimé avec succès");
        setisModalOpen(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message || "Erreur lors de la suppression");
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  }
  async function submitForm(data) {
    console.log("simple payload");
    console.log(data);
    data = cleanPayload(data);
    const payload = {
      ...data,
      shopId: shop?.id,
      additionalCosts: additionalCoast != 0 ? parseInt(additionalCoast) : null,
      purchasePrice: data.purchasePrice ? parseInt(data.purchasePrice) : null,
      salePrice: data.salePrice ? parseInt(data.salePrice) : null,
      image: data?.image[0] ? data?.image[0] : null,
      availableQuantity: data.availableQuantity
        ? parseInt(data.availableQuantity)
        : null,
      minimumQuantity: data.minimumQuantity
        ? parseInt(data.minimumQuantity)
        : null,
    };

    console.log("simple payload");
    console.log(data);

    if (
      Object.entries(cleanPayload(payload)).length == 2 &&
      editedProduct != null
    ) {
      toast.error("Aucune modification apportée au produit");
      return;
    }

    setproductLoading(true);
    if (editedProduct != null) {
      console.log("payload clean");
      console.log(cleanPayload(payload));
      await applyUpdateProductAction(editedProduct.id, cleanPayload(payload))
        .then(async (response) => {
          reset();
          await applyGetProductAction(shop?.id);
          toast.success("Produit modifié avec succès");
          setcoverImg(null);
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
          setproductLoading(false);
        });
    } else {
      await createProductAction(payload)
        .then(async (response) => {
          setcoverImg(null);
          setproductInfos({});
          reset();
          toast.success("Produit ajouté avec succès");
          timeLineModal.current.reversed(true);
          await applyGetProductAction(shop?.id);
        })
        .catch((error) => {
          console.log(error);
          if (error.message) {
            toast.error(error.message);
          } else {
            toast.error("Produit non ajouté ");
          }
        })
        .finally(() => {
          setproductLoading(false);
        });
    }
  }

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
      } else {
        if (shop?.id) {
          await applyGetProductAction(shop?.id);
        }
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

  function previewCoverImage(e) {
    setcoverImg(URL.createObjectURL(e.target.files[0]));
    setpayloadImg(e.target.files[0]);
  }

  return (
    <div
      ref={container}
      className="w-full h-full p-5 bg-gray-50 rounded-xl overflow-hidden"
    >
      <Dialog open={isModalOpen} onOpenChange={setisModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg">Supprimer un produit</DialogTitle>
            <DialogDescription className="text-base">
              Voulez-vous vraiment supprimer ce produit?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start items-center justify-center">
            <button
              onClick={() => applyDeleteProdAction(productId)}
              className="w-50 auth-btn flex flex-row items-center justify-center gap-x-2 w-full mt-5 bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d5850c] focus:outline-none focus:ring-2 focus:ring-[#F39C12] cursor-pointer focus:ring-offset-2 transition-all shadow-lg"
            >
              OUI{" "}
              {deleteLoading ? <ClipLoader color="white" size={20} /> : null}
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
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold ">Produits</h2>
          <p className="text-gray-500 text-xl pt-3">
            Gérez facilement vos articles : ajoutez, modifiez ou supprimez vos
            produits et surveillez leur disponibilité à tout moment.
          </p>
        </div>
        <div className="flex items-center gap-x-5">
          <Button
            onClick={() => {
              reset();
              timeLineModal.current.play();
            }}
            className="bg-[#F39C12] cursor-pointer"
          >
            Nouveau Produit
          </Button>
        </div>
      </div>
      <div className="w-full mt-8 flex items-center justify-between">
        <div className="w-[30%] relative flex items-center justify-between bg-white gap-x-2 rounded-lg">
          <input
            type="text"
            onChange={(event) => setnameFilter(event.target.value)}
            placeholder="Recherche par nom"
            className="text-xl py-3 pl-4 outline-hidden rounded-lg focus:outline-none  transition-all"
          />
          <button className="py-3 bg-[#F39C12] text-white rounded-tr-lg rounded-br-lg cursor-pointer px-5">
            Rechercher
          </button>
        </div>
        {/* <div className="w-[50%] flex items-center gap-3"> */}
          <div className="flex flex-row gap-x-5 items-center ">
            <DatePicker onDateChange={(range) => setRangeDate(range)} />
            <Select
              value={categorieFilter || "all"}
              onValueChange={setCategorieFilter}
              disabled={filterLoading}
            >
              <SelectTrigger className="w-[200px] py-5 outline-none focus:outline-none border border-[#F39C12]">
                <SelectValue placeholder="Catégorie">
                  {filterLoading ? "Chargement..." : "Catégorie"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map((category, index) => (
                  <SelectItem key={index} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
       {/*  </div> */}
      </div>

      <div className="py-8 mt-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold">Liste des Produits</h2>
          <Button
            onClick={() => handleClearFilter()}
            variant="outline"
            className="border-[#F39C12] text-[#F39C12] hover:bg-[#F39C12] hover:text-white cursor-pointer"
          >
            Effacer le filtre
          </Button>
        </div>
        {productLoading ? (
          <div className="w-full h-[500px] flex items-center justify-center">
            <ClipLoader color="#F39C12" size={50} />
          </div>
        ) : (
          <div className="flex flex-row flex-wrap items-center gap-4">
            {products.length === 0 ? (
              <div className="w-full flex flex-col items-center gap-y-2 text-center">
                <div
                  className="w-[50%] sm:w-[100%] lg:w-[32%] h-[200px] relative overflow-hidden bg-contain bg-center bg-no-repeat cursor-pointer"
                  style={{ backgroundImage: `url(${Product2.src})` }}
                ></div>
                <div>
                  <p className="text-2xl font-bold">Aucun produit trouvé</p>
                  <p className="">
                    La liste des produit enrégistrés s'affiche ici
                  </p>
                </div>
              </div>
            ) : (
              <>
                {products.map((product, index) => {
                  return (
                    <div
                      key={index}
                      className="shop-item min-w-93 max-w-93 flex flex-col gap-5 bg-white rounded-2xl p-3 relative shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                    >
                      <div className="w-full bg-gray-300 flex flex-col gap-5 rounded-tl-xl rounded-2xl">
                        <div
                          className="w-full h-[300px] bg-center bg-cover bg-no-repeat rounded-2xl"
                          style={{
                            backgroundImage: `url("${baseUrlNotApi}${product?.image}")`,
                          }}
                        >
                          <div>
                            <div className="w-full flex items-center justify-between pt-2 px-2">
                              <div
                                onClick={() => {
                                  setEditingProduct(product);
                                  setproductInfos({
                                    ...product,
                                  });
                                  setcoverImg(
                                    `${baseUrlNotApi}${product?.image}`
                                  );
                                  setadditionalCosts(product?.additionalCosts);
                                  setavailableQuantity(
                                    product.availableQuantity
                                  );
                                  timeLineModal.current.play();
                                }}
                                className="flex flex-row gap-2 text-black items-center justify-between p-2 bg-gray-100 rounded-md font-bold"
                              >
                                Modifier
                              </div>
                              <div
                                onClick={() => {
                                  setproductId(product.id);
                                  setisModalOpen(true);
                                }}
                                className="w-[40px] h-[40px]  text-xl flex items-center justify-center bg-red-100 text-red-500 rounded-full cursor-pointer "
                              >
                                <RiDeleteBin6Line />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="px-2 flex flex-col gap-2">
                        <p className="text-base">
                          <span className="text-[#F39C12] font-semibold text-2xl">
                            {product.name}
                          </span>
                        </p>
                        <p className="font-medium text-lg text-gray-500">
                          {product.description}
                        </p>
                      </div>
                      <div className="px-2 flex items-center justify-between gap-4 text-sm text-gray-700">
                        <h3 className="text-2xl font-semibold">
                          {product.salePrice} F
                        </h3>
                        <button className="bg-[#F39C12] text-white text-xl py-2 px-4 rounded-xl cursor-pointer">
                          <h3>
                            Prix d'achat :{" "}
                            <span className="font-bold">
                              {product.purchasePrice}
                            </span>
                          </h3>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>

      <div
        style={{ pointerEvents: "none", opacity: 0 }}
        className={`modal_container z-100 w-full h-full fixed top-0 right-0 bg-black/30`}
      >
        <div
          style={{ transform: "translateX(200%)", pointerEvents: "all" }}
          className={`form_container z-100 flex  flex-col items-start gap-y-10 bg-white w-110 p-5 rounded-xl h-[96vh] absolute top-5 right-3 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden `}
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
              Ajouter un produit
            </h3>
            <form action="" onSubmit={handleSubmit(submitForm)}>
              <div className="w-full space-y-5 py-10">
                <div className="w-full h-70 border border-gray-300 flex flex-col justify-between p-5 gap-y-2">
                  <img
                    id="image"
                    src={`${coverImg ?? "https://placehold.co/400"}`}
                    alt="Aperçu de l'image"
                    className="w-full h-[80%] object-contain rounded-xl"
                  />
                  <input
                    {...register("image", {
                      required:
                        editedProduct == null
                          ? "l'image du produit est obligatoire"
                          : false,
                    })}
                    type="file"
                    name="image"
                    className=""
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={previewCoverImage}
                    multiple={false}
                  />
                  {formState.errors.image && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.image.message}
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="">Nom du produit</label>
                  <input
                    {...register("name", {
                      required:
                        editedProduct == null
                          ? "Le nom du produit est obligatoire"
                          : false,
                    })}
                    type="text"
                    name="name"
                    value={productInfos?.name ?? ""}
                    onChange={(e) =>
                      setproductInfos({ ...productInfos, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer le nom du produit"
                  />
                  {formState.errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="">Description du produit</label>
                  <input
                    {...register("description", {
                      required:
                        editedProduct == null
                          ? "La description du produit est obligatoire"
                          : false,
                    })}
                    type="text"
                    name="description"
                    value={productInfos?.description ?? ""}
                    onChange={(e) =>
                      setproductInfos({
                        ...productInfos,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer une brève description du produit"
                  />
                  {formState.errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.description.message}
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="">Prix d&apos;Achat</label>
                  <input
                    {...register("purchasePrice", {
                      required:
                        editedProduct == null
                          ? "Le prix d'achat du produit est obligatoire"
                          : false,
                    })}
                    type="number"
                    name="purchasePrice"
                    value={productInfos?.purchasePrice ?? ""}
                    onChange={(e) =>
                      setproductInfos({
                        ...productInfos,
                        purchasePrice: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer le prix d'achat du produit"
                  />
                  {formState.errors.purchasePrice && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.purchasePrice.message}
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="">Prix de vente</label>
                  <input
                    {...register("salePrice", {
                      required:
                        editedProduct == null
                          ? "Le prix de vente est obligatoire"
                          : false,
                    })}
                    type="number"
                    name="salePrice"
                    value={productInfos?.salePrice ?? ""}
                    onChange={(e) =>
                      setproductInfos({
                        ...productInfos,
                        salePrice: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer le prix de vente du produit"
                  />
                  {formState.errors.salePrice && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.salePrice.message}
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="">Catégorie</label>
                  <select
                    name="categoryId"
                    {...register("categoryId", {
                      required:
                        editedProduct == null
                          ? "La catégorie du produit est obligatoire"
                          : false,
                    })}
                    value={productInfos?.categoryId ?? ""}
                    onChange={(e) =>
                      setproductInfos({
                        ...productInfos,
                        categoryId: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                  >
                    {categories.map((category, index) => {
                      return (
                        <option key={index} value={category.id}>
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                  {formState.errors.categoryId && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.categoryId.message}
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="">Quantité achetée</label>
                  <input
                    {...register("availableQuantity", {
                      required:
                        editedProduct == null
                          ? "La quantité du produit est obligatoire"
                          : false,
                    })}
                    type="number"
                    name="availableQuantity"
                    value={productInfos?.availableQuantity ?? ""}
                    onChange={(e) =>
                      setproductInfos({
                        ...productInfos,
                        availableQuantity: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="quantité"
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
                      required:
                        editedProduct == null
                          ? "La quantité minimum du produit est obligatoire"
                          : false,
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
                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="">Unité de mesure</label>
                  <select
                    {...register("unitMeasurement", {
                      required:
                        editedProduct == null
                          ? "L'unité de mesure du produit est obligatoire"
                          : false,
                    })}
                    name="unitMeasurement"
                    id="unitMeasurement"
                    value={productInfos?.unitMeasurement ?? ""}
                    onChange={(e) =>
                      setproductInfos({
                        ...productInfos,
                        unitMeasurement: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                  >
                    <option value="nbr">Nombre</option>
                    <option value="kilo">Kilo(Kg)</option>
                    <option value="litre">Litre(L)</option>
                  </select>
                  {/* <input
                   
                    type="number"
                    name="unitMesurement"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="unité de mesure"
                  /> */}
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <label htmlFor="">Frais supplémentaires</label>
                  <input
                    type="number"
                    value={additionalCoast}
                    onChange={(e) => setadditionalCoast(e.target.value)}
                    name="additionalCosts"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:border-transparent outline-none transition-all"
                    placeholder="Entrer les frais supplémentaires"
                  />
                </div>

                <button
                  disabled={productLoading}
                  className="auth-btn w-full flex flex-row items-center gap-x-2 justify-center mt-5 bg-[#F39C12] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d5850c] focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:ring-offset-2 transition-all shadow-lg"
                >
                  {editedProduct != null ? " Modifier" : " Ajouter"}
                  {productLoading ? (
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
}
