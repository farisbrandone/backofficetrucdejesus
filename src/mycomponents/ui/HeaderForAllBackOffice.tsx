import { Button } from "@/components/ui/button";
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

function HeaderForAllBackOffice() {
  const [putHidden, setPutHidden] = useState(true);

  const elementRef = useRef<HTMLDivElement>(null);

  const handleVisible = (event: MouseEvent<HTMLDivElement>) => {
    const clickedElement = event.target as HTMLElement;

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
    "mybutton absolute flex flex-col gap-4 top-[60px] right-[30px] bg-[#191919] text-white w-[180px] px-0 py-3 rounded-lg z-50 ",
    { " hidden ": putHidden }
  );

  return (
    <div className="headerAcceuil  w-full h-[40px] flex p-0 pr-8 pt-2 justify-end">
      <div
        ref={elementRef}
        className="cursor-pointer relative p-0 w-[60px] h-[60px] rounded-full  flex items-center justify-center "
        onClick={handleVisible}
      >
        <img
          src="./isabelle.jpg"
          alt=""
          width={40}
          height={40}
          className=" w-[40px] h-[40px] object-cover rounded-full p-0"
        />
        <div className={buttonClass} onClick={() => setPutHidden(false)}>
          <button className="mybutton hover:text-white w-full text-[#e91e63] text-start pl-2 transition-all duration-500 ">
            {" "}
            <span className="mr-1 inline-block">
              {" "}
              {signOutIcon("15", "15")}
            </span>{" "}
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeaderForAllBackOffice;
