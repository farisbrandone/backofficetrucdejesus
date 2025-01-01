import SearbarBackOffice from "../ui/SearbarBackOffice";
//import CardAddGroup from "../ui/CardAddGroup";
/* import CarteCreer from "../ui/CarteCreer"; */

import { Fragment } from "react/jsx-runtime";
import { communauteIcon } from "./UpdateCommunaute";
//import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { CommunityDataType } from "./CommunityDetails";
import { requestTogetAllUniversalData } from "@/fakeData";
import CommunityCard from "./ui/CommunityCard";

export const icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="125"
    height="125"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M10.275 12q-.7 0-1.15-.525T8.8 10.25l.3-1.8q.2-1.075 1.013-1.763T12 6q1.1 0 1.913.688t1.012 1.762l.3 1.8q.125.7-.325 1.225T13.75 12zm.6-2h2.275l-.2-1.225q-.05-.35-.325-.562T12 8t-.612.213t-.313.562zM3.1 12.975q-.575.025-.988-.225t-.537-.775q-.05-.225-.025-.45t.125-.425q0 .025-.025-.1q-.05-.05-.25-.6q-.05-.3.075-.575T1.8 9.35l.05-.05q.05-.475.388-.8t.837-.325q.075 0 .475.1l.075-.025q.125-.125.325-.187T4.375 8q.275 0 .488.088t.337.262q.025 0 .038.013t.037.012q.35.025.612.212t.388.513q.05.175.038.338t-.063.312q0 .025.025.1q.175.175.275.388t.1.437q0 .1-.15.525q-.025.05 0 .1l.05.4q0 .525-.437.9t-1.063.375zM20 13q-.825 0-1.412-.587T18 11q0-.3.088-.562t.237-.513l-.7-.625q-.25-.2-.088-.5T18 8.5h2q.825 0 1.413.588T22 10.5v.5q0 .825-.587 1.413T20 13M0 17v-.575q0-1.1 1.113-1.763T4 14q.325 0 .625.013t.575.062q-.35.5-.525 1.075T4.5 16.375V18H1q-.425 0-.712-.288T0 17m6 0v-.625q0-1.625 1.663-2.625t4.337-1q2.7 0 4.35 1T18 16.375V17q0 .425-.288.713T17 18H7q-.425 0-.712-.288T6 17m14-3q1.8 0 2.9.663t1.1 1.762V17q0 .425-.288.713T23 18h-3.5v-1.625q0-.65-.162-1.225t-.488-1.075q.275-.05.563-.062T20 14m-8 .75q-1.425 0-2.55.375T8.125 16H15.9q-.225-.5-1.338-.875T12 14.75M12.025 9"
    />
  </svg>
);

function CommunautePage() {
  const [communityData, setCommunityData] = useState<CommunityDataType[]>();

  const [loadingFail, setLoadingFail] = useState(false);

  useEffect(() => {
    const getAllEventData = async () => {
      try {
        const data = await requestTogetAllUniversalData<CommunityDataType>(
          "CommunityData"
        );

        setCommunityData([...data]);
      } catch (error) {
        setLoadingFail(true);
      }
    };
    getAllEventData();
  }, []);

  if (!communityData && !loadingFail) {
    return (
      <div className="w-full text-center pt-4">
        Le document est en cours de chargement ...
      </div>
    );
  }

  if (loadingFail) {
    return (
      <div className="w-full text-center pt-4">
        Une erreur est survenue pendant le chargement ou problème de connexion
      </div>
    );
  }

  return (
    <Fragment>
      {/*  <HeaderForAllBackOffice /> */}
      <div className="w-full flex flex-col gap-4 max-[840px]:w-full min-[840px]:flex-row min-[840px]:items-center min-[840px]:justify-between mt-10">
        <div className="flex gap-3 ">
          <div className="titleAcceuil">
            <div className=" flex items-center gap-2 text-[#e91e63] mt-3">
              {communauteIcon("30", "30")}
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                COMMUNAUTE
              </h1>
            </div>
          </div>
          <p className="bg-[#e91e63] px-2 py-1 align-middle self-center rounded-lg text-white ">
            Total: 1
          </p>
        </div>
        <div>
          <SearbarBackOffice placeholder="Recherche par nom de communaute..." />
        </div>
      </div>
      <div className="flex flex-wrap gap-3 mt-[100px] px-5">
        {/*  <NavLink to="/COMMUNAUTES/create-new-community">
          <CardAddGroup
            icon={icon}
            text="CREER UNE NOUVELLE COMMUNAUTE"
            database="CommunityData"
          />
        </NavLink> */}
        {/*  {communityData && communityData.length > 0 && (
          <CarteCreer
            value={0}
            title="Réseau 100% JÉSUS"
            date="18 Feb 2024"
            subTitle="Faisons confiance"
            valueCommunity={communityData[0]}
          />
        )} */}

        {communityData &&
          communityData.length > 0 &&
          communityData.map((value) => (
            <Fragment key={value.id}>
              <CommunityCard
                valueCommunity={value}
                setCommunityData={setCommunityData}
                setLoadingFail={setLoadingFail}
              />
            </Fragment>
          ))}
      </div>
    </Fragment>
  );
}

export default CommunautePage;
