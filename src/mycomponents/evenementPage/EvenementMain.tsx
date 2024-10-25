import HeaderForAllBackOffice from "../ui/HeaderForAllBackOffice";
import { FooterBackoffice } from "../acceuilPage/FooterBackoffice";
import { Outlet } from "react-router-dom";

function EvenementMain() {
  return (
    <div className="w-full flex flex-col pl-3 ">
      <HeaderForAllBackOffice />
      {/* all the other elements */}

      <Outlet />
      <FooterBackoffice />
    </div>
  );
}

export default EvenementMain;
