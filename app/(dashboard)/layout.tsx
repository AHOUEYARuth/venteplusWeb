"use client";
import { useState , useEffect} from "react";
import DashboardRightSideB from "@/components/layout/DashboardRightSideB";
import DashboardLeftSideBar from "@/components/layout/DashboardLeftSideBar";
import DashboardNavBar from "@/components/layout/DashboardNavBar";
import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLoginStore } from "../login/loginStore/loginStore";
import { ClipLoader, PuffLoader } from "react-spinners";
import { useDashboardStore } from "./dashboard/dashboardStore/dashboardStore";
 
export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const { user } = useLoginStore();
  const router = useRouter();
  const { stats, setStats, getStatsAction } = useDashboardStore();
  const { shop } = useLoginStore();

   async function applyGetStatsAction(shopId) {
     setStats([]);
     setLoading(true);
     await getStatsAction(shopId).then((response) => {
       console.log("data");
        console.log(response.data);
       setStats(response.data);
       setLoading(false);
     });
   }

  useEffect(() => {
    (function init() {
      if (!localStorage.getItem("access-token")) {
        router.push("/login");
      } else {
        if (loading) {
          setTimeout(() => {
            setLoading(false);
          }, 5000);
        }
        if (shop?.id) {
          applyGetStatsAction(shop?.id);
        }
        
      }
    })();
  }, [shop]);

  const hidePaths = [
    "/selling",
    "/stock",
    "/customerCredits",
    "/spending",
    "/customer",
    "/employee"
  ]

  return (
    <div className="w-full overl h-[100vh] bg-[#FFFFFF] p-5 overflow-hidden">
      {loading == true ? (
        <div className="w-[100vw] h-[100vh] left-0 fixed top-0 bg-[black] flex flx-col items-center justify-center z-50">
          <PuffLoader size={100} color="orange" />
        </div>
      ) : null}
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