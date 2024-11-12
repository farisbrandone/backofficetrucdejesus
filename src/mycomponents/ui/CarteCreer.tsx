import { Switch } from "@/components/ui/switch";

import { AvatarBackoffice } from "./AvatarBackofice";
import {
  DropdownMenuBackoffice,
  DropdownMenuForGroupe,
} from "./DropdownMenuBackoffice";
import { useEffect, useState } from "react";
import {
  EventDataType,
  GroupeDataType,
  requestToChangeStatus,
  requestTogetAllEventData,
  requestTogetAllGroupeData,
} from "@/fakeData";
import { toast } from "@/hooks/use-toast";
import LoadingTotal from "./LoadingTotal";
import { stateGroupeEvent } from "../evenementPage/hook/UseselectGroupeInEvent";
import { format } from "date-fns";

export interface timestamp {
  seconds: number;
  nanoseconds: number;
}

export interface CarteCreerType {
  title: string;
  date: string;
  subTitle: string;
  value: number;
}

export default function CarteCreer({
  title,
  date,
  subTitle,
  value,
}: CarteCreerType) {
  return (
    <div
      className={`flex flex-col w-[300px] h-[300px] items-center ${
        value === 5 ? "justify-self-start" : ""
      }`}
    >
      <div className="w-full h-[150px] flex items-center justify-center ">
        <video autoPlay={true} muted={true}>
          <source
            src="https://d1yei2z3i6k35z.cloudfront.net/5322770/65fc0be058c63_HeaderAppUnTrucdeJESUS.mp4"
            type="video/mp4"
          />
          Votre navigateur ne supporte pas la balise vidéo.
        </video>
      </div>
      <div className="w-full mt-5">
        <div className="flex justify-between items-center w-full">
          <p>{title}</p>
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
          </div>
        </div>
        <div className="text-[12px] mt-2 ">
          <p>{format(new Date(date), "dd MMM yyyy")}</p>
          <p>{subTitle}</p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full mt-3 ">
        <div className="flex ">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className={`${index > 0 ? "-ml-4" : ""}`}>
              <AvatarBackoffice />
            </div>
          ))}
        </div>
        <div>
          <DropdownMenuBackoffice title="Action" />
        </div>
      </div>
    </div>
  );
}

export interface CarteCreerForGroupType {
  titleGroupe: string;
  descriptionGroupe: string;
  typeAccess: string;
  date: string;
  logoUrlGroupe: string;
  banniereUrlGroupe: string;
  groupeId: string;
  status: string;
  groupeData: GroupeDataType[];
  setGroupeData: React.Dispatch<
    React.SetStateAction<GroupeDataType[] | undefined>
  >;
  setLoadingFail: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CarteCreerForGroup({
  titleGroupe,
  descriptionGroupe,
  /*  typeAccess, */
  date,
  /* logoUrlGroupe, */
  banniereUrlGroupe,
  groupeId,
  status,
  setGroupeData,
  setLoadingFail,
}: CarteCreerForGroupType) {
  console.log({ titleGroupe, status });
  const [switchState, setSwitchState] = useState(status);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const handleSwitch = async () => {
    try {
      setLoadingStatus(true);
      let status;
      if (switchState === "activate") {
        status = "desactivate";
      } else {
        status = "activate";
      }
      const result = await requestToChangeStatus(
        groupeId,
        status,
        "GroupeData"
      );
      if (result.success) {
        setSwitchState(status);
        toast({
          title: "Success",
          description: result.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: result.message,
        });
      }

      setLoadingStatus(false);
    } catch (error) {}
  };

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
  }, [switchState]);

  return (
    <div className={`flex flex-col w-[300px] h-[300px] items-center`}>
      <div className="w-full h-[150px] flex items-center justify-center px-2 ">
        {banniereUrlGroupe && banniereUrlGroupe.includes(".mp4") ? (
          <video autoPlay={true} muted={true}>
            <source src={banniereUrlGroupe} type="video/mp4" />
            Votre navigateur ne supporte pas la balise vidéo.
          </video>
        ) : (
          <img
            src={banniereUrlGroupe}
            alt="Image bannière"
            className="object-cover w-full h-[150px] "
          />
        )}
      </div>
      <div className="w-full mt-5">
        <div className="flex justify-between items-center w-full">
          <p>{titleGroupe}</p>
          <div className="flex items-center space-x-2">
            {loadingStatus ? (
              <LoadingTotal />
            ) : (
              <Switch
                id="airplane-mode"
                checked={switchState === "activate"}
                onCheckedChange={handleSwitch}
              />
            )}
          </div>
        </div>
        <div className="text-[12px] mt-2 ">
          <p>{format(new Date(date), "dd MMM yyyy")}</p>
          <p>{descriptionGroupe}</p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full mt-3 ">
        <div className="flex ">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className={`${index > 0 ? "-ml-4" : ""}`}>
              <AvatarBackoffice />
            </div>
          ))}
        </div>
        <div>
          <DropdownMenuForGroupe
            title="Action"
            groupeId={groupeId}
            baseUrl="GROUPES/update-groupe-page"
            groupeForEventSelect={[]}
          />
        </div>
      </div>
    </div>
  );
}

