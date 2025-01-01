import { Fragment } from "react/jsx-runtime";
import { ButtonSideBar } from "./ui/ButtonSideBar";
import { Outlet, useNavigation } from "react-router-dom";
import LoginMother from "@/Sign/login/LoginMother";

export async function loader() {
  //we load data for routes pages
  /* const contacts = await getContacts();
  return { contacts }; */
  const contacts = [
    "ACCUEIL",
    "COMMUNAUTES",
    "GROUPES",
    "EVENEMENTS",
    "INTEGRATIONS",
    "GERER LES CLIENTS",
    "MES VENTES",
    "ANALYTICS",
    "GERER LES MEMBRES",
    "NOTIFICATION",
  ];
  return { contacts };
}

function SidebarComponents() {
  /*  const contacts = useLoaderData(); */

  const navigation = useNavigation();
  const textButton = [
    "/",
    "COMMUNAUTES",
    "GROUPES",
    "EVENEMENTS",
    "INTEGRATIONS",
    "GERER LES CLIENTS",
    "MES VENTES",
    "ANALYTICS",
    "GERER LES MEMBRES",
    /* "GERER LES RESSOURCES", */
    "NOTIFICATION",
  ];

  return (
    <div className="flex gap-0 w-[100vw] ">
      <div
        id="sidebar"
        className="bg-[#191919] flex flex-col items-center min-h-screen px-4 pt-2"
      >
        <div className="headerSide w-full flex flex-col items-center h-[80px] mx-auto flex-wrap">
          <div className="w-full flex items-center justify-center">
            <img
              src="https://trucdejesus.appowls.io/assets/apps/user_1837/app_3120/draft/icon/app_logo.png"
              alt="Logo"
              width="40"
              height="40"
              className=""
            />
            <span className="pl-1 text-white self-center">Truc de JESUS !</span>
          </div>

          <p className="text-[#fff] text-center font-bold text-[18px] ">
            Back Office
          </p>
        </div>
        <div className="w-full flex flex-col items-center gap-2 pt-2">
          {textButton.map((value, index) => (
            <Fragment key={index}>
              <ButtonSideBar text={value} />
            </Fragment>
          ))}
        </div>
      </div>
      {/* all the other elements */}
      <div
        id="detail"
        className={
          navigation.state === "loading"
            ? "loading flex-1 relative"
            : "flex-1 relative"
        }
      >
        <LoginMother>
          <Outlet />
        </LoginMother>
      </div>
    </div>
  );
}

export { SidebarComponents };
