import HeaderForAllBackOffice from "@/mycomponents/ui/HeaderForAllBackOffice";
import { Outlet } from "react-router-dom";
import { FooterBackoffice } from "@/mycomponents/acceuilPage/FooterBackoffice";

function MainPopupBanners() {
  return (
    <div className="w-full flex flex-col pl-3  ">
      <HeaderForAllBackOffice />
      {/* all the other elements */}

      <div className="w-full pr-6">
        <Outlet />
      </div>

      <FooterBackoffice />
    </div>
  );
}

export default MainPopupBanners;
