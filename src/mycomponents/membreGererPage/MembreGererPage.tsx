import { FooterBackoffice } from "../acceuilPage/FooterBackoffice";
/* import { DropdownMenuBackoffice } from "../ui/DropdownMenuBackoffice";
import { faker } from "@faker-js/faker";
import SearbarBackOffice from "../ui/SearbarBackOffice"; */
import { membreIcon } from "../acceuilPage/Icon";
import { Fragment } from "react/jsx-runtime";
import MemberDataComponent, { MemberDataType } from "./MemberDataComponent";
import { useEffect, useState } from "react";
import { requestTogetAllMembreData } from "@/fakeData";
import { NavLink } from "react-router-dom";
import { PlusIcon } from "../clientGererPage/ClientGerer";
import SearchBarForMembre from "../ui/searchBarUi/SearchBarForMembre";

function MembreGererPage() {
  const [membreData, setMembreData] = useState<MemberDataType[]>();
  const [loadingFail, setLoadingFail] = useState(false);
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
              {membreIcon}
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                GERER LES MEMBRES
              </h1>
            </div>
          </div>
          <p className="bg-[#e91e63] px-2 py-1 align-middle self-center rounded-lg text-white ">
            Total: {membreData?.length}
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center justify-center">
            <button
              type="button"
              title="Ajouter des clients"
              className="flex items-center"
            >
              <NavLink
                to="/GERER LES MEMBRES/ajouter-des-membres"
                className="px-2 py-2 hover:bg-[#e91e63] bg-[#191919] text-white font-bold rounded-md transition-colors"
              >
                <span className="inline-block">{PlusIcon("15", "15")}</span>{" "}
                Ajouter des membres
              </NavLink>
            </button>
          </div>

          <p className="align-middle self-center">Communauté</p>
          <select
            title="Select element"
            id="countries"
            className=" w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Un Truc de Jesus!</option>
          </select>
          <SearchBarForMembre
            placeholder="Recherche par nom de membre..."
            setMemberData={setMembreData}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 py-4  w-full border-[2px] shadow-xl rounded-xl mt-5 px-3 ">
        <div className=" rounded-xl w-full p-4 bg-[#e91e63] flex items-center justify-between">
          <p className="text-white text-[20px] font-bold">Liste des membres</p>
        </div>
        <div className="w-full mt-5">
          <div className="w-full grid grid-cols-10 mb-2">
            <p className="text-center  ">MEMBRE</p>
            <p className="text-center   ">LOGO</p>
            <p className="text-center  ">MOT DE PASSE</p>
            <p className="text-center   ">SEXE</p>
            <p className="text-center   ">PHONE</p>
            <p className="text-center   ">NAISSANCE</p>
            <p className="text-center   ">CREER</p>
            <p className=" text-center ">MISE A JOUR</p>
            <p className="text-center ">STATUS</p>
            <p className="text-center ">ACTION</p>
          </div>

          {membreData?.map((value, index) => (
            <Fragment key={index}>
              <MemberDataComponent
                value={value}
                index={index}
                setMembreData={setMembreData}
                setLoadingFail={setLoadingFail}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default MembreGererPage;
