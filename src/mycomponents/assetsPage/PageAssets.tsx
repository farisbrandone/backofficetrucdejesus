import { FooterBackoffice } from "../acceuilPage/FooterBackoffice";
/* import { DropdownMenuBackoffice } from "../ui/DropdownMenuBackoffice";
import { faker } from "@faker-js/faker";
import SearbarBackOffice from "../ui/SearbarBackOffice"; */
import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { AssetsDataType, requestTogetAllUniversalData } from "@/fakeData";
import { NavLink } from "react-router-dom";

import AssetsComponent from "./AssetsComponent";
import { PlusIcon } from "../channelPage/ChannelPage";
import SearchBarForAssets from "../ui/searchBarUi/SearchBarForAssets";

function PageAssets() {
  const [assetsData, setAssetsData] = useState<AssetsDataType[]>();
  const [loadingFail, setLoadingFail] = useState(false);
  const databaseName = "AssetsData";
  useEffect(() => {
    const getAllAssetsData = async () => {
      try {
        const data = await requestTogetAllUniversalData<AssetsDataType>(
          databaseName
        );
        setAssetsData([...data]);
      } catch (error) {
        setLoadingFail(true);
      }
    };
    getAllAssetsData();
  }, []);

  if (!assetsData && !loadingFail) {
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
              <span className="icon-[streamline--investment-selection] text-3xl"></span>
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                GERER LES ASSETS
              </h1>
            </div>
          </div>
          <p className="bg-[#e91e63] px-2 py-1 align-middle self-center rounded-lg text-white ">
            Total: {assetsData?.length}
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
            {/*  <DropDownLesson title="Ajouter des leçons" /> */}
            <button
              type="button"
              title="Ajouter des leçons"
              className="flex items-center"
            >
              <NavLink
                to="/GERER LES ASSETS/ajouter-des-assets"
                className="px-2 py-2 bg-[#e91e63] text-white font-bold rounded-md "
              >
                <span className="inline-block">{PlusIcon("15", "15")}</span>{" "}
                Ajouter des assets
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
          <SearchBarForAssets
            placeholder="Recherche par nom de leçons..."
            setAssetsData={setAssetsData}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 py-4  w-full border-[2px] shadow-xl rounded-xl mt-5 px-3 ">
        <div className=" rounded-xl w-full p-4 bg-[#e91e63] flex items-center justify-between">
          <p className="text-white text-[20px] font-bold">Liste des assets</p>
        </div>
        <div className="w-full mt-5">
          <div className="w-full grid grid-cols-6 mb-2">
            <p className="text-center  ">Nom de l'asset</p>
            <p className="text-center   ">Image de l'asset</p>
            <p className="text-center   ">Montant de l'asset</p>
            <p className="text-center   ">Date de création de l'asset</p>
            <p className="text-center   ">Status</p>
            <p className="text-center ">ACTION</p>
          </div>

          {assetsData?.map((value, index) => (
            <Fragment key={index}>
              <AssetsComponent
                value={value}
                index={index}
                setAssetsData={setAssetsData}
                setLoadingFail={setLoadingFail}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default PageAssets;
