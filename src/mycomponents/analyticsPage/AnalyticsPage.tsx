import { faker } from "@faker-js/faker";
import { FooterBackoffice } from "../acceuilPage/FooterBackoffice";
import HeaderForAllBackOffice from "../ui/HeaderForAllBackOffice";
import { ChartAcceuil } from "../acceuilPage/ChartComponent";
import { arrayChart } from "../acceuilPage/AcceuilPage";
import {
  communauteIcon,
  eventIcon,
  membreIcon,
  myicon,
  mySaleIcon,
} from "../acceuilPage/Icon";
import { Fragment } from "react/jsx-runtime";
import CardGlogalData from "../acceuilPage/CardGlobal";

export const analyticsIcon = (width: string, heigth: string) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={heigth}
    viewBox="0 0 32 32"
  >
    <path fill="currentColor" d="M4 2H2v26a2 2 0 0 0 2 2h26v-2H4Z" />
    <path
      fill="currentColor"
      d="M30 9h-7v2h3.59L19 18.59l-4.29-4.3a1 1 0 0 0-1.42 0L6 21.59L7.41 23L14 16.41l4.29 4.3a1 1 0 0 0 1.42 0l8.29-8.3V16h2Z"
    />
  </svg>
);

export const commentIcon = (width: string, heigth: string) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={heigth}
    viewBox="0 0 512 512"
  >
    <path
      fill="currentColor"
      d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160S380.7 80 256 80S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9q2.7-4.05 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8.2-1.6.3-2.4.5c-4.4.8-8.7 1.5-13.2 1.9c-.2 0-.5.1-.7.1c-5.1.5-10.2.8-15.3.8c-6.5 0-12.3-3.9-14.8-9.9S0 457.4 4.5 452.8c4.1-4.2 7.8-8.7 11.3-13.5q2.55-3.45 4.8-6.9l.3-.5z"
    />
  </svg>
);

export const postIcon = (width: string, heigth: string) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={heigth}
    viewBox="0 0 1025 1024"
  >
    <path
      fill="currentColor"
      d="M855.048 768h-215l-256 256V768h-215q-57 0-113-57t-56-115V172q0-58 56-115t113-57h686q57 0 113 57t56 115v424q0 58-56 115t-113 57m41-541q0-41-29-70t-69-29h-572q-41 0-69.5 29t-28.5 70v314q0 41 28.5 70t69.5 29h572q40 0 69-29t29-70z"
    />
  </svg>
);

export const likeIcon = (width: string, heigth: string) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={heigth}
    viewBox="0 0 16 16"
  >
    <path
      fill="currentColor"
      d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59c-.125.36-.479 1.013-1.04 1.639c-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545c1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484c.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464c.201-.263.38-.578.488-.901c.11-.33.172-.762.004-1.149c.069-.13.12-.269.159-.403c.077-.27.113-.568.113-.857c0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362a1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272c-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05a9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164c-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868c-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65c1.095-.3 1.977-.996 2.614-1.708c.635-.71 1.064-1.475 1.238-1.978c.243-.7.407-1.768.482-2.85c.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725a.5.5 0 0 0 .595.644l.003-.001l.014-.003l.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164c.175.058.45.3.57.65c.107.308.087.67-.266 1.022l-.353.353l.353.354c.043.043.105.141.154.315c.048.167.075.37.075.581c0 .212-.027.414-.075.582c-.05.174-.111.272-.154.315l-.353.353l.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353l.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"
    />
  </svg>
);

export const arrayCardForAnalytics = [
  {
    title: "Communauté",
    icon: communauteIcon,
    inscrit: faker.number.int(10000),
  },
  {
    title: "Groupes",
    icon: myicon,
    inscrit: faker.number.int(10000),
  },
  {
    title: "Chaine",
    icon: eventIcon,
    inscrit: faker.number.int(10000),
  },
  {
    title: "Membres",
    icon: membreIcon,
    inscrit: faker.number.int(10000),
  },
  {
    title: "commentaires",
    icon: commentIcon("35", "35"),
    inscrit: faker.number.int(10000),
  },
  {
    title: "posts",
    icon: postIcon("35", "35"),
    inscrit: faker.number.int(10000),
  },
  {
    title: "likes",
    icon: likeIcon("35", "35"),
    inscrit: faker.number.int(10000),
  },
  {
    title: "ventes d'actifs",
    icon: mySaleIcon,
    inscrit: faker.number.int(10000),
  },
];

function AnalyticsPage() {
  return (
    <div className="flex flex-col px-3">
      <HeaderForAllBackOffice />
      <div className="w-full flex flex-col gap-4 max-[840px]:w-full min-[840px]:flex-row min-[840px]:items-center min-[840px]:justify-between mt-10">
        <div className="flex gap-3 ">
          <div className="titleAcceuil">
            <div className=" flex items-center gap-2 text-[#e91e63] mt-3">
              {analyticsIcon("25", "25")}
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                INTEGRATIONS
              </h1>
            </div>
          </div>
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
        </div>
      </div>
      <div className="grid grid-cols-2 min-[1080px]:grid-cols-3 min-[1340px]:grid-cols-4  gap-4 justify-evenly w-full  mt-7 pt-3 pr-5 ">
        {arrayCardForAnalytics.map((value, index) => (
          <Fragment key={index}>
            <CardGlogalData
              title={value.title}
              icon={value.icon}
              inscrit={value.inscrit}
            />
          </Fragment>
        ))}
      </div>

      <div className="grid grid-cols-2 min-[1550px]:grid-cols-3 w-full gap-5 px-3 ">
        {arrayChart.map((value, index) => (
          <div className="pb-3" key={index}>
            <ChartAcceuil
              min={value.min}
              max={value.max}
              index={index}
              step={value.step}
              icon={value.icon}
              title={value.title}
              subTitle={value.subTitle}
            />
          </div>
        ))}
      </div>

      <div></div>
      <FooterBackoffice />
    </div>
  );
}

export default AnalyticsPage;
