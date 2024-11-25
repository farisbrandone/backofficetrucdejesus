import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GroupeDataType } from "@/fakeData";
import PointDactivite from "./PointDactivite";
import CreateBadge from "./CreateBadge";
export function BodyGamification({
  groupeData,
}: {
  groupeData: GroupeDataType | undefined;
}) {
  const [tabPage, setTabPage] = useState("points d'activités");

  return (
    <Tabs value={tabPage} className="max-w-screen-xl   ">
      <TabsList className="grid w-full grid-cols-2 pt-2 sm:h-[60px]">
        <TabsTrigger
          value="points d'activités"
          onClick={() => setTabPage("points d'activités")}
          className="text-[14px] xl:text-[18px] flex items-center "
        >
          <span className="icon-[fa6-regular--hand-point-up] text-xl mr-1"></span>
          <span className="">
            {" "}
            <span className="hidden xl:inline">Placer les </span>points
            d'activités
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="creation de badge"
          onClick={() => setTabPage("creation de badge")}
          className="text-[14px] xl:text-[18px] flex items-center "
        >
          <span className="icon-[bxs--badge-check] text-xl mr-1 "></span>
          <span className="icon-[icon-park--badge-two] text-xl mr-1"></span>
          <span className="">Création et Assignation de badges</span>
        </TabsTrigger>
        {/* <TabsTrigger
          value="assigner des badges"
          onClick={() => setTabPage("assigner des badges")}
          className="text-[14px] xl:text-[18px] flex items-center "
        >
          <span className="icon-[icon-park--badge-two] text-xl mr-1"></span>

          <span className="">Assigner des Badges</span>
        </TabsTrigger> */}
      </TabsList>
      <PointDactivite groupeData={groupeData} />
      <CreateBadge groupeData={groupeData} />
      {/*  <MembreNotification /> */}
    </Tabs>
  );
}