export interface CarteCreerForEventType {
  titleEvent: string;
  descriptionEvent: string;
  imageUrlEvent: string;
  typeAccess: string;
  status: string;
  dateOfEvent: string;
  typeEvent: string;
  urlOfEvent: string;
  textCTAEvent: string;
  locationOfEvent: string;
  groupeForEventSelect: stateGroupeEvent[];
  date: string;
  eventId: string;
  eventData: EventDataType[];
  setEventData: React.Dispatch<
    React.SetStateAction<EventDataType[] | undefined>
  >;
  setLoadingFail: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CarteCreerForEvent({
  titleEvent,
  descriptionEvent,
  imageUrlEvent,
  /*  typeAccess , */
  status,
  dateOfEvent,
  /*  typeEvent ,
               urlOfEvent ,
               textCTAEvent , */
  /*  locationOfEvent , */
  groupeForEventSelect,
  eventId,

  setEventData,
  setLoadingFail,
}: CarteCreerForEventType) {
  console.log({
    titleEvent,
    descriptionEvent,
    imageUrlEvent,
    /*  typeAccess , */
    status,
    dateOfEvent,
    /*  typeEvent ,
                 urlOfEvent ,
                 textCTAEvent , */
    /*  locationOfEvent , */
    groupeForEventSelect,
    eventId,
  });
  const [switchState, setSwitchState] = useState(status);
  const [loadingStatus, setLoadingStatus] = useState(false);
  console.log({ switchState, status });
  const handleSwitch = async () => {
    try {
      setLoadingStatus(true);
      let statuss;
      console.log({ firstTry: { switchState, status } });
      if (status === "activate") {
        console.log("hoube houba");
        statuss = "desactivate";
      } else {
        statuss = "activate";
      }
      console.log({ secondTry: { switchState, status, statuss } });
      const result = await requestToChangeStatus(eventId, statuss, "EventData");
      console.log(statuss);
      if (result.success) {
        console.log("inside");
        setSwitchState(() => statuss);
        toast({
          title: "Success",
          description: result.message,
        });
        console.log({ ternary: { switchState, status, statuss } });
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: result.message,
        });
      }

      setLoadingStatus(false);
    } catch (error) {}
  };
  useEffect(() => {
    const getAllEventData = async () => {
      try {
        const data = await requestTogetAllEventData();
        setEventData([...data]);
      } catch (error) {
        setLoadingFail(true);
      }
    };
    getAllEventData();
  }, [switchState]);
  return (
    <div className={`flex flex-col w-[300px] h-[300px] items-center`}>
      <div className="w-full h-[150px] flex items-center justify-center px-2 ">
        {imageUrlEvent && imageUrlEvent.includes(".mp4") ? (
          <video autoPlay={true} muted={true}>
            <source src={imageUrlEvent} type="video/mp4" />
            Votre navigateur ne supporte pas la balise vidéo.
          </video>
        ) : (
          <img
            src={imageUrlEvent}
            alt="Image bannière"
            className="object-cover w-full h-[150px] "
          />
        )}
      </div>
      <div className="w-full mt-5">
        <div className="flex justify-between items-center w-full">
          <p>
            {titleEvent} {switchState} {status}
          </p>
          <div className="flex items-center space-x-2">
            {loadingStatus ? (
              <LoadingTotal />
            ) : (
              <Switch
                id="airplane-mode"
                checked={switchState === "activate"}
                onCheckedChange={handleSwitch}
              />
            )}
          </div>
        </div>
        <div className="text-[12px] mt-2 ">
          <p>
            l'événement aura lieu{" "}
            {dateOfEvent &&
              format(new Date(dateOfEvent), "' le' dd MMM yyyy 'à' hh/mm ")}
          </p>
          <p>
            Nombre de groupes associés à cet événement:{" "}
            {groupeForEventSelect.length}{" "}
          </p>
          <p>{descriptionEvent}</p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full mt-3 ">
        <div className="flex ">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className={`${index > 0 ? "-ml-4" : ""}`}>
              <AvatarBackoffice />
            </div>
          ))}
        </div>
        <div>
          <DropdownMenuForGroupe
            title="Action"
            groupeId={eventId}
            baseUrl="EVENEMENTS/update-event-page"
            groupeForEventSelect={groupeForEventSelect}
          />
        </div>
      </div>
    </div>
  );
}
