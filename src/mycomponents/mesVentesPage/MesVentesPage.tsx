import HeaderForAllBackOffice from "../ui/HeaderForAllBackOffice";
import { FooterBackoffice } from "../acceuilPage/FooterBackoffice";
import SearbarBackOffice from "../ui/SearbarBackOffice";
import { mySaleIcon } from "../acceuilPage/Icon";
import { dollarIcon } from "../integrationPage/IntegrationPage";

export const ordiIcon = (width: string, heigth: string) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={heigth}
    viewBox="0 0 20 20"
  >
    <path
      fill="currentColor"
      d="M4.5 5A1.5 1.5 0 0 0 3 6.5v6A1.5 1.5 0 0 0 4.5 14h7a2.5 2.5 0 0 1 1.773-.99A3 3 0 0 1 17 8.401V6.5A1.5 1.5 0 0 0 15.5 5zm-2 10h8.55q-.05.243-.05.5q0 .25.038.5H2.5a.5.5 0 0 1 0-1m15-4a2 2 0 1 1-4 0a2 2 0 0 1 4 0m1.5 4.5c0 1.245-1 2.5-3.5 2.5S12 16.75 12 15.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5"
    />
  </svg>
);

function MesVentesPage() {
  return (
    <div className="flex flex-col w-full px-3">
      <HeaderForAllBackOffice />
      <div className="w-full flex flex-col gap-4 max-[840px]:w-full min-[840px]:flex-row min-[840px]:items-center min-[840px]:justify-between mt-10">
        <div className="flex gap-3 ">
          <div className="titleAcceuil">
            <div className=" flex items-center gap-2 text-[#e91e63] mt-3">
              {mySaleIcon}
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                MES VENTES
              </h1>
            </div>
          </div>
          {/* <p className="bg-[#e91e63] px-2 py-1 align-middle self-center rounded-lg text-white ">
            Total: 6
          </p> */}
        </div>
        <div className="flex gap-3">
          <p className="align-middle self-center">Communauté</p>
          <select
            title="Select element"
            id="countries"
            className=" w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Un Truc de Jesus!</option>
            {/*  <option value="US">{faker.word.words(1)}</option>
            <option value="CA">{faker.word.words(1)}</option>
            <option value="FR">{faker.word.words(1)}</option>
            <option value="DE">{faker.word.words(1)}</option> */}
          </select>
          <SearbarBackOffice placeholder="Recherche par nom de groupe..." />
        </div>
      </div>

      <div className="flex gap-2 w-full mt-8">
        <div className="flex items-center gap-2 px-5 py-3 rounded-lg shadow-xl cursor-pointer">
          <div className="text-[#e91e63]"> {dollarIcon("25", "25")} </div>
          <p className="text-[#e91e63] text-[14px] ">Actifs Vendu</p>
        </div>
        <div className="flex items-center gap-2 px-5 py-3 rounded-lg shadow-xl cursor-pointer">
          <div className="text-[#000]"> {ordiIcon("25", "25")} </div>
          <p className="text-[#000] text-[14px] ">Cannaux de ventes</p>
        </div>
      </div>

      <div></div>
      <FooterBackoffice />
    </div>
  );
}

export default MesVentesPage;
