"use client";
import React, { useEffect } from "react";
import { useDashboardStore } from "./dashboardStore/dashboardStore";
import { FiArrowUpRight } from "react-icons/fi";
import { IoMdArrowDropup } from "react-icons/io";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useLoginStore } from "@/app/login/loginStore/loginStore";
import { baseUrlNotApi } from "@/lib/httpClient";
import { useSellingStore } from "../selling/sellingStore/sellingStore";
export const description = "A bar chart with a label";
/* const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]; */
const chartConfig = {
  desktop: {
    label: "Bénefice",
    /* color: "var(--chart-1)", */
  },
} satisfies ChartConfig;

export default function Dashboard() {
  const {
    monthSelling,
    monthSaleTotal,
    monthSaleProfitTotal,
    topProducts,
    getTopProductsAction,
    getMonthSellingsAction,
  } = useDashboardStore();
  const { shop } = useLoginStore();
  const { stats, daysStats, getStatsAction, getDaysStatsAction } =
    useSellingStore();

  async function applyGetTopProductsAction(shopId) {
    await getTopProductsAction(shopId).then(() => {});
  }
  async function applyGetMonthSellingsAction(shopId) {
    await getMonthSellingsAction(shopId).then(() => {});
  }

  async function applyGetStatsAction(shopId) {
    await getStatsAction(shopId);
    await getDaysStatsAction(shopId);
  }
  useEffect(() => {
    (function init() {
      if (shop?.id) {
        applyGetTopProductsAction(shop?.id);
        applyGetMonthSellingsAction(shop?.id);
        applyGetStatsAction(shop?.id);
      }
    })();
  }, [shop]);
  return (
    <div className="w-full h-full p-5 bg-gray-50 rounded-xl">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold ">Tableau de bord</h2>
          <p className="text-gray-500 text-xl pt-5">
            Suivez en un coup d&apos;œil la performance de votre commerce.
            Visualisez vos ventes, bénéfices et statistiques clés en temps réel.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-row flex-wrap items-center justify-between py-8 gap-y-5">
        <div className="w-90 bg-gradient-to-br from-[#F39C12]/70 to-[#F39C12] text-white rounded-xl p-5  shadow-md hover:shadow-xl flex flex-col justify-between cursor-pointer">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold">Vente du jour</h2>
            <div className="bg-white hover:bg-white/30 transition-colors rounded-full p-2">
              <FiArrowUpRight className="text-[#F39C12] " size={16} />
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-4xl font-semibold">
              {daysStats?.daysSalesCount ?? 0}
            </h2>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <span className="flex items-center gap-1 border border-white/30 px-1 py-0.5 rounded-xl text-lg font-medium">
              5
              <IoMdArrowDropup size={30} />
            </span>
            <p className="text-sm text-white/80">Progression mensuelle</p>
          </div>
        </div>
        <div className="w-90 bg-white text-black rounded-xl p-5  shadow-md hover:shadow-xl flex flex-col justify-between cursor-pointer">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold">Bénéfice net (FCFA)</h2>
            <div className="bg-[#F39C12] hover:bg-white/30 transition-colors rounded-full p-2">
              <FiArrowUpRight className="text-white " size={16} />
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-4xl font-semibold">
              {daysStats?.daysProfit ?? 0}
            </h2>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <span className="flex items-center gap-1 border border-[#F39C12] px-1 py-0.5 rounded-xl text-lg font-medium">
              3
              <IoMdArrowDropup size={30} />
            </span>
            <p className="text-sm text-[#F39C12]">Progression mensuelle</p>
          </div>
        </div>
        <div className="w-90 bg-white text-black rounded-xl p-5  shadow-md hover:shadow-xl flex flex-col justify-between cursor-pointer">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold">Commande Client</h2>
            <div className="bg-[#F39C12] hover:bg-white/30 transition-colors rounded-full p-2">
              <FiArrowUpRight className="text-white " size={16} />
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-4xl font-semibold">
              {daysStats?.pendingOrders ?? 0}
            </h2>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <span className="flex items-center gap-1 border border-[#F39C12] px-1 py-0.5 rounded-xl text-lg font-medium">
              3
              <IoMdArrowDropup size={30} />
            </span>
            <p className="text-sm text-[#F39C12]">Progression mensuelle</p>
          </div>
        </div>
      </div>
      <div className="w-full h-[500px]">
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle>Statistique de l&apos;année</CardTitle>
            <CardDescription>January - Décembre</CardDescription>
          </CardHeader>
          <CardContent className="w-full h-[70%]">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <BarChart
                accessibilityLayer
                data={stats?.yearlyProfit}
                margin={{
                  top: 20,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="profit" fill="#F39C12" radius={8}>
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
              Bénéfice de l&aps;année. Vos profit sur chaque vente du mois par
              année <TrendingUp className="h-4 w-4" />
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-5">Top Produits</h2>
        <div className="w-full flex flex-row flex-wrap items-center justify-start gap-4 ">
          {topProducts.map((product, index) => {
            return (
              <div
                key={index}
                className="shop-item min-w-93 flex flex-col gap-5 bg-white rounded-2xl p-3 relative shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="w-full bg-gray-300 flex flex-col gap-5 rounded-tl-xl rounded-2xl">
                  <div
                    className="w-full h-[300px] bg-center bg-cover bg-no-repeat rounded-2xl"
                    style={{
                      backgroundImage: `url("${baseUrlNotApi}${product?.image}")`,
                    }}
                  >
                    <div>
                      <div className="w-full flex items-center justify-between pt-2 px-2"></div>
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
                      Prix d&apos;achat :{" "}
                      <span className="font-bold">{product.purchasePrice}</span>
                    </h3>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-5">Listes des ventes</h2>
        <div className="text-2xl bg-white p-5 rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-xl ">
              <thead className="text-black bg-gray-100">
                <tr className="border-b border-gray-200 text-left">
                  {/* <th className="p-5">Client</th>
                  <th className="p-5">Téléphone</th> */}
                  <th className="p-5">Produit</th>
                  <th className="p-5">Quantité</th>
                  <th className="p-5 ">Prix d&apos;achat(FCFA)</th>
                  <th className="p-5 ">Prix vente(FCFA)</th>
                  <th className="p-5 ">Total(FCFA)</th>
                  <th className="p-5 ">Bénéfice net(FCFA)</th>
                </tr>
              </thead>
              <tbody>
                {monthSelling.map((selling) => (
                  <tr
                    key={selling.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    {/* <td className="px-5 py-5">{selling.customer.name} {selling.customer.firstName}</td>
                    <td className="px-5 py-5">{selling.customer.phoneNumber}</td> */}
                    <td className="p-5">{selling.toOrders[0].product.name}</td>
                    <td className="p-5">{selling.toOrders[0].quantity}</td>
                    <td className="p-5">
                      {selling.toOrders[0].product.purchasePrice}
                    </td>
                    <td className="p-5">
                      {selling.toOrders[0].product.salePrice}
                    </td>
                    <td className="p-5">{selling.totalAmount}</td>
                    <td className="p-5 text-green-600">{selling.profit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-between text-lg font-semibold text-gray-700">
            <p>
              <span className="text-gray-500 text-xl">Total vendues : </span>
              <span className="text-green-600">{monthSaleTotal} FCFA</span>
            </p>
            <p>
              <span className="text-gray-500 text-xl">Bénéfice total : </span>
              <span className="text-[#F39C12]">
                {monthSaleProfitTotal} FCFA
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
