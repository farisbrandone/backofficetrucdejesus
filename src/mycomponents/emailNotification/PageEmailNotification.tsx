import { Toaster } from "@/components/ui/toaster";
import HeaderForAllBackOffice from "../ui/HeaderForAllBackOffice";
import { FooterBackoffice } from "../acceuilPage/FooterBackoffice";
import { NavLink, useParams } from "react-router-dom";
import { BodyEmailNotification } from "./BodyEmailNotification";

function PageEmailNotification() {
  const { communityId } = useParams<string>();
  return (
    <div className="w-full flex flex-col pl-3 ">
      <HeaderForAllBackOffice />
      <div className="w-full flex flex-col gap-4 max-[840px]:w-full min-[840px]:flex-row min-[840px]:items-center min-[840px]:justify-between mt-10">
        <div className="flex justify-between items-center w-full pr-2 ">
          <div className=" flex items-center gap-2 text-[#e91e63] mt-3">
            <span className="icon-[pepicons-print--send] text-3xl"></span>
            <h1 className=" text-[#344767] font-bold text-[18px] ">
              Paramétrage{" "}
              <span className="hidden sm:inline">
                Notification de communauté
              </span>
            </h1>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="button"
              title="Retour à la page communauté"
              className="flex items-center"
            >
              <NavLink
                to="/COMMUNAUTES"
                className="flex items-center px-2 py-2 bg-[#fff] text-[#191919] font-bold rounded-md border-solid border-[1px] border-[#191919]"
              >
                <span className="icon-[material-symbols--arrow-circle-left-rounded] text-xl  mr-1 "></span>{" "}
                <span>Retour</span>
              </NavLink>
            </button>
          </div>
        </div>
      </div>
      {/* <HeaderBackoffice /> */}
      <div className=" w-full px-2 flex items-center  mt-[20px] mx-auto ">
        <BodyEmailNotification communityId={communityId as string} />
        <Toaster />
      </div>
      {/*  </div>
    </div> */}
      <FooterBackoffice />
    </div>
  );
}

export { PageEmailNotification };
