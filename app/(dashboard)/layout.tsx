"use client";
import DashboardRightSideB from "@/components/layout/DashboardRightSideB";
import DashboardLeftSideBar from "@/components/layout/DashboardLeftSideBar";
import DashboardNavBar from "@/components/layout/DashboardNavBar";
import { ReactNode } from "react";
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full overl h-[100vh] bg-[#FFFFFF] p-5 overflow-hidden">
      <div className="w-full h-full flex flex-row justify-between gap-x-5">
        <div className="w-[16%] h-full bg-gray-50 rounded-xl p-5 flex flex-col overflow-hidden">
          <DashboardLeftSideBar />
        </div>

        <div className="w-[84%] h-full flex flex-col gap-y-5 overflow-hidden">
          <div className="w-full bg-gray-50 rounded-xl p-5 flex-shrink-0">
            <DashboardNavBar />
          </div>

          <div className="w-full flex-1 flex flex-row items-start justify-between gap-x-5 overflow-hidden">
            <div className="w-[80%] h-full overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <main className="w-full min-h-full">{children}</main>
            </div>

            <div className="w-[23%] h-full bg-gray-50 rounded-xl p-5 flex flex-col overflow-hidden">
              <DashboardRightSideB />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ${open ? "overl" : ""} */