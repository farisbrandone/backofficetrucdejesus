import HeaderForAllBackOffice from "../ui/HeaderForAllBackOffice";
import { Outlet } from "react-router-dom";
import { FooterBackoffice } from "../acceuilPage/FooterBackoffice";

function MembreMain() {
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

export default MembreMain;
