import { MyBody } from "../body/MyBody";
import { Toaster } from "@/components/ui/toaster";
import HeaderForAllBackOffice from "../ui/HeaderForAllBackOffice";
import { FooterBackoffice } from "../acceuilPage/FooterBackoffice";

export const ordiIcon = (width: string, heigth: string) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={heigth}
    viewBox="0 0 24 24"
  >
    <g fill="none" stroke="currentColor" stroke-width="2">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 19v-9a6 6 0 0 1 6-6v0a6 6 0 0 1 6 6v9M6 19h12M6 19H4m14 0h2m-9 3h2"
      />
      <circle cx="12" cy="3" r="1" />
    </g>
  </svg>
);

function NotificationPage() {
  return (
    <div className="w-full flex flex-col pl-3">
      {/*  <div className="flex gap-0 w-[100vw] "> */}
      {/*  <div className="sidebar ">
        <SidebarComponents />
      </div> */}
      {/*  <div className="flex-1"> */}
      <HeaderForAllBackOffice />
      <div className="w-full flex flex-col gap-4 max-[840px]:w-full min-[840px]:flex-row min-[840px]:items-center min-[840px]:justify-between mt-10">
        <div className="flex gap-3 ">
          <div className="titleAcceuil">
            <div className=" flex items-center gap-2 text-[#e91e63] mt-3">
              {ordiIcon("35", "35")}
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                NOTIFICATION
              </h1>
            </div>
          </div>
        </div>
      </div>
      {/* <HeaderBackoffice /> */}
      <div className=" w-full px-2 flex items-center  mt-[100px] mx-auto ">
        <MyBody />
        <Toaster />
      </div>
      {/*  </div>
    </div> */}
      <FooterBackoffice />
    </div>
  );
}

export { NotificationPage };
