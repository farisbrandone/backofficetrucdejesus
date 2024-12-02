import { useState } from "react";
import ColorCustumisation from "./ColorCustumisation";
import CommunityDetails from "./CommunityDetails";
import { communauteIcon } from "./UpdateCommunaute";
import clsx from "clsx";

function CreerCommunaute() {
  const [openState, setOpenState] = useState(true);
  const [comunityId, setCommunityId] = useState("");
  /*  const styleInput = clsx(
    `absolute w-[38px] top-[2px] bottom-[2px] right-[2px] border-[1px] border-solid border-[#000]/50`
  ); */
  return (
    <>
      <div className="w-full flex flex-col gap-4 max-[840px]:w-full min-[840px]:flex-row min-[840px]:items-center min-[840px]:justify-between mt-10">
        <div className="flex gap-3 ">
          <div className="titleAcceuil">
            <div className=" flex items-center gap-2 text-[#e91e63] mt-3">
              {communauteIcon("30", "30")}
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                CREER UNE COMMUNAUTE
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 ">
        <div className="flex items-center gap-3 mb-5 ">
          <div
            className={clsx(
              "flex items-center gap-1 px-2 py-1 shadow-xl cursor-pointer",
              { "text-[#e91e63]": openState }
            )}
            onClick={() => setOpenState(true)}
          >
            {" "}
            <span className="icon-[material-symbols--info]"></span>{" "}
            <p>Détails de la communauté</p>{" "}
          </div>
          <div
            className={clsx(
              "relative flex items-center gap-1 px-2 py-1 shadow-xl cursor-pointer",
              { "text-[#e91e63]": !openState && comunityId }
            )}
            onClick={() => {
              if (comunityId) {
                setOpenState(false);
              }
            }}
          >
            <span className="icon-[bx--paint]"></span>
            <p>Personnalisation des couleurs</p>
            {}
          </div>
        </div>
        {openState && (
          <CommunityDetails
            setCommunityId={setCommunityId}
            comunityId={comunityId}
          />
        )}

        {!openState && <ColorCustumisation />}
      </div>
    </>
  );
}

export default CreerCommunaute;