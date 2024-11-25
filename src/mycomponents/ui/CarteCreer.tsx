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
import GroupePageAction from "../groupePage/groupeAction/GroupePageAction";
import clsx from "clsx";

import { useNavigate } from "react-router-dom";
import AssignGroupe from "./AssignGroupe";

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
  const [move, setMove] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`relative flex flex-col w-[400px] h-[370px]  items-center shadow-2xl rounded-xl border-[2px]  ${
        value === 5 ? " justify-self-start" : ""
      }`}
      onMouseEnter={() => setMove(true)}
      onMouseLeave={() => setMove(false)}
    >
      <div className=" absolute flex items-center justify-center gap-1 top-[200px] w-full ">
        <button
          className="   flex items-center text-[11px] font-bold text-center p-[2px]  px-[4px] rounded-sm bg-[#191919] hover:bg-[#e91e63] text-white transition-colors duration-500"
          onClick={() => navigate(`/COMMUNAUTES/update}`)}
        >
          <span className="icon-[material-symbols--edit] mr-1"></span>
          <p>Edit</p>
        </button>
        <button
          className="   flex items-center text-[11px] font-bold text-center p-[2px]  px-[4px] rounded-sm bg-[#191919] hover:bg-[#e91e63] text-white transition-colors duration-500 "
          onClick={() => navigate(`/GROUPES`)}
        >
          <span className="icon-[fa6-solid--people-group] mr-1"></span>
          <p>Groupes</p>
        </button>
        <button className="flex items-center text-[11px] font-bold text-center p-[2px]  px-[4px]  rounded-sm bg-[#191919] hover:bg-[#e91e63] text-white transition-colors duration-500">
          <span className="icon-[mynaui--arrow-up-right-square-solid] text-[12px] mr-1"></span>
          <p>Visit</p>
        </button>
        <button className="flex items-center text-[11px] font-bold text-center p-[2px]  px-[4px]  rounded-sm bg-[#191919] hover:bg-[#e91e63] text-white transition-colors duration-500">
          <span className="icon-[bi--rocket-takeoff] mr-1"></span>
          <p>Lauch Community</p>
        </button>
      </div>

      <div
        className={clsx(
          "object-cover w-full  flex items-center justify-center rounded-t-xl h-[223px] px-1 ",
          {
            "-translate-y-16 transition-transform ease-in-out": move,
          },
          { "translate-y-0 transition-transform ease-in-out": !move }
        )} /* className="w-full h-[150px] flex items-center justify-center " */
      >
        <video autoPlay={true} muted={true} className="rounded-t-xl">
          <source
            src="https://d1yei2z3i6k35z.cloudfront.net/5322770/65fc0be058c63_HeaderAppUnTrucdeJESUS.mp4"
            type="video/mp4"
          />
          Votre navigateur ne supporte pas la balise vidéo.
        </video>
      </div>
      <div className="w-full mt-[10px]">
        <div className="flex justify-between items-center w-full h-[25px] p-0">
          <p className="ml-4  max-w-[200px] text-ellipsis overflow-hidden h-[25px] leading-[25px] align-middle ">
            {title}
          </p>
          <div className="flex items-center space-x-2 mr-4">
            <Switch id="airplane-mode" />
          </div>
        </div>
        <div className="text-[12px] mt-2 ">
          <p className="flex items-center ml-4">
            {" "}
            <span className="icon-[bxs--calendar] text-xl mr-1 "></span>{" "}
            <span>{format(new Date(date), "dd MMM yyyy")}</span>
          </p>
          <p className="ml-4">{subTitle}</p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full mt-3">
        <div className="flex ml-4 ">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className={`${index > 0 ? "-ml-4" : ""}`}>
              <AvatarBackoffice />
            </div>
          ))}
        </div>
        <div className="mr-4">
          <DropdownMenuBackoffice title="ACTIONS" />
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
  const [move, setMove] = useState(false);
  const navigate = useNavigate();
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
    <div
      className={` relative flex flex-col w-[400px] h-[370px] py-3 items-center shadow-2xl rounded-xl border-[2px] `}
      onMouseEnter={() => setMove(true)}
      onMouseLeave={() => setMove(false)}
    >
      <div className=" absolute flex items-center justify-center gap-2  top-[180px] w-full ">
        <button
          className="   flex items-center text-[11px] font-bold text-center p-[2px]  px-[4px] rounded-sm bg-[#191919] hover:bg-[#e91e63] text-white transition-colors duration-500"
          onClick={() => navigate(`/GROUPES/update-groupe-page/${groupeId}`)}
        >
          <span className="icon-[material-symbols--edit] mr-1"></span>
          <p>Edit</p>
        </button>
        <button
          className="   flex items-center text-[11px] font-bold text-center p-[2px]  px-[4px] rounded-sm bg-[#191919] hover:bg-[#e91e63] text-white transition-colors duration-500 "
          onClick={() => navigate(`/GERER LES CHAINES/${groupeId}`)}
        >
          <span className="icon-[fa--television] mr-1"></span>
          <p>Channels</p>
        </button>
        <button className="flex items-center text-[11px] font-bold text-center p-[2px]  px-[4px]  rounded-sm bg-[#191919] hover:bg-[#e91e63] text-white transition-colors duration-500">
          <span className="icon-[mynaui--arrow-up-right-square-solid] text-[12px] mr-1"></span>
          <p>Visit</p>
        </button>
      </div>

      <div className="w-full  h-[190px] flex items-center justify-center px-2 ">
        {banniereUrlGroupe && banniereUrlGroupe.includes(".mp4") ? (
          <video autoPlay={true} muted={true}>
            <source src={banniereUrlGroupe} type="video/mp4" />
            Votre navigateur ne supporte pas la balise vidéo.
          </video>
        ) : (
          <img
            src={banniereUrlGroupe}
            alt="Image bannière"
            className={clsx(
              "object-cover w-full h-[190px]  ",
              {
                "-translate-y-12 transition-transform ease-in-out": move,
              },
              { "translate-y-0 transition-transform ease-in-out": !move }
            )}
          />
        )}
      </div>

      <div className="w-full mt-5">
        <div className="flex justify-between items-center w-full">
          <p className="ml-3">{titleGroupe}</p>
          <div className="flex items-center space-x-2 mr-3">
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
          <p className="ml-3 flex items-center">
            {" "}
            <span className="icon-[bxs--calendar] text-xl mr-1 "></span>{" "}
            {format(new Date(date), "dd MMM yyyy")}
          </p>
          <p className="ml-3 h-[40px] overflow-hidden text-ellipsis ">
            {descriptionGroupe}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full mt-3 ">
        <div className="flex ml-3 ">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className={`${index > 0 ? "-ml-4" : ""}`}>
              <AvatarBackoffice />
            </div>
          ))}
        </div>
        <div className="flex gap-1 mr-3">
          {/*  <DropdownMenuForGroupe
            title="Action"
            groupeId={groupeId}
            baseUrl="GROUPES/update-groupe-page"
            groupeForEventSelect={[]}
          /> */}
          <GroupePageAction />
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
  const [pageForAssignGroupe, setPageForAssignGroupe] = useState(false);
  const [move, setMove] = useState(false);
  const navigate = useNavigate();
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
    <div
      className={` relative flex flex-col w-[400px] h-[370px] py-3 items-center shadow-2xl rounded-xl border-[2px] `}
      onMouseEnter={() => setMove(true)}
      onMouseLeave={() => setMove(false)}
    >
      {pageForAssignGroupe && (
        <AssignGroupe setPageForAssignGroupe={setPageForAssignGroupe} />
      )}

      <div className=" absolute flex items-center justify-center gap-2  top-[180px] w-full ">
        <button
          className="flex items-center text-[11px] font-bold text-center p-[2px]  px-[4px] rounded-sm bg-[#191919] hover:bg-[#e91e63] text-white transition-colors duration-500"
          onClick={() => navigate(`/EVENEMENTS/update-event-page/${eventId}`)}
        >
          <span className="icon-[material-symbols--edit] mr-1"></span>
          <p>Edit</p>
        </button>
        <button
          onClick={() => setPageForAssignGroupe(true)}
          className="flex items-center text-[11px] font-bold text-center p-[2px]  px-[4px] rounded-sm bg-[#191919] hover:bg-[#e91e63] text-white transition-colors duration-500"
        >
          <span className="icon-[cil--list] mr-1"></span>
          <p>Assigner un groupe</p>
        </button>
      </div>

      <div className="w-full h-[190px] flex items-center justify-center px-2 ">
        {imageUrlEvent && imageUrlEvent.includes(".mp4") ? (
          <video autoPlay={true} muted={true}>
            <source src={imageUrlEvent} type="video/mp4" />
            Votre navigateur ne supporte pas la balise vidéo.
          </video>
        ) : (
          <img
            src={imageUrlEvent}
            alt="Image bannière"
            className={clsx(
              "object-cover w-full h-[190px]  ",
              {
                "-translate-y-12 transition-transform ease-in-out": move,
              },
              { "translate-y-0 transition-transform ease-in-out": !move }
            )}
          />
        )}
      </div>
      <div className="w-full mt-5 px-3">
        <div className="flex justify-between items-center w-full">
          <p>{titleEvent}</p>
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
          <p className="">
            Nombre de groupes associés à cet événement:{" "}
            {groupeForEventSelect.length}{" "}
          </p>
          <p className="h-40px overflow-hidden text-ellipsis">
            {descriptionEvent}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full mt-3 px-3 ">
        <div className="flex ">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className={`${index > 0 ? "-ml-4" : ""}`}>
              <AvatarBackoffice />
            </div>
          ))}
        </div>
        <div>
          <DropdownMenuForGroupe
            title="ACTION"
            groupeId={eventId}
            baseUrl="EVENEMENTS/update-event-page"
            groupeForEventSelect={groupeForEventSelect}
          />
        </div>
      </div>
    </div>
  );
}
