import {
  EventDataType,
  requestToDeleteAssetsWithId,
  requestToDeleteEventWithId,
  requestToDeleteLessonLibraryWithId,
  requestToDeleteMembreWithId,
  requestToDeleteRessourcesWithId,
  requestToDeleteUniversalDataWithId,
} from "@/fakeData";
import { useToast } from "@/hooks/use-toast";
import { Fragment, useEffect, useRef, useState, MouseEvent } from "react";
import { NavLink } from "react-router-dom";
import { stateGroupeEvent } from "../evenementPage/hook/UseselectGroupeInEvent";
import { Autoresponder } from "../autoresponder/Autoresponder";
import { FacebookShare } from "../facebookShare/FacebookShare";
import { CustumScript } from "../custumScript/CustumScript";
import { CNAME } from "../CNAME/CNAME";
import { WebhookUrl } from "../webhookUrl/WebhookUrl";
import clsx from "clsx";
import AssignGroupe, { AssignGroupeForMember } from "./AssignGroupe";
import { CommunityDataType } from "../communautePage/CommunityDetails";

const dataTitleForMenuItem = [
  /*  {
    title: "Mettre à jour",
    url: "/COMMUNAUTES/update",
    icon: <span className="icon-[mingcute--refresh-4-fill]"></span>,
  },
  {
    title: "Visit",
    url: "",
    icon: <span className="icon-[icon-park-outline--share]"></span>,
  }, */
  {
    title: "Resource Library",
    url: "/GERER LES RESSOURCES",
    icon: <span className="icon-[mdi--library-books]"></span>,
  },
  {
    title: "Lesson Library",
    url: "/GERER LES LEÇONS",
    icon: <span className="icon-[streamline--class-lesson-solid]"></span>,
  },
  {
    title: "Assets",
    url: "/GERER LES ASSETS",
    icon: <span className="icon-[streamline--investment-selection]"></span>,
  },
  {
    title: "Email Notifications",
    url: "/EMAIL NOTIFICATION",
    icon: <span className="icon-[pepicons-print--send]"></span>,
  },
  {
    title: "Autoresponder",
    url: "",
    icon: <span className="icon-[entypo--mail]"></span>,
  },
  {
    title: "FB Share",
    url: "",
    icon: <span className="icon-[grommet-icons--facebook]"></span>,
  },
  {
    title: "Custom Scripts",
    url: "",
    icon: <span className="icon-[mingcute--refresh-4-fill]"></span>,
  },
  {
    title: "CName",
    url: "",
    icon: <span className="icon-[mono-icons--book]"></span>,
  },
  {
    title: "Webhook URL",
    url: "",
    icon: <span className="icon-[tdesign--internet]"></span>,
  },
  {
    title: "Clone",
    url: "",
    icon: <span className="icon-[solar--copy-bold-duotone]"></span>,
  },
  {
    title: "Integrations",
    url: "/INTEGRATIONS",
    icon: <span className="icon-[uil--setting]"></span>,
  },
];

