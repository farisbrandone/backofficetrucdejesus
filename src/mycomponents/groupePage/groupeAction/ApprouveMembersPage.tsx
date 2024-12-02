import { Fragment, useEffect, useState } from "react";
import { requestTogetAllMembreData } from "@/fakeData";
import { NavLink, useParams } from "react-router-dom";

import AprouveComponent from "./AprouveComponent";
import { MemberDataType } from "@/mycomponents/membreGererPage/MemberDataComponent";
import { FooterBackoffice } from "@/mycomponents/acceuilPage/FooterBackoffice";
import SearchBarForMembre from "@/mycomponents/ui/searchBarUi/SearchBarForMembre";

function ApprouveMembersPage() {
  const [membreData, setMembreData] = useState<MemberDataType[]>();
  const [loadingFail, setLoadingFail] = useState(false);
  const { groupeId } = useParams<string>();

  useEffect(() => {
    const getAllMembreData = async () => {
      try {
        const data = await requestTogetAllMembreData();
        setMembreData([...data]);
      } catch (error) {
        setLoadingFail(true);
      }
    };
    getAllMembreData();
  }, []);

  if (!membreData && !loadingFail) {
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
      <div></div>
      <FooterBackoffice />
      <div className="w-full flex flex-col gap-4 max-[840px]:w-full min-[840px]:flex-row min-[840px]:items-center min-[840px]:justify-between mt-10">
        <div className="flex gap-3 ">
          <div className="titleAcceuil">
            <div className=" flex items-center gap-2 text-[#e91e63] mt-3">
              <span className="icon-[material-symbols--group-rounded] text-3xl mr-2"></span>
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                APPROUVER DES MEMBRES
              </h1>
            </div>
          </div>
          <p className="bg-[#e91e63] px-2 py-1 align-middle self-center rounded-lg text-white ">
            Total: {membreData?.length}
          </p>
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
          <SearchBarForMembre
            placeholder="Recherche par nom de membre..."
            setMemberData={setMembreData}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 py-4  w-full border-[2px] shadow-xl rounded-xl mt-5 px-3 ">
        <div className=" rounded-xl w-full p-4 bg-[#e91e63] flex items-center justify-between">
          <p className="text-white text-[20px] font-bold">
            GROUPE: {"Nom du groupe"}
          </p>
        </div>
        <div className="w-full mt-5">
          <div className="w-full grid grid-cols-5 mb-2">
            <p className="text-center  ">MEMBRE</p>
            <p className="text-center   ">PHONE</p>
            <p className="text-center   ">NAISSANCE</p>
            <p className="text-center   ">CREER</p>
            <p className="text-center ">STATUS</p>
          </div>

          {membreData?.map((value, index) => (
            <Fragment key={index}>
              <AprouveComponent
                value={value}
                index={index}
                setMembreData={setMembreData}
                setLoadingFail={setLoadingFail}
                groupeId={groupeId as string}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default ApprouveMembersPage;
