import HeaderForAllBackOffice from "../ui/HeaderForAllBackOffice";
import { Outlet } from "react-router-dom";
import { FooterBackoffice } from "../acceuilPage/FooterBackoffice";

function GroupeMain() {
  return (
    <div className="w-full flex flex-col pl-3 ">
      <HeaderForAllBackOffice />
      {/* all the other elements */}

      <Outlet />
      <FooterBackoffice />
    </div>
  );
}

export default GroupeMain;
