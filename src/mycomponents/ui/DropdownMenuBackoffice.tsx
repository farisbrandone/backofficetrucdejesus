import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export function DropdownMenuBackoffice({ title }: { title: string }) {
  const [rotation, setRotation] = useState(0);
  const rotateTriangle = () => {
    console.log("dingo");
    setRotation((prev) => prev + 180);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={rotateTriangle}
          className={`bg-[#191919] text-white hover:bg-gray-800 hover:text-white font-bold `}
        >
          {title}{" "}
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
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {" "}
          <NavLink to="/COMMUNAUTES/update">Mettre à jour</NavLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DropdownMenuForGroupe({
  title,
  groupeId,
}: {
  title: string;
  groupeId: string;
}) {
  const [rotation, setRotation] = useState(0);
  const rotateTriangle = () => {
    console.log("dingo");
    setRotation((prev) => prev + 180);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={rotateTriangle}
          className={`bg-[#191919] text-white hover:bg-gray-800 hover:text-white font-bold `}
        >
          {title}{" "}
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
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {" "}
          <NavLink to={`/GROUPES/update-groupe-page/${groupeId}`}>
            Mettre à jour
          </NavLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
