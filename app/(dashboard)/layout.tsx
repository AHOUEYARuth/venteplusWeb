"use client";
import DashboardRightSideB from "@/components/layout/DashboardRightSideB";
import DashboardLeftSideBar from "@/components/layout/DashboardLeftSideBar";
import DashboardNavBar from "@/components/layout/DashboardNavBar";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const hidePaths = [
    "/selling",
    "/stock",
    "/customerCredits",
  ]

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
            <div
              className={`h-full overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
                hidePaths.includes(pathname) 
                  ? "w-[100%]"
                  : "w-[80%]"
              }`}
            >
              <main className="w-full min-h-full">{children}</main>
            </div>

            {!hidePaths.includes(pathname) ? (
              <div className="w-[23%] h-full bg-gray-50 rounded-xl p-5 flex flex-col overflow-hidden">
                <DashboardRightSideB />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ${open ? "overl" : ""} */