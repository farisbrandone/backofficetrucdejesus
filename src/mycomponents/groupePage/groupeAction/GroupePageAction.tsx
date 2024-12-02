import clsx from "clsx";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FacebookGroupeShare from "./FacebookShare";
import CustumScriptForGroupe from "./CustumScriptForGroupe";
import AutoresponderForGroupe from "./autoresponderForGroupe/AutoresponderForGroupe";
import WebhookUrlForGroupe from "./WebhookUrlForGroupe";
import NotificationGroupePage from "./NotificationGroupe/NotificationGroupePage";
import GroupeSettingForGroupe from "./groupeSetting/GroupeSettingForGroupe";

export const signOutIcon = (width: string, heigth: string) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={heigth}
    viewBox="0 0 16 16"
  >
    <path
      fill="currentColor"
      d="M2 2.75C2 1.784 2.784 1 3.75 1h2.5a.75.75 0 0 1 0 1.5h-2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h2.5a.75.75 0 0 1 0 1.5h-2.5A1.75 1.75 0 0 1 2 13.25Zm10.44 4.5l-1.97-1.97a.749.749 0 0 1 .326-1.275a.75.75 0 0 1 .734.215l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.749.749 0 0 1-1.275-.326a.75.75 0 0 1 .215-.734l1.97-1.97H6.75a.75.75 0 0 1 0-1.5Z"
    />
  </svg>
);

/* 
Approve Members
Assign Roles
FB Share
Custom Scripts
Autoresponder
Webhook URL
Email Notifications
Launch Group
Group Settings
Clone
*/

const innerButton = [
  {
    text: "Approve Members",
    url: "/APPROUVEMEMBERS",
    icon: <span className="icon-[material-symbols--group-rounded]"></span>,
  },
  {
    text: "Assign Roles",
    url: "/ASSIGNROLES",
    icon: <span className="icon-[ri--user-settings-line]"></span>,
  },
  {
    text: "FB Share",
    url: "",
    icon: <span className="icon-[grommet-icons--facebook]"></span>,
  },
  {
    text: "Custom Scripts",
    url: "",
    icon: <span className="icon-[mingcute--refresh-4-fill]"></span>,
  },
  {
    text: "Autoresponder",
    url: "",
    icon: <span className="icon-[entypo--mail]"></span>,
  },
  {
    text: "Webhook URL",
    url: "",
    icon: <span className="icon-[tdesign--internet]"></span>,
  },
  {
    text: "Email Notifications",
    url: "",
    icon: <span className="icon-[pepicons-print--send]"></span>,
  },

  {
    text: "Launch Group",
    url: "",
    icon: <span className="icon-[icon-park-outline--share]"></span>,
  },
  {
    text: "Group Settings",
    url: "",
    icon: <span className="icon-[uil--setting]"></span>,
  },
  {
    text: "Clone",
    url: "",
    icon: <span className="icon-[solar--copy-bold-duotone]"></span>,
  },
];

