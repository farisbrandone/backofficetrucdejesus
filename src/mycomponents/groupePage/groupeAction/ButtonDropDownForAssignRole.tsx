import clsx from "clsx";
import { MouseEvent, useEffect, useRef, useState } from "react";

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

const innerButton = [
  {
    text: "Assign Roles",
    url: "/ASSIGNROLES",
    icon: <span className="icon-[gg--list]"></span>,
  },
];

function ButtonDropDownForAssignRole({
  setOpenAsignRole,
}: {
  setOpenAsignRole: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [putHidden, setPutHidden] = useState(true);
  const [stateRotate, setStateRotate] = useState("0");
  const elementRef = useRef<HTMLDivElement>(null);
  /* const navigate = useNavigate(); */

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
    "mybutton absolute flex flex-col gap-4 top-[30px] right-[0px] translate-x-[40%] bg-[#191919] text-white w-[180px] px-0 py-3 rounded-lg z-50 ",
    { " hidden ": putHidden }
  );

  return (
    <div
      ref={elementRef}
      className=" cursor-pointer relative  p-0 flex items-center justify-center bg-[#FFF]  text-[#191919] rounded-lg flex-shrink-0 self-center text-[14px]"
      onClick={handleVisible}
    >
      <p className="ripple flex items-center gap-1 w-full h-full box-content px-2 py-2">
        {" "}
        <span className="icon-[quill--focus]"></span>
      </p>
      <div className={buttonClass} onClick={() => setPutHidden(false)}>
        {innerButton.map((value) => (
          <button
            type="button"
            className="mybutton hover:text-[#e91e63] P-2 text-white text-start pl-2 transition-all duration-500 "
            onClick={() => setOpenAsignRole(true)}
          >
            {" "}
            <span className="mr-1 inline-block"> {value.icon}</span>{" "}
            {value.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ButtonDropDownForAssignRole;
