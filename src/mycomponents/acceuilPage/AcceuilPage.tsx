import { Button } from "@/components/ui/button";
import React, { Fragment } from "react";
import {
  analyticsIcon,
  arrayCard,
  clockIcon,
  communauteIcon,
  doubleArrowIcon,
  houseIcon,
  myicon,
  mySaleIcon,
  userIcon,
} from "./Icon";
import CardGlogalData from "./CardGlobal";
import { ChartAcceuil } from "./ChartComponent";
import { format } from "date-fns";
import { faker } from "@faker-js/faker";

export const arrayChart = [
  {
    min: 0,
    step: 0.5,
    max: 1,
    icon: analyticsIcon,
    title: "Activity",
    subTitle: "Weekly Data",
  },
  {
    min: -1,
    step: 1,
    max: 1,
    icon: mySaleIcon,
    title: "My Sales",
    subTitle: "Monthly Data",
  },
  {
    min: 0,
    step: 2,
    max: 6,
    icon: communauteIcon,
    title: "Community Members",
    subTitle: "Monthly Data",
  },
];
const dataUser = [
  {
    name: faker.person.firstName(),
    date: format(
      faker.date.between({ from: "2023-01-01", to: Date.now() }),
      "'il ya' dd 'jours à' kk:mm"
    ),
  },
  {
    name: faker.person.firstName(),
    date: format(
      faker.date.between({ from: "2023-01-01", to: Date.now() }),
      "'il ya' dd 'jours à' kk:mm"
    ),
  },
  {
    name: faker.person.firstName(),
    date: format(
      faker.date.between({ from: "2023-01-01", to: Date.now() }),
      "'il ya' dd 'jours à' kk:mm"
    ),
  },
  {
    name: faker.person.firstName(),
    date: format(
      faker.date.between({ from: "2023-01-01", to: Date.now() }),
      "'il ya' dd 'jours à' kk:mm"
    ),
  },
  {
    name: faker.person.firstName(),
    date: format(
      faker.date.between({ from: "2023-01-01", to: Date.now() }),
      "'il ya' dd 'jours à' kk:mm"
    ),
  },
  {
    name: faker.person.firstName(),
    date: format(
      faker.date.between({ from: "2023-01-01", to: Date.now() }),
      "'il ya' dd 'jours à' kk:mm"
    ),
  },
  {
    name: faker.person.firstName(),
    date: format(
      faker.date.between({ from: "2023-01-01", to: Date.now() }),
      "'il ya' dd 'jours à' kk:mm"
    ),
  },
  {
    name: faker.person.firstName(),
    date: format(
      faker.date.between({ from: "2023-01-01", to: Date.now() }),
      "'il ya' dd 'jours à' kk:mm"
    ),
  },
];

communauteIcon;
mySaleIcon;
analyticsIcon;

export default function AcceuilPage() {
  return (
    <div className="flex flex-col pl-8 text-[#344767]">
      <div className="headerAcceuil w-full h-[40px] flex p-0 pr-8 pt-2 justify-end">
        <div className="avatarAcceuil p-0 w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center">
          <img
            src="./isabelle.jpg"
            alt=""
            width={40}
            height={40}
            className=" w-[40px] h-[40px] object-cover rounded-full p-0"
          />
        </div>
      </div>
      <div className="titleAcceuil">
        <div className=" flex items-center gap-2 text-[#e91e63] mt-3">
          {houseIcon}
          <h1 className=" text-[#344767] font-bold text-[18px] ">
            PAGE D'ACCEUIL
          </h1>
        </div>
      </div>
      <div className="cardPart flex flex-col justify-center mt-4 py-5 pl-4 rounded-xl mr-6 ">
        <div className="flex items-center gap-2">
          <img
            src="./isabelle.jpg"
            alt="photo Isabelle"
            className="object-cover w-[74px] h-[74px] rounded-md"
          />
          <div className="flex-1 gap-2 ">
            <h1 className="text-[20px] ">
              Welcome back <span className="pl-2 font-bold "> Isabelle</span>
            </h1>
            <p className="text-[14px] ">
              Your account setup is completed successfully. Click on the video
              tutorials and knowledgebase button to get started.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-0  text-white text-[13px] ">
          <Button className="bg-[#191919] hover:bg-[#e91e63] mt-4 ">
            <p>REGARDER LES TUTORIEL VIDEO</p>
          </Button>
          <Button className="bg-[#191919] hover:bg-[#e91e63] text-white text-[14px] mt-4 ">
            <p>CONNAISSANCE DE BASE</p>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 min-[1080px]:grid-cols-3 min-[1340px]:grid-cols-4  gap-4 justify-evenly w-full  mt-7 pt-3 pr-5 ">
        {arrayCard.map((value, index) => (
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
      <div className="mt-6 flex-col min-[1170px]:flex items-center gap-2 w-full mb-8 p-3 ">
        <div className="text-[#191919] shadow-2xl bg-white flex-1 self-start px-3">
          <div className="flex flex-col gap-3 text-[14px] ">
            <p className="font-bold">My Sales</p>
            <div className="flex items-center gap-2">
              <div className=""> {doubleArrowIcon} </div>
              <p>Recent Transactions</p>
            </div>
          </div>
          <div className="w-full flex items-center justify-between text-[12px] mt-8 ">
            <p className="p-1">ASSET / CHANNEL NAME</p>
            <p className="p-1">BUYER NAME</p>
            <p className="p-1">BUYER PROFILE IMAGE</p>
            <p className="p-1">SALE AMOUNT</p>
            <p className="p-1">DATE</p>
          </div>
          <div className="w-full text-center py-3 text-[10px] mb-1 ">
            No Data Found
          </div>
        </div>

        <div className="flex flex-col text-[14px] shadow-2xl pl-4 py-4 rounded-lg max-w-[500px] ">
          <div className="flex flex-col gap-4 pt-4">
            <p className="font-bold ">Recent Activity</p>
            <div className="flex items-center">
              <div>{clockIcon}</div>
              <p className="text-[12px] pl-3 ">
                Community member recent activity
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-3">
            {dataUser.map((value, index) => (
              <div key={index} className="flex items-center gap-3">
                <div>{userIcon}</div>
                <div>
                  <p className="font-bold">
                    {value.name}{" "}
                    <span className="ml-2">joined Réseau 100% JÉSUS</span>
                  </p>
                  <p className="text-[10px] "> {value.date} </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
