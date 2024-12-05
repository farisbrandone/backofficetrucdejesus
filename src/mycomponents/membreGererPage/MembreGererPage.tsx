import { FooterBackoffice } from "../acceuilPage/FooterBackoffice";
/* import { DropdownMenuBackoffice } from "../ui/DropdownMenuBackoffice";
import { faker } from "@faker-js/faker";
import SearbarBackOffice from "../ui/SearbarBackOffice"; */
import { membreIcon } from "../acceuilPage/Icon";
import { Fragment } from "react/jsx-runtime";
import MemberDataComponent, { MemberDataType } from "./MemberDataComponent";
import { ChangeEvent, useEffect, useState } from "react";
import { requestTogetAllUniversalData } from "@/fakeData";
import { NavLink, useParams } from "react-router-dom";
import { PlusIcon } from "../clientGererPage/ClientGerer";
import SearchBarForMembre from "../ui/searchBarUi/SearchBarForMembre";
import { CommunityDataType } from "../communautePage/CommunityDetails";

function MembreGererPage() {
  const [membreData, setMembreData] = useState<MemberDataType[]>();
  const [loadingFail, setLoadingFail] = useState(false);
  const { communityId } = useParams<string>();
  const [communityData, setCommunityData] = useState<CommunityDataType[]>();
  const [notPossiblbleToCrateGroupe, setNotPossiblbleToCrateGroupe] =
    useState(false);
  const [communitySelect, setCommunitySelect] = useState(communityId);

  const handleCommunitySelect = async (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setCommunitySelect(e.target.value);
    const result1 = await requestTogetAllUniversalData<MemberDataType>(
      "MemberData"
    );
    const trueResult = result1.filter(
      (value) => value.communityId === e.target.value
    );

    setMembreData([...trueResult]);
  };

  /*  useEffect(() => {
    const getAllMembreData = async () => {
      try {
        const data = await requestTogetAllUniversalData<MemberDataType>(
          "MemberData"
        );
        setMembreData([...data]);
      } catch (error) {
        setLoadingFail(true);
      }
    };
    getAllMembreData();
  }, []); */

  useEffect(() => {
    const getAllGroupeData = async () => {
      try {
        const data = requestTogetAllUniversalData<MemberDataType>("MemberData");

        const commData =
          requestTogetAllUniversalData<CommunityDataType>("CommunityData");

        const [result1, result2] = await Promise.all([data, commData]);

        if (communityId) {
          const trueResult = result1.filter(
            (value) => value.communityId === communityId
          );

          setMembreData(trueResult);
          setCommunityData([...result2]);
        } else {
          if (result1.length > 0 && result2.length > 0) {
            setCommunitySelect(result1[0].communityId);
            const trueResult = result1.filter(
              (value) => value.communityId === result1[0].communityId
            );
            setMembreData([...trueResult]);
            setCommunityData([...result2]);
          } else if (result1.length === 0 && result2.length > 0) {
            setCommunitySelect(result2[0].id);
            setCommunityData([...result2]);
            setMembreData([...result1]);
          } else if (result2.length === 0) {
            setNotPossiblbleToCrateGroupe(true);
          }
        }
      } catch (error) {
        setLoadingFail(true);
      }
    };
    getAllGroupeData();
  }, []);

  if (notPossiblbleToCrateGroupe) {
    return (
      <div className="w-full text-center pt-4">
        Impossible de créer un groupe car aucune communauté n'a été créée
      </div>
    );
  }

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
  console.log(membreData?.length);
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
                to={`/GERER LES MEMBRES/ajouter-des-membres/${communitySelect}`}
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
            value={communitySelect}
            onChange={handleCommunitySelect}
          >
            {communityData?.map((value) => (
              <option value={value.id}>{value.title}</option>
            ))}
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

          {membreData?.length &&
            membreData?.map((value, index) => (
              <Fragment key={index}>
                <MemberDataComponent
                  value={value}
                  index={index}
                  setMembreData={setMembreData}
                  setLoadingFail={setLoadingFail}
                  communityId={communitySelect}
                />
              </Fragment>
            ))}
        </div>
      </div>
    </Fragment>
  );
}

export default MembreGererPage;
