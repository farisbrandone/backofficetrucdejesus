import { Toaster } from "@/components/ui/toaster";
import { NavLink } from "react-router-dom";
import HeaderForAllBackOffice from "@/mycomponents/ui/HeaderForAllBackOffice";
import { FooterBackoffice } from "@/mycomponents/acceuilPage/FooterBackoffice";
import { BodyPrivacyTerms } from "./BodyPrivacyTerms";

function PagePrivacyTerms() {
  return (
    <div className="w-full flex flex-col pl-3 ">
      <HeaderForAllBackOffice />
      <div className="w-full flex flex-col gap-4 max-[840px]:w-full min-[840px]:flex-row min-[840px]:items-center min-[840px]:justify-between mt-10">
        <div className="flex justify-between items-center w-full pr-2 ">
          <div className="titleAcceuil">
            <div className=" flex items-center gap-2 text-[#e91e63] mt-3">
              <span className="icon-[fa6-solid--lock] text-3xl "></span>
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                Privacy & Terms
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-5 mr-4">
            <button
              type="button"
              title="Retour à la page communauté"
              className="flex items-center"
            >
              <NavLink
                to="/GROUPES"
                className="flex items-center px-2 py-2 bg-[#fff] text-[#191919] font-bold rounded-md border-solid border-[1px] border-[#191919]"
              >
                <span className="icon-[material-symbols--arrow-circle-left-rounded] text-xl  mr-1 "></span>{" "}
                <span>Retour</span>
              </NavLink>
            </button>
          </div>
        </div>
      </div>

      <div className=" w-full px-2 flex items-center  mt-[20px] mx-auto ">
        <BodyPrivacyTerms />
        <Toaster />
      </div>

      <FooterBackoffice />
    </div>
  );
}

export { PagePrivacyTerms };
