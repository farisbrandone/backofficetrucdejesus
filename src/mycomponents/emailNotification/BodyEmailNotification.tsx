import { useState } from "react";
import NotificationTabContent from "./NotificationTabContent";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AchatTabContent from "./AchatTabContent";
import MembreNotification from "./MembreNotification";
import BulkNotification from "./BulkNotification";
export function BodyEmailNotification({
  communityId,
}: {
  communityId: string;
}) {
  const [tabPage, setTabPage] = useState("notification d'inscription");

  return (
    <Tabs value={tabPage} className="max-w-screen-xl   ">
      <TabsList className="grid w-full grid-cols-4 pt-2 sm:h-[60px]">
        <TabsTrigger
          value="notification d'inscription"
          onClick={() => setTabPage("notification d'inscription")}
          className="text-[14px] xl:text-[18px] flex items-center "
        >
          <span className="icon-[si--sign-out-alt-fill] text-xl mr-1 "></span>
          <span className="">
            {" "}
            <span className="hidden xl:inline">Notification d'</span>inscription
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="notification d'achat"
          onClick={() => setTabPage("notification d'achat")}
          className="text-[14px] xl:text-[18px] flex items-center "
        >
          <span className="icon-[si--sign-out-alt-fill] text-xl mr-1 "></span>
          <span className="">
            <span className="hidden xl:inline">Notification d'</span>achat
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="notification de nouveau membre"
          onClick={() => setTabPage("notification de nouveau membre")}
          className="text-[14px] xl:text-[18px] flex items-center "
        >
          <span className="icon-[line-md--person-add-filled] text-xl mr-1 "></span>

          <span className="">
            <span className="hidden xl:inline mr-1">Notification de</span>
            membre
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="notification en masse"
          onClick={() => setTabPage("notification en masse")}
          className="text-[14px] xl:text-[18px] flex items-center "
        >
          <span className="icon-[fa6-solid--envelopes-bulk] text-xl mr-1 "></span>
          <span className="">
            {" "}
            <span className="hidden xl:inline">notification en</span> masse
          </span>
        </TabsTrigger>
      </TabsList>
      <NotificationTabContent communityId={communityId} />
      <AchatTabContent communityId={communityId} />
      <MembreNotification communityId={communityId} />
      <BulkNotification communityId={communityId} />
    </Tabs>
  );
}
