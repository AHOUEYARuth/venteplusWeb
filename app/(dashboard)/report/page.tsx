"use client";
import React,{useEffect} from "react";
import { reportStore } from "./reportStore/reportStore";
import { IoMdArrowDropup } from "react-icons/io";
import { FiArrowUpRight } from "react-icons/fi";
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
import { Button } from "@/components/ui/button";
import { useLoginStore } from "@/app/login/loginStore/loginStore";
import { useSellingStore } from "../selling/sellingStore/sellingStore";
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
    label: "Bénefice",
    /* color: "var(--chart-1)", */
  },
} satisfies ChartConfig;


export default function Report(){
  const {stats,getStatsAction,setStats} = useSellingStore()
  const {shop} = useLoginStore()

  async function applyGetStatsAction(shopId) {
      await getStatsAction(shopId) 
  }
  useEffect(() => {
      (function init() {
        if (shop?.id) {
          applyGetStatsAction(shop?.id);
        }
      })();
  }, [shop]);
  
  return (
    <div className="w-full h-full p-5 bg-gray-50 rounded-xl">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold ">Rapport et Statistique</h2>
          <p className="text-gray-500 text-xl pt-5">
            Analysez vos performances avec des rapports clairs et automatisés.
            Prenez de meilleures décisions pour développer votre activité.
          </p>
        </div>
        <Button className="bg-[#F39C12] cursor-pointer">
          Générer un rapport
        </Button>
      </div>
      <div className="w-full flex flex-row flex-wrap items-center justify-between py-8 gap-y-5">
        <div className="w-90 bg-gradient-to-br from-[#F39C12]/70 to-[#F39C12] text-white rounded-xl p-5  shadow-md hover:shadow-xl flex flex-col justify-between cursor-pointer">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold">Nombre de vente</h2>
            <div className="bg-white hover:bg-white/30 transition-colors rounded-full p-2">
              <FiArrowUpRight className="text-[#F39C12] " size={16} />
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-4xl font-semibold">{stats?.monthlySalesCount ?? 0}</h2>
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
            <h2 className="text-2xl font-bold">Commande en cours</h2>
            <div className="bg-[#F39C12] hover:bg-white/30 transition-colors rounded-full p-2">
              <FiArrowUpRight className="text-white " size={16} />
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-4xl font-semibold">{stats?.pendingOrders ?? 0}</h2>
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
            <h2 className="text-2xl font-bold">Bénéfice du mois</h2>
            <div className="bg-[#F39C12] hover:bg-white/30 transition-colors rounded-full p-2">
              <FiArrowUpRight className="text-white " size={16} />
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-4xl font-semibold">{stats?.monthlyProfit ?? 0}</h2>
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
            <CardTitle>Statistique de l&apos;année </CardTitle>
            <CardDescription>Janvier - Décembre</CardDescription>
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
              Bénéfice de l'année. Vos profit sur chaque vente du mois par année{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};