export function DropdownMenuBackoffice({
  title,
  valueCommunity,
}: {
  title: string;
  valueCommunity: CommunityDataType;
}) {
  const [putHidden, setPutHidden] = useState(true);
  const [stateRotate, setStateRotate] = useState("0");
  const elementRef = useRef<HTMLDivElement>(null);

  const handleVisible = (event: MouseEvent<HTMLDivElement>) => {
    const clickedElement = event.target as HTMLElement;

    if (stateRotate === "0") {
      setStateRotate("180");
    } else {
      setStateRotate("0");
    }

    if (clickedElement.className.includes("mybutton")) {
      return;
    }
    setPutHidden((prev) => !prev);
  };

  const handleClickOutside = (event: any) => {
    if (
      elementRef.current &&
      !elementRef.current?.contains(event.target as Node)
    ) {
      setPutHidden(true);
      setStateRotate("0");
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event: any) => {
      handleClickOutside(event);
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const buttonClass = clsx(
    "mybutton absolute flex flex-col gap-4 bottom-[40px] right-[0px] translate-x-[40%] bg-[#191919] text-white w-[180px] px-0 py-3 rounded-lg z-50 transition-colors ",
    { " hidden ": putHidden }
  );
  const rotate = clsx(
    "transition-transform duration-300 ease-in-out",
    { "rotate-0": putHidden },
    { "rotate-180": !putHidden }
  );

  return (
    <div
      ref={elementRef}
      className=" cursor-pointer relative  p-0 flex items-center justify-center bg-[#191919] hover:bg-[#e91e63] text-white  rounded-lg flex-shrink-0 self-center text-[14px]"
      onClick={handleVisible}
    >
      <div className="ripple font-bold flex items-center gap-1 w-full h-full box-content px-3 text-[12px] py-2">
        {title}
        <span
          className={`icon-[icon-park-outline--down] ${rotate} ml-1 `}
        ></span>
      </div>

      <div className={buttonClass} onClick={() => setPutHidden(false)}>
        {dataTitleForMenuItem.map((value) => (
          <Fragment key={value.title}>
            {value.title === "Autoresponder" ? (
              <Autoresponder
                title={value.title}
                icon={value.icon}
                communityId={valueCommunity.id as string}
              />
            ) : value.title === "FB Share" ? (
              <FacebookShare
                title={value.title}
                icon={value.icon}
                communityId={valueCommunity.id as string}
              />
            ) : value.title === "Custom Scripts" ? (
              <CustumScript
                title={value.title}
                icon={value.icon}
                communityId={valueCommunity.id as string}
              />
            ) : value.title === "CName" ? (
              <CNAME
                title={value.title}
                icon={value.icon}
                communityId={valueCommunity.id as string}
              />
            ) : value.title === "Webhook URL" ? (
              <WebhookUrl
                title={value.title}
                icon={value.icon}
                communityId={valueCommunity.id as string}
              />
            ) : (
              <MenuItem
                url={value.url}
                title={value.title}
                icon={value.icon}
                communityId={valueCommunity.id as string}
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

const MenuItem = ({
  communityId,
  url,
  title,
  icon,
}: {
  communityId: string;
  url: string;
  title: string;
  icon: JSX.Element;
}) => {
  return (
    <div className="pl-1 w-full hover:text-[#e91e63]">
      <NavLink to={`${url}/${communityId}`} className=" block pl-1 w-full ">
        {" "}
        {icon} {title}{" "}
      </NavLink>
    </div>
  );
};

export function DropdownMenuForGroupe({
  title,
  groupeId,
  baseUrl,
  groupeForEventSelect,
  setOpenStateForUpdate,
  eventData,
  communityId,
}: {
  title: string;
  groupeId: string;
  baseUrl: string;
  groupeForEventSelect: stateGroupeEvent[];
  eventData?: EventDataType[];
  setOpenStateForUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
  communityId?: string;
}) {
  const [pageForDeletion, setPageForDeletion] = useState(false);
  const [stateSuppression, setStateSuppression] = useState(false);
  const [pageForAssignGroupe, setPageForAssignGroupe] = useState(false);
  const [pageForAssignGroupeForMember, setPageForAssignGroupeForMember] =
    useState(false);
  const { toast } = useToast();

  const [putHidden, setPutHidden] = useState(true);
  const [stateRotate, setStateRotate] = useState("0");
  const elementRef = useRef<HTMLDivElement>(null);

  const handleVisible = (event: MouseEvent<HTMLDivElement>) => {
    const clickedElement = event.target as HTMLElement;

    if (stateRotate === "0") {
      setStateRotate("180");
    } else {
      setStateRotate("0");
    }

    if (clickedElement.className.includes("mybutton")) {
      return;
    }
    setPutHidden((prev) => !prev);
  };

  const handleClickOutside = (event: any) => {
    if (
      elementRef.current &&
      !elementRef.current?.contains(event.target as Node)
    ) {
      setPutHidden(true);
      setStateRotate("0");
    }
  };

  const deleteGroupe = async () => {
    setStateSuppression(() => true);
    let result;
    if (baseUrl === "GROUPES/update-groupe-page") {
      result = await requestToDeleteUniversalDataWithId(groupeId, "GroupeData");
    }
    if (baseUrl === "EVENEMENTS/update-event-page") {
      result = await requestToDeleteEventWithId(groupeId, groupeForEventSelect);
    }

    if (baseUrl === "GERER LES MEMBRES/update-membre-page") {
      result = await requestToDeleteMembreWithId(groupeId);
    }
    if (baseUrl === "GERER LES RESSOURCES/update-ressources-page") {
      result = await requestToDeleteRessourcesWithId(groupeId);
    }
    if (baseUrl === "GERER LES LEÇONS/update-lesson-page") {
      result = await requestToDeleteLessonLibraryWithId(groupeId);
    }
    if (baseUrl === "GERER LES ASSETS/update-assets-page") {
      result = await requestToDeleteAssetsWithId(groupeId);
    }
    if (baseUrl === "POPUPBANNERS/update-popupbanners-page") {
      result = await requestToDeleteUniversalDataWithId(
        groupeId,
        "PopupBannersData"
      );
    }
    if (baseUrl === "BANNERSADS/update-bannersads-page") {
      result = await requestToDeleteUniversalDataWithId(
        groupeId,
        "BannersAdsData"
      );
    }

    if (result && !result.success) {
      toast({
        variant: "destructive",
        title: result.message,
        description: result.message,
      });
      setPageForDeletion(false);
      setStateSuppression(() => false);
      return;
    }

    toast({
      variant: "default",
      title: result && result.message,
      description: result && result.message,
    });
    setStateSuppression(() => false);
    setPageForDeletion(false);
    window.location.reload();
  };

  useEffect(() => {
    const handleDocumentClick = (event: any) => {
      handleClickOutside(event);
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const buttonClass = clsx(
    "mybutton absolute flex flex-col gap-2 top-[40px] right-[0px] translate-x-[40%] bg-[#191919] text-white w-[150px] px-2 py-3 rounded-lg z-50 transition-colors ",
    { " hidden ": putHidden }
  );
  const rotate = clsx(
    "transition-transform duration-300 ease-in-out",
    { "rotate-0": putHidden },
    { "rotate-180": !putHidden }
  );
  return (
    <div>
      {pageForAssignGroupe && eventData && (
        <AssignGroupe
          setPageForAssignGroupe={setPageForAssignGroupe}
          eventId={groupeId}
          communityId={communityId as string}
          eventData={eventData}
        />
      )}
      {pageForAssignGroupeForMember && (
        <AssignGroupeForMember
          setPageForAssignGroupeForMember={setPageForAssignGroupeForMember}
        />
      )}

      {pageForDeletion && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-transparent backdrop-blur-lg z-50">
          <div className="relative w-[330px] h-[330px] flex flex-col items-center justify-center bg-[#191919] rounded-2xl drop-shadow-xl  ">
            <p className="text-[#fff] w-full text-center font-bold text-[18px] p-2 ">
              {" "}
              Voulez-vous vraiment supprimer{" "}
              {baseUrl === "EVENEMENTS/update-event-page"
                ? " l'événement"
                : baseUrl === "GERER LES MEMBRES/update-membre-page"
                ? "Le Membre"
                : baseUrl === "GERER LES LEÇONS/update-lesson-page"
                ? "La leçons"
                : baseUrl === "GERER LES ASSETS/update-assets-page"
                ? "Les assets"
                : baseUrl === "POPUPBANNERS/update-popubanners-page"
                ? "le popup banner"
                : baseUrl === "BANNERSADS/update-bannersads-page"
                ? "le banner ads"
                : " groupe"}{" "}
              ?
            </p>
            {stateSuppression && (
              <div className="absolute bottom-8 text-center w-full">
                Le document est en cours de suppression...
              </div>
            )}
            <div className="absolute bottom-4 mx-auto flex items-center gap-2">
              <button
                type="button"
                className="bg-[#e91e63] text-white px-3 py-2 flex items-center justify-center hover:bg-[#e91e62d0] transition-all duration-500 rounded-lg disabled:bg-[#e91e627e]"
                onClick={deleteGroupe}
                disabled={stateSuppression}
              >
                Supprimer
              </button>
              <button
                type="button"
                className="bg-[#fff] text-[#191919] px-3 py-2 flex items-center justify-center hover:bg-[#ffffffc7] transition-all duration-500 rounded-lg disabled:bg-[#fff8]"
                onClick={() => setPageForDeletion(false)}
                disabled={stateSuppression}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        ref={elementRef}
        className=" cursor-pointer relative  p-0 px-2 flex items-center justify-center bg-[#191919] hover:bg-[#e91e63] text-white  rounded-lg flex-shrink-0 self-center text-[14px]"
        onClick={handleVisible}
      >
        <div className="ripple font-bold flex items-center gap-1 w-full h-full box-content px-3 text-[12px] py-2">
          {title}
          {baseUrl !== "GERER LES MEMBRES/update-membre-page" && (
            <span
              className={`icon-[icon-park-outline--down] ${rotate} ml-1 `}
            ></span>
          )}
        </div>

        <div className={buttonClass} onClick={() => setPutHidden(false)}>
          {baseUrl === "GROUPES/update-groupe-page" && (
            <div>
              {" "}
              <NavLink
                to={`/GERER LES CHAINES/${groupeId}`}
                className="w-full hover:text-[#e91e63] flex items-center"
              >
                <span className="icon-[fa-solid--tv] mr-1"></span>
                <p>Créer une chaine</p>
              </NavLink>
            </div>
          )}
          {baseUrl !== "GERER LES RESSOURCES/update-ressources-page" && (
            <div>
              {" "}
              <NavLink
                to={`/${baseUrl}/${groupeId}`}
                className="w-full hover:text-[#e91e63] flex items-center"
              >
                <span className="icon-[material-symbols--edit] mr-1"></span>
                <p>Mettre à jour</p>
              </NavLink>
            </div>
          )}
          {baseUrl === "EVENEMENTS/update-event-page" && (
            <div
              onClick={() => setPageForAssignGroupe(true)}
              className="cursor-pointer w-full hover:text-[#e91e63] flex items-center"
            >
              <span className="icon-[cil--list] mr-1"></span>
              <p>Assigner un groupe</p>
            </div>
          )}

          {baseUrl === "GERER LES RESSOURCES/update-ressources-page" &&
            setOpenStateForUpdate && (
              <div
                onClick={() => setOpenStateForUpdate(true)}
                className="cursor-pointer w-full hover:text-[#e91e63] flex items-center"
              >
                <span className="icon-[cil--list] mr-1"></span>
                <p>Mettre à jour</p>
              </div>
            )}

          {baseUrl === "GERER LES MEMBRES/update-membre-page" && (
            <div
              onClick={() => setPageForAssignGroupe(true)}
              className="cursor-pointer w-full hover:text-[#e91e63] flex items-center"
            >
              <span className="icon-[cil--list] mr-1"></span>
              <p>Assigner un groupe</p>
            </div>
          )}
          {baseUrl === "GERER LES MEMBRES/update-membre-page" && (
            <NavLink
              to={`/MES VENTES`}
              className="w-full hover:text-[#e91e63] flex items-center"
            >
              <span className="icon-[fa--dollar] mr-1"></span>
              <p>Voir les ventes</p>
            </NavLink>
          )}
          <div
            onClick={() => setPageForDeletion(true)}
            className="cursor-pointer w-full hover:text-[#e91e63] flex items-center"
          >
            <span className="icon-[mdi--delete] mr-1"></span>
            <p>Supprimer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
