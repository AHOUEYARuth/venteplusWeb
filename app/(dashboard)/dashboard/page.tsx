"use client";
import React from "react";
import { dashboardStore } from "./dashboardStore/dashboardStore";
import { Button } from "@/components/ui/button";
import { FiArrowUpRight } from "react-icons/fi";
import { IoMdArrowDropup } from "react-icons/io";
import Product2 from "@/assets/images/product10.jpg";
import Product3 from "@/assets/images/product3.png";
import Product1 from "@/assets/images/product9.png";
import { GrFavorite } from "react-icons/gr";
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
export const description = "A bar chart with a label";
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    /* color: "var(--chart-1)", */
  },
} satisfies ChartConfig;

const dashboard = () => {
  const { name, showProduct } = dashboardStore();
  return (
    <div className="w-full h-full p-5 bg-gray-50 rounded-xl">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold ">Tableau de bord</h2>
          <p className="text-gray-500 text-xl pt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis, reprehenderit.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-row flex-wrap items-center justify-between py-8 gap-y-5">
        <div className="w-70 bg-gradient-to-br from-[#F39C12]/70 to-[#F39C12] text-white rounded-xl p-5  shadow-md hover:shadow-xl flex flex-col justify-between cursor-pointer">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold">Vente du jour</h2>
            <div className="bg-white hover:bg-white/30 transition-colors rounded-full p-2">
              <FiArrowUpRight className="text-[#F39C12] " size={16} />
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-4xl font-semibold">34</h2>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <span className="flex items-center gap-1 border border-white/30 px-1 py-0.5 rounded-xl text-lg font-medium">
              5
              <IoMdArrowDropup size={30} />
            </span>
            <p className="text-sm text-white/80">Increased from last month</p>
          </div>
        </div>
        <div className="w-70 bg-white text-black rounded-xl p-5  shadow-md hover:shadow-xl flex flex-col justify-between cursor-pointer">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold">Bénéfice net</h2>
            <div className="bg-[#F39C12] hover:bg-white/30 transition-colors rounded-full p-2">
              <FiArrowUpRight className="text-white " size={16} />
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-4xl font-semibold">10 500 F </h2>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <span className="flex items-center gap-1 border border-[#F39C12] px-1 py-0.5 rounded-xl text-lg font-medium">
              3
              <IoMdArrowDropup size={30} />
            </span>
            <p className="text-sm text-[#F39C12]">Increased from last month</p>
          </div>
        </div>
        <div className="w-70 bg-white text-black rounded-xl p-5  shadow-md hover:shadow-xl flex flex-col justify-between cursor-pointer">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold">Commande Client</h2>
            <div className="bg-[#F39C12] hover:bg-white/30 transition-colors rounded-full p-2">
              <FiArrowUpRight className="text-white " size={16} />
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-4xl font-semibold">10</h2>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <span className="flex items-center gap-1 border border-[#F39C12] px-1 py-0.5 rounded-xl text-lg font-medium">
              3
              <IoMdArrowDropup size={30} />
            </span>
            <p className="text-sm text-[#F39C12]">Increased from last month</p>
          </div>
        </div>
        <div className="w-70 bg-white text-black rounded-xl p-5  shadow-md hover:shadow-xl flex flex-col justify-between cursor-pointer">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold">Nombre visiteurs</h2>
            <div className="bg-[#F39C12] hover:bg-white/30 transition-colors rounded-full p-2">
              <FiArrowUpRight className="text-white " size={16} />
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-4xl font-semibold">5</h2>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <span className="flex items-center gap-1 border border-[#F39C12] px-1 py-0.5 rounded-xl text-lg font-medium">
              6
              <IoMdArrowDropup size={30} />
            </span>
            <p className="text-sm text-[#F39C12]">Increased from last month</p>
          </div>
        </div>
      </div>
      <div className="w-full h-[500px]">
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle>Bar Chart - Label</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent className="w-full h-[70%]">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <BarChart
                accessibilityLayer
                data={chartData}
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
                <Bar dataKey="desktop" fill="#F39C12" radius={8}>
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
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-5">Top Produits</h2>
        <div className="w-full flex flex-row flex-wrap items-center justify-between gap-y-4">
          <div className="shop-item w-70 flex flex-col gap-5 bg-white rounded-2xl p-3 relative shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="w-full bg-gray-300 flex flex-col gap-5 rounded-tl-xl rounded-2xl">
              <div
                className="w-full h-[250px] bg-center bg-cover bg-no-repeat rounded-2xl"
                style={{ backgroundImage: `url(${Product2.src})` }}
              >
                <button className="w-[40px] h-[40px] absolute text-xl flex items-center justify-center top-5 right-5 bg-[#F39C12] text-white rounded-full cursor-pointer ">
                  <GrFavorite className="text-2xl" />
                </button>
              </div>
            </div>

            <div className="px-2 flex flex-col gap-2">
              <p className="text-base">
                <span className="text-[#F39C12] font-semibold text-2xl">
                  Tee-Shirt
                </span>
              </p>

              <p className="font-medium text-lg text-gray-500">
                Lorem ipsum dolor sit amet consectetu amet consectetu..
              </p>
            </div>
            <div className="px-2 flex items-center justify-between gap-4 text-sm text-gray-700">
              <h3 className="text-2xl font-semibold">$10</h3>
              <button className="bg-[#F39C12] text-white text-xl py-2 px-4 rounded-xl cursor-pointer">
                <h3>Prix d&apos;achat : $8</h3>
              </button>
            </div>
          </div>
          <div className="shop-item w-70 flex flex-col gap-5 bg-white rounded-2xl p-3 relative shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="w-full bg-gray-300 flex flex-col gap-5 rounded-tl-xl rounded-2xl">
              <div
                className="w-full h-[250px] bg-center bg-cover bg-no-repeat rounded-2xl"
                style={{ backgroundImage: `url(${Product3.src})` }}
              >
                <button className="w-[40px] h-[40px] cursor-pointer absolute text-xl flex items-center justify-center top-5 right-5 bg-[#F39C12] text-white rounded-full ">
                  <GrFavorite className="text-2xl" />
                </button>
              </div>
            </div>

            <div className="px-2 flex flex-col gap-2">
              <p className="text-base">
                <span className="text-[#F39C12] font-semibold text-2xl">
                  Pull-Over
                </span>
              </p>

              <p className="font-medium text-lg text-gray-500">
                Lorem ipsum dolor sit amet consectetu amet consectetu..
              </p>
            </div>
            <div className="px-2 flex items-center justify-between gap-4 text-sm text-gray-700">
              <h3 className="text-2xl font-semibold">$10</h3>
              <button className="bg-[#F39C12] text-white text-xl py-2 px-4 rounded-xl cursor-pointer">
                <h3>Prix d&apos;achat : $8</h3>
              </button>
            </div>
          </div>
          <div className="shop-item w-70 flex flex-col gap-5 bg-white rounded-2xl p-3 relative shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="w-full bg-gray-300 flex flex-col gap-5 rounded-tl-xl rounded-2xl">
              <div
                className="w-full h-[250px] bg-center bg-cover bg-no-repeat rounded-2xl"
                style={{ backgroundImage: `url(${Product1.src})` }}
              >
                <button className="w-[40px] h-[40px] absolute cursor-pointer text-xl flex items-center justify-center top-5 right-5 bg-[#F39C12] text-white rounded-full ">
                  <GrFavorite className="text-2xl" />
                </button>
              </div>
            </div>

            <div className="px-2 flex flex-col gap-2">
              <p className="text-base">
                <span className="text-[#F39C12] font-semibold text-2xl">
                  Tee-Shirt
                </span>
              </p>

              <p className="font-medium text-lg text-gray-500">
                Lorem ipsum dolor sit amet consectetu amet consectetu..
              </p>
            </div>
            <div className="px-2 flex items-center justify-between gap-4 text-sm text-gray-700">
              <h3 className="text-2xl font-semibold">$10</h3>
              <button className="bg-[#F39C12] cursor-pointer text-white text-xl py-2 px-4 rounded-xl">
                <h3>Prix d&apos;achat : $8</h3>
              </button>
            </div>
          </div>
          <div className="shop-item w-70 flex flex-col gap-5 bg-white rounded-2xl p-3 relative shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="w-full bg-gray-300 flex flex-col gap-5 rounded-tl-xl rounded-2xl">
              <div
                className="w-full h-[250px] bg-center bg-cover bg-no-repeat rounded-2xl"
                style={{ backgroundImage: `url(${Product1.src})` }}
              >
                <button className="w-[40px] h-[40px] absolute cursor-pointer text-xl flex items-center justify-center top-5 right-5 bg-[#F39C12] text-white rounded-full ">
                  <GrFavorite className="text-2xl" />
                </button>
              </div>
            </div>

            <div className="px-2 flex flex-col gap-2">
              <p className="text-base">
                <span className="text-[#F39C12] font-semibold text-2xl">
                  Tee-Shirt
                </span>
              </p>

              <p className="font-medium text-lg text-gray-500">
                Lorem ipsum dolor sit amet consectetu amet consectetu..
              </p>
            </div>
            <div className="px-2 flex items-center justify-between gap-4 text-sm text-gray-700">
              <h3 className="text-2xl font-semibold">$10</h3>
              <button className="bg-[#F39C12] cursor-pointer text-white text-xl py-2 px-4 rounded-xl">
                <h3>Prix d&apos;achat : $8</h3>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-5">Listes des ventes</h2>
        <div className="text-2xl font-bold bg-white p-5 rounded-2xl">
          <div className="overflow-x-auto">
            <table className="min-w-full text-xl  border border-gray-200">
              <thead className=" text-black">
                <tr className="border-b border-gray-200 text-left">
                  <th className="px-4 py-2">Produit</th>
                  <th className="px-4 py-2">Quantité</th>
                  <th className="px-4 py-2">Taille</th>
                  <th className="px-4 py-2 ">Prix d&apos;achat</th>
                  <th className="px-4 py-2 ">Prix vente</th>
                  <th className="px-4 py-2 ">Total</th>
                  <th className="px-4 py-2 ">Bénéfice net</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b font-medium hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">Dolait</td>
                  <td className="px-4 py-3 ">10</td>
                  <td className="px-4 py-3 ">Moyen</td>
                  <td className="px-4 py-3 ">1000</td>
                  <td className="px-4 py-3 ">1200</td>
                  <td className="px-4 py-3 font-medium text-gray-700">12000</td>
                  <td className="px-4 py-3  text-green-600 font-semibold">
                    2000
                  </td>
                </tr>
                <tr className="border-b font-medium hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">Nutella</td>
                  <td className="px-4 py-3 ">5</td>
                  <td className="px-4 py-3 ">Petit</td>
                  <td className="px-4 py-3 ">3000</td>
                  <td className="px-4 py-3 ">3500</td>
                  <td className="px-4 py-3  font-medium text-gray-700">
                    17 500
                  </td>
                  <td className="px-4 py-3  text-green-600 font-semibold">
                    2500
                  </td>
                </tr>
                <tr className="border-b font-medium hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">Tee-Shirt</td>
                  <td className="px-4 py-3 ">2</td>
                  <td className="px-4 py-3 ">XL</td>
                  <td className="px-4 py-3 ">7000</td>
                  <td className="px-4 py-3 ">10000</td>
                  <td className="px-4 py-3  font-medium text-gray-700">
                    20000
                  </td>
                  <td className="px-4 py-3  text-green-600 font-semibold">
                    6000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-between text-lg font-semibold text-gray-700">
            <p>
              <span className="text-gray-500 text-xl">Bénéfice total : </span>
              <span className="text-green-600">49 500 FCFA</span>
            </p>
            <p>
              <span className="text-gray-500 text-xl">Bénéfice net : </span>
              <span className="text-[#F39C12]">10 500 FCFA</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
