import { faker } from "@faker-js/faker";
import CardAddGroup from "../ui/CardAddGroup";
import { CarteCreerForGroup } from "../ui/CarteCreer";

import SearbarBackOffice from "../ui/SearbarBackOffice";
import { format } from "date-fns";
import { DropdownMenuBackoffice } from "../ui/DropdownMenuBackoffice";

import { Fragment } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { GroupeDataType, requestTogetAllGroupeData } from "@/fakeData";

export const groupeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 20 20"
  >
    <path
      fill="currentColor"
      d="M8.03 4.46c-.29 1.28.55 3.46 1.97 3.46c1.41 0 2.25-2.18 1.96-3.46c-.22-.98-1.08-1.63-1.96-1.63c-.89 0-1.74.65-1.97 1.63m-4.13.9c-.25 1.08.47 2.93 1.67 2.93s1.92-1.85 1.67-2.93c-.19-.83-.92-1.39-1.67-1.39s-1.48.56-1.67 1.39m8.86 0c-.25 1.08.47 2.93 1.66 2.93c1.2 0 1.92-1.85 1.67-2.93c-.19-.83-.92-1.39-1.67-1.39c-.74 0-1.47.56-1.66 1.39m-.59 11.43l1.25-4.3C14.2 10 12.71 8.47 10 8.47c-2.72 0-4.21 1.53-3.44 4.02l1.26 4.3C8.05 17.51 9 18 10 18c.98 0 1.94-.49 2.17-1.21m-6.1-7.63c-.49.67-.96 1.83-.42 3.59l1.12 3.79c-.34.2-.77.31-1.2.31c-.85 0-1.65-.41-1.85-1.03l-1.07-3.65c-.65-2.11.61-3.4 2.92-3.4c.27 0 .54.02.79.06c-.1.1-.2.22-.29.33m8.35-.39c2.31 0 3.58 1.29 2.92 3.4l-1.07 3.65c-.2.62-1 1.03-1.85 1.03c-.43 0-.86-.11-1.2-.31l1.11-3.77c.55-1.78.08-2.94-.42-3.61c-.08-.11-.18-.23-.28-.33c.25-.04.51-.06.79-.06"
    />
  </svg>
);

export const dataForGroup = [
  {
    title: faker.word.words(3),
    date: format(
      faker.date.between({ from: "2023-01-01", to: Date.now() }),
      " dd/MM/yyy 'à' kk:mm"
    ),
    subtitle: faker.word.words(6),
  },
];

function GroupePage() {
  const [groupeData, setGroupeData] = useState<GroupeDataType[]>();

  const [loadingFail, setLoadingFail] = useState(false);

  useEffect(() => {
    const getAllGroupeData = async () => {
      try {
        const data = await requestTogetAllGroupeData();
        setGroupeData([...data]);
      } catch (error) {
        setLoadingFail(true);
      }
    };
    getAllGroupeData();
  }, []);

  if (!groupeData && !loadingFail) {
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
              {groupeIcon}
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                GROUPES
              </h1>
            </div>
          </div>
          <p className="bg-[#e91e63] px-2 py-1 align-middle self-center rounded-lg text-white ">
            Total: 6
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center justify-center">
            <DropdownMenuBackoffice title="Setting" />
          </div>

          <p className="align-middle self-center">Communauté</p>
          <select
            title="Select element"
            id="countries"
            className=" w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>{faker.word.words(2)}</option>
          </select>
          <SearbarBackOffice placeholder="Recherche par nom de groupe..." />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-around gap-6 mt-16">
        <NavLink to="/GROUPES/create-new-groupe">
          <CardAddGroup icon={groupeIcon} text="CREER UN NOUVEAU GROUP" />
        </NavLink>

        {groupeData?.map((value, index) => (
          <div key={index}>
            <CarteCreerForGroup
              titleGroupe={value.titleGroupe}
              descriptionGroupe={value.descriptionGroupe}
              typeAccess={value.typeAccess}
              dateGroupe={value.date}
              logoUrlGroupe={value.logoUrlGroupe}
              banniereGroupe={value.banniereUrlGroupe}
              groupeId={value.id}
              status={value.status}
            />
          </div>
        ))}
      </div>
      {/*  <FooterBackoffice /> */}
    </Fragment>
  );
}

export default GroupePage;
