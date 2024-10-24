import { FooterBackoffice } from "../acceuilPage/FooterBackoffice";
import CardAddGroup from "../ui/CardAddGroup";
import CarteCreer from "../ui/CarteCreer";
import HeaderForAllBackOffice from "../ui/HeaderForAllBackOffice";
import SearbarBackOffice from "../ui/SearbarBackOffice";
import { faker } from "@faker-js/faker";

export const eventIcon = (width: string, heigth: string) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={heigth}
    viewBox="0 0 2048 2048"
  >
    <path
      fill="currentColor"
      d="M2048 128v1792H0V128h384V0h128v128h1024V0h128v128zM128 256v256h1792V256h-256v128h-128V256H512v128H384V256zm1792 1536V640H128v1152zm-512-896v640h-128v-486q-27 14-62 26t-66 12V960q12 0 31-6t39-15t36-21t22-21v-1zm-384 192q0 39-11 70t-31 58t-44 51t-51 46t-51 46t-47 49h235v128H640v-36q0-19-1-38t4-38t10-36q11-27 33-53t50-53t55-51t51-49t39-47t15-47q0-27-19-45t-45-19q-23 0-40 14t-23 37l-125-26q6-33 23-61t44-48t57-32t64-12q40 0 75 15t61 41t41 61t15 75"
    />
  </svg>
);

function EvenementPage() {
  return (
    <div className="w-full flex flex-col pl-3">
      <HeaderForAllBackOffice />
      <div className="w-full flex flex-col gap-4 max-[840px]:w-full min-[840px]:flex-row min-[840px]:items-center min-[840px]:justify-between mt-10">
        <div className="flex gap-3 ">
          <div className="titleAcceuil">
            <div className=" flex items-center gap-2 text-[#e91e63] mt-3">
              {eventIcon("30", "30")}
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                EVENEMENTS
              </h1>
            </div>
          </div>
          <p className="bg-[#e91e63] px-2 py-1 align-middle self-center rounded-lg text-white ">
            Total: 6
          </p>
        </div>
        <div className="flex gap-3">
          <p className="align-middle self-center">Communauté</p>
          <select
            title="Select element"
            id="countries"
            className=" w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>{faker.word.words(2)}</option>
            <option value="US">{faker.word.words(1)}</option>
            <option value="CA">{faker.word.words(1)}</option>
            <option value="FR">{faker.word.words(1)}</option>
            <option value="DE">{faker.word.words(1)}</option>
          </select>
          <SearbarBackOffice placeholder="Recherche par nom d'évènement" />
        </div>
      </div>
      <div className="flex flex-wrap gap-3 mt-6 px-5">
        <CardAddGroup
          icon={eventIcon("130", "130")}
          text="CREER UNE NOUVELLE COMMUNAUTE"
        />
        <CarteCreer
          value={0}
          title="Réseau 100% JÉSUS"
          date="18 Feb 2024"
          subTitle="Faisons confiance"
        />
      </div>
      <FooterBackoffice />
    </div>
  );
}

export default EvenementPage;
