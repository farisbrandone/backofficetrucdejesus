import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import NotificationTabContentGroupe from "./NotificationTabContentGroupe";
import BulkNotificationForGroupe from "./BulkNotificationForGroupe";
import MembreNotificationForGroupe from "./MembreNotificationGroupe";

export default function NotificationGroupePage({
  groupeId,
  setHiddenForAll,
  setOpenNotificationGroupe,
}: {
  groupeId: string;
  setHiddenForAll: (x: boolean) => void;
  setOpenNotificationGroupe: (x: boolean) => void;
}) {
  const [tabPage, setTabPage] = useState("notification d'inscription");

  return (
    <div className="fixed   bg-[#000]/50 flex flex-col items-center top-0 right-0 bottom-0 left-0 z-10 ">
      <div className="relative w-[1200px] h-[800px]  flex flex-col p-0 bg-white mt-[100px] rounded-lg ">
        <div className="absolute w-full p-2 bg-[#e91e63] text-white flex justify-between items-center rounded-t-lg top-0">
          <p className="font-bold text-[20px] ">Group Notifications Settings</p>
          <button
            title="Fermer"
            type="button"
            onClick={() => {
              setHiddenForAll(true);
              setOpenNotificationGroupe(false);
            }}
          >
            <span className="icon-[ooui--close]"></span>
          </button>
        </div>

        <Tabs
          value={tabPage}
          className="max-w-screen-xl mt-9 h-[900px]  overflow-y-auto   "
        >
          <TabsList className="flex items-center justify-start gap-2 pt-2 sm:h-[60px]">
            <TabsTrigger
              value="notification d'inscription"
              onClick={() => setTabPage("notification d'inscription")}
              className="text-[14px] xl:text-[18px] flex items-center "
            >
              <span className="icon-[si--sign-out-alt-fill] text-xl mr-1 "></span>
              <span className="">
                {" "}
                <span className="hidden xl:inline">Notification d'</span>
                inscription
              </span>
            </TabsTrigger>
            {/* <TabsTrigger
              value="notification d'achat"
              onClick={() => setTabPage("notification d'achat")}
              className="text-[14px] xl:text-[18px] flex items-center "
            >
              <span className="icon-[si--sign-out-alt-fill] text-xl mr-1 "></span>
              <span className="">
                <span className="hidden xl:inline">Notification d'</span>achat
              </span>
            </TabsTrigger> */}
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
          <NotificationTabContentGroupe groupeId={groupeId} />
          <MembreNotificationForGroupe groupeId={groupeId} />
          <BulkNotificationForGroupe groupeId={groupeId} />
        </Tabs>
      </div>
    </div>
  );
}
