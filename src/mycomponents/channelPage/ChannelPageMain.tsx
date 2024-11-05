import { Outlet } from "react-router-dom";
import HeaderForAllBackOffice from "../ui/HeaderForAllBackOffice";
import { FooterBackoffice } from "../acceuilPage/FooterBackoffice";

function ChannelPageMain() {
  return (
    <div className="w-full flex flex-col pl-3 ">
      <HeaderForAllBackOffice />
      {/* all the other elements */}

      <Outlet />
      <FooterBackoffice />
    </div>
  );
}

export { ChannelPageMain };
