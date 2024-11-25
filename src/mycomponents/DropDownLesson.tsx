import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Fragment, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

const dataTitleForMenuItem = [
  {
    title: "Content Lesson",
    url: "/GERER LES LEÇONS/ajouter-des-leçons/content",
    icon: <span className="icon-[fa6-solid--a]"></span>,
  },
  {
    title: "Video Lesson",
    url: "/GERER LES LEÇONS/ajouter-des-leçons/video",
    icon: <span className="icon-[mingcute--video-fill]"></span>,
  },
  {
    title: "Audio Lesson",
    url: "/GERER LES LEÇONS/ajouter-des-leçons/audio",
    icon: <span className="icon-[fa-solid--music]"></span>,
  },
];

export function DropDownLesson({ title }: { title: string }) {
  const [rotation, setRotation] = useState(0);
  const rotateTriangle = () => {
    console.log("dingo");
    alert("papa");
    setRotation((prev) => prev + 90);
  };
  const iconMemo = useMemo(
    () => (
      <span className={`ml-3 rotate-${rotation} rotate-90`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M464 464H48a16 16 0 0 1-14.07-23.62l208-384a16 16 0 0 1 28.14 0l208 384A16 16 0 0 1 464 464"
          />
        </svg>
      </span>
    ),
    [rotation]
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger onClick={rotateTriangle} asChild>
        <Button
          onClick={rotateTriangle}
          className={`bg-[#191919] text-white hover:bg-[#e91e63]  hover:text-white font-bold `}
        >
          {title} {iconMemo}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#191919] text-white rounded-xl shadow-2xl ">
        {dataTitleForMenuItem.map((value) => (
          <Fragment key={value.title}>
            <MenuItem url={value.url} title={value.title} icon={value.icon} />
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const MenuItem = ({
  url,
  title,
  icon,
}: {
  url: string;
  title: string;
  icon: JSX.Element;
}) => {
  return (
    <DropdownMenuItem className="">
      <NavLink to={url}>
        {" "}
        {icon} {title}{" "}
      </NavLink>
    </DropdownMenuItem>
  );
};
