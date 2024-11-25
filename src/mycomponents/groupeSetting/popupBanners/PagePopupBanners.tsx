import { FooterBackoffice } from "@/mycomponents/acceuilPage/FooterBackoffice";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { PopupBannersDataType, requestTogetAllUniversalData } from "@/fakeData";
import { NavLink } from "react-router-dom";
import { PlusIcon } from "@/mycomponents/clientGererPage/ClientGerer";

import UniversalSearchBar from "@/mycomponents/ui/searchBarUi/UniversalSearchBar";
import UniversalDataComponent from "@/mycomponents/ui/UniversalDataComponent";

const databaseName = "PopupBannersData";

function PagePopupBanners() {
  const [popupBannersData, setPopupBannersData] =
    useState<PopupBannersDataType[]>();
  const [loadingFail, setLoadingFail] = useState(false);
  const valueSearchKey: keyof PopupBannersDataType = "title";
  useEffect(() => {
    const getAllPopupBannersData = async () => {
      try {
        const data = await requestTogetAllUniversalData<PopupBannersDataType>(
          databaseName
        );
        setPopupBannersData([...data]);
      } catch (error) {
        setLoadingFail(true);
      }
    };
    getAllPopupBannersData();
  }, []);

  if (!popupBannersData && !loadingFail) {
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
              <span className="icon-[tabler--square] text-3xl"></span>
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                Popup Banners
              </h1>
            </div>
          </div>
          <p className="bg-[#e91e63] px-2 py-1 align-middle self-center rounded-lg text-white ">
            Total: {popupBannersData?.length}
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
                to="/POPUPBANNERS/ajouter-des-popupbanners"
                className="px-2 py-2 bg-[#e91e63] text-white font-bold rounded-md "
              >
                <span className="inline-block">{PlusIcon("15", "15")}</span>{" "}
                Ajouter des Banners
              </NavLink>
            </button>
          </div>
          <UniversalSearchBar<PopupBannersDataType>
            placeholder="Recherche par nom ..."
            setData={setPopupBannersData}
            database="PopupBannersData"
            searchKey={valueSearchKey}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 py-4  w-full border-[2px] shadow-xl rounded-xl mt-5 px-3 ">
        <div className="w-full mt-5">
          <div className="w-full grid grid-cols-7 mb-2">
            <p className="text-center  ">Banner</p>
            <p className="text-center   ">Nom</p>
            <p className="text-center  ">Type</p>
            <p className="text-center   ">Date Creation</p>
            <p className="text-center   ">Date mise à jour</p>
            <p className="text-center   ">Status</p>
            <p className="text-center   ">Action</p>
          </div>

          {popupBannersData?.map((value, index) => (
            <Fragment key={index}>
              <UniversalDataComponent<PopupBannersDataType>
                value={value}
                index={index}
                setData={setPopupBannersData}
                setLoadingFail={setLoadingFail}
                baseUrl="POPUPBANNERS/update-popupbanners-page"
                databaseName={databaseName}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default PagePopupBanners;
