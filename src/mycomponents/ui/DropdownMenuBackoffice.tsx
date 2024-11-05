import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  requestToDeleteEventWithId,
  requestToDeleteGroupeWithId,
  requestToDeleteMembreWithId,
} from "@/fakeData";
import { useToast } from "@/hooks/use-toast";
import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

export function DropdownMenuBackoffice({ title }: { title: string }) {
  const [rotation, setRotation] = useState(0);
  const rotateTriangle = () => {
    console.log("dingo");
    setRotation((prev) => prev + 180);
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
      <DropdownMenuTrigger asChild>
        <Button
          onClick={rotateTriangle}
          className={`bg-[#191919] text-white hover:bg-gray-800 hover:text-white font-bold `}
        >
          {title} {iconMemo}
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
  baseUrl,
}: {
  title: string;
  groupeId: string;
  baseUrl: string;
}) {
  console.log(baseUrl);
  const [rotation, setRotation] = useState(0);
  const [pageForDeletion, setPageForDeletion] = useState(false);
  const [stateSuppression, setStateSuppression] = useState(false);
  const { toast } = useToast();
  const rotateTriangle = () => {
    console.log("dingo");
    setRotation((prev) => prev + 180);
  };
  const deleteGroupe = async () => {
    setStateSuppression(() => true);
    let result;
    if (baseUrl === "GROUPES/update-groupe-page") {
      result = await requestToDeleteGroupeWithId(groupeId);
    }
    if (baseUrl === "EVENEMENTS/update-event-page") {
      result = await requestToDeleteEventWithId(groupeId);
    }

    if (baseUrl === "GERER LES MEMBRES/update-membre-page") {
      result = await requestToDeleteMembreWithId(groupeId);
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
  return (
    <div>
      {pageForDeletion && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-transparent backdrop-blur-lg z-50">
          <div className="relative w-[330px] h-[330px] flex flex-col items-center justify-center bg-[#344767] rounded-2xl drop-shadow-xl  ">
            <p className="text-[#fff] w-full text-center font-bold text-[18px] p-2 ">
              {" "}
              Voulez-vous vraiment supprimer le{" "}
              {baseUrl === "EVENEMENTS/update-event-page"
                ? " l'événement"
                : baseUrl === "GERER LES MEMBRES/update-membre-page"
                ? "Membre"
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
          {baseUrl === "GROUPES/update-groupe-page" && (
            <DropdownMenuItem>
              {" "}
              <NavLink to={`/GERER LES CHAINES/${groupeId}`}>
                Créer une chaine
              </NavLink>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            {" "}
            <NavLink to={`/${baseUrl}/${groupeId}`}>Mettre à jour</NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setPageForDeletion(true)}
            className="cursor-pointer"
          >
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
