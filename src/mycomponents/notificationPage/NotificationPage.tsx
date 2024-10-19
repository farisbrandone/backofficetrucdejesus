import React from "react";
import { SidebarComponents } from "../sidebarComponents/SidebarComponents";
import HeaderBackoffice from "../header/HeaderBackoffice";
import { MyBody } from "../body/MyBody";
import { Toaster } from "@/components/ui/toaster";

function NotificationPage() {
  return (
    <>
      {/*  <div className="flex gap-0 w-[100vw] "> */}
      {/*  <div className="sidebar ">
        <SidebarComponents />
      </div> */}
      {/*  <div className="flex-1"> */}
      <HeaderBackoffice />
      <div className=" w-full px-2 flex items-center justify-center mt-[100px] mx-auto ">
        <MyBody />
        <Toaster />
      </div>
      {/*  </div>
    </div> */}
    </>
  );
}

export { NotificationPage };
