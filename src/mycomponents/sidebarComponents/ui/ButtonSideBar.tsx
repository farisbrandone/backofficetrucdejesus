import { NavLink } from "react-router-dom";

function ButtonSideBar({ text }: { text: string }) {
  let icon;
  /* const textButton = [
    "ACCEUIL",
    "COMMUNAUTES",
    "GROUPES",
    "EVENEMENTS",
    "INTEGRATIONS",
    "GERER LES CLIENS",
    "MES VENTES",
    "ANALYTICS",
    "GERER LES MEMBRES",
    "NOTIFICATION",
  ]; */
  switch (text) {
    case "/":
      icon = <img src="./house.svg" alt="" width={25} height={25} />;
      break;
    case "COMMUNAUTES":
      icon = <img src="./communaute.svg" alt="" width={25} height={25} />;
      break;
    case "GROUPES":
      icon = <img src="./grouptrue.svg" alt="" width={25} height={25} />;
      break;
    case "EVENEMENTS":
      icon = <img src="./eventtrue.svg" alt="" width={25} height={25} />;
      break;
    case "EVENEMENTS":
      icon = <img src="./eventtrue.svg" alt="" width={25} height={25} />;
      break;
    case "INTEGRATIONS":
      icon = <img src="./settings.svg" alt="" width={25} height={25} />;
      break;
    case "GERER LES CLIENS":
      icon = <img src="./gererlesclients.svg" alt="" width={25} height={25} />;
      break;
    case "MES VENTES":
      icon = <img src="./mySale.svg" alt="" width={25} height={25} />;
      break;
    case "ANALYTICS":
      icon = <img src="./analytics.svg" alt="" width={25} height={25} />;
      break;

    case "GERER LES MEMBRES":
      icon = <img src="./manageMember.svg" alt="" width={25} height={25} />;
      break;

    case "NOTIFICATION":
      icon = (
        <img src="./gererLesNotification.svg" alt="" width={25} height={25} />
      );
      break;
    default:
      break;
  }
  const myclass =
    "flex items-center gap-2 mx-auto w-full px-2 rounded-md py-[15px] text-white";
  return (
    <NavLink
      to={text}
      className={({ isActive, isPending }) =>
        isActive
          ? "active  bg-[#e91e63] " + myclass
          : isPending
          ? "pending  bg-[#e91e6227] " + myclass
          : myclass
      }
    >
      <div className="w-[31px] h-[31px] rounded-full object-cover bg-[#fcfcfc] flex items-center justify-center p-[6px] ">
        {icon}
      </div>
      <div>{text === "/" ? "ACCEUIL" : text}</div>
    </NavLink>
  );
}

export { ButtonSideBar };
