import { FooterBackoffice } from "../acceuilPage/FooterBackoffice";
/* import { DropdownMenuBackoffice } from "../ui/DropdownMenuBackoffice";
import { faker } from "@faker-js/faker";
import SearbarBackOffice from "../ui/SearbarBackOffice"; */
import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { requestTogetAllRessourcesData, RessourcesDataType } from "@/fakeData";
import { NavLink } from "react-router-dom";
import { PlusIcon } from "../clientGererPage/ClientGerer";
import SearchBarForRessource from "../ui/searchBarUi/SearchBarForRessource";
import RessourceDataComponent from "./RessourceDataComponent";
import { ressourceIcon } from "./UpdateRessourcesPage";

function RessourcesPage() {
  const [ressourcesData, setRessourcesData] = useState<RessourcesDataType[]>();
  const [loadingFail, setLoadingFail] = useState(false);

  useEffect(() => {
    const getAllRessourcesData = async () => {
      try {
        const data = await requestTogetAllRessourcesData();
        setRessourcesData([...data]);
      } catch (error) {
        setLoadingFail(true);
      }
    };
    getAllRessourcesData();
  }, []);

  if (!ressourcesData && !loadingFail) {
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
              {ressourceIcon("30", "30")}
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                GERER LES RESSOURCES
              </h1>
            </div>
          </div>
          <p className="bg-[#e91e63] px-2 py-1 align-middle self-center rounded-lg text-white ">
            Total: {ressourcesData?.length}
          </p>
        </div>
        <div className="flex gap-3">
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
          <div className="flex items-center justify-center">
            <button
              type="button"
              title="Ajouter des ressources"
              className="flex items-center"
            >
              <NavLink
                to="/GERER LES RESSOURCES/ajouter-des-ressources"
                className="px-2 py-2 bg-[#e91e63] text-white font-bold rounded-md "
              >
                <span className="inline-block">{PlusIcon("15", "15")}</span>{" "}
                Ajouter des ressources
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
          <SearchBarForRessource
            placeholder="Recherche par nom de ressource..."
            setRessourcesData={setRessourcesData}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 py-4  w-full border-[2px] shadow-xl rounded-xl mt-5 px-3 ">
        <div className=" rounded-xl w-full p-4 bg-[#e91e63] flex items-center justify-between">
          <p className="text-white text-[20px] font-bold">
            Liste des ressources
          </p>
        </div>
        <div className="w-full mt-5">
          <div className="w-full grid grid-cols-7 mb-2">
            <p className="text-center  ">Titre</p>
            <p className="text-center   ">Image</p>
            <p className="text-center  ">Type</p>
            <p className="text-center   ">Date</p>
            <p className="text-center   ">Text du button</p>
            <p className="text-center   ">Status</p>
            <p className="text-center ">ACTION</p>
          </div>

          {ressourcesData?.map((value, index) => (
            <Fragment key={index}>
              <RessourceDataComponent
                value={value}
                index={index}
                setRessourcesData={setRessourcesData}
                setLoadingFail={setLoadingFail}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default RessourcesPage;