function GroupePageAction({ groupeId }: { groupeId: string }) {
  const [putHidden, setPutHidden] = useState(true);
  const [stateRotate, setStateRotate] = useState("0");
  const [openFacebookGroupeShare, setOpenFacebookGroupeShare] = useState(false);
  const [hiddenForAll, setHiddenForAll] = useState(true);
  const [openScriptGroupeShare, setOpenScriptGroupeShare] = useState(false);
  const [openAutoresponderForGroupe, setOpenAutoresponderForGroupe] =
    useState(false);
  const [openWebhookUrlForGroupe, setOpenWebhookUrlForGroupe] = useState(false);
  const [openNotificationGroupe, setOpenNotificationGroupe] = useState(false);
  const [openGroupeSettingForGroupe, setOpenGroupeSettingForGroupe] =
    useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleVisible = (event: MouseEvent<HTMLDivElement>) => {
    const clickedElement = event.target as HTMLElement;
    console.log(stateRotate);
    if (stateRotate === "0") {
      setStateRotate("180");
    } else {
      setStateRotate("0");
    }

    console.log(clickedElement.className);
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
    "mybutton absolute flex flex-col gap-4 bottom-[40px] right-[0px] translate-x-[40%] bg-[#191919] text-white w-[180px] px-0 py-3 rounded-lg z-50 ",
    { " hidden ": putHidden }
  );
  const rotate = clsx(
    "transition-transform duration-300 ease-in-out",
    { "rotate-0": putHidden },
    { "rotate-180": !putHidden }
  );

  return (
    <div>
      {openFacebookGroupeShare && (
        <FacebookGroupeShare
          setOpenFacebookGroupeShare={setOpenFacebookGroupeShare}
          setHiddenForAll={setHiddenForAll}
          groupeId={groupeId}
        />
      )}
      {openScriptGroupeShare && (
        <CustumScriptForGroupe
          setOpenScriptGroupeShare={setOpenScriptGroupeShare}
          setHiddenForAll={setHiddenForAll}
          groupeId={groupeId}
        />
      )}
      {openAutoresponderForGroupe && (
        <AutoresponderForGroupe
          setOpenAutoresponderForGroupe={setOpenAutoresponderForGroupe}
          setHiddenForAll={setHiddenForAll}
          groupeId={groupeId}
        />
      )}

      {openWebhookUrlForGroupe && (
        <WebhookUrlForGroupe
          setOpenWebhookUrlForGroupe={setOpenWebhookUrlForGroupe}
          setHiddenForAll={setHiddenForAll}
          groupeId={groupeId}
        />
      )}

      {openNotificationGroupe && (
        <NotificationGroupePage
          setOpenNotificationGroupe={setOpenNotificationGroupe}
          setHiddenForAll={setHiddenForAll}
          groupeId={groupeId}
        />
      )}
      {openGroupeSettingForGroupe && (
        <GroupeSettingForGroupe
          setOpenGroupeSettingForGroupe={setOpenGroupeSettingForGroupe}
          setHiddenForAll={setHiddenForAll}
          groupeId={groupeId}
        />
      )}

      <div
        ref={elementRef}
        className=" cursor-pointer relative  p-0 flex items-center justify-center bg-[#191919] hover:bg-[#e91e63] text-white rounded-lg flex-shrink-0 self-center text-[14px]"
        onClick={handleVisible}
      >
        <p className="ripple flex items-center gap-1 w-full h-full box-content px-2 py-2">
          {" "}
          <span className="text-[12px] font-bold ">ACTIONS</span>
          <span className={`icon-[icon-park-outline--down] ${rotate} `}></span>
        </p>
        {hiddenForAll && (
          <div className={buttonClass} onClick={() => setPutHidden(false)}>
            {innerButton.map((value) => (
              <button
                type="button"
                className="mybutton hover:text-[#e91e63] w-full text-white text-start pl-2 transition-all duration-500 "
                onClick={() => {
                  if (value.text === "FB Share") {
                    setOpenFacebookGroupeShare(true);
                    setHiddenForAll(false);

                    return;
                  }
                  if (value.text === "Custom Scripts") {
                    setOpenScriptGroupeShare(true);
                    setHiddenForAll(false);
                    return;
                  }
                  if (value.text === "Autoresponder") {
                    setOpenAutoresponderForGroupe(true);
                    setHiddenForAll(false);
                    return;
                  }

                  if (value.text === "Webhook URL") {
                    setOpenWebhookUrlForGroupe(true);
                    setHiddenForAll(false);
                    return;
                  }
                  if (value.text === "Email Notifications") {
                    setOpenNotificationGroupe(true);
                    setHiddenForAll(false);
                    return;
                  }
                  if (value.text === "Group Settings") {
                    setOpenGroupeSettingForGroupe(true);
                    setHiddenForAll(false);
                    return;
                  }
                  navigate(`${value.url}/${groupeId}`);
                }}
              >
                {" "}
                <span className="mr-1 inline-block"> {value.icon}</span>{" "}
                {value.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupePageAction;
