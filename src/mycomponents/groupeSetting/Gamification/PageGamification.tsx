import { Toaster } from "@/components/ui/toaster";
import { NavLink, useParams } from "react-router-dom";
import HeaderForAllBackOffice from "@/mycomponents/ui/HeaderForAllBackOffice";
import { FooterBackoffice } from "@/mycomponents/acceuilPage/FooterBackoffice";
import { ChangeEvent, useEffect, useState } from "react";
import { GroupeDataType, requestTogetAllUniversalData } from "@/fakeData";
import { toast } from "@/hooks/use-toast";
import { BodyGamification } from "./BodyGamification";

function PageGamification() {
  const [groupePageAssociateTotal, setGroupePageAssociateTotal] = useState<
    GroupeDataType[]
  >([]);
  const [loadingGroupeData, setLoadingGroupeData] = useState(false);
  const [groupeSelect, setGroupeSelect] = useState("");
  const { communityId } = useParams<string>();
  const handleGroupeSelectValue = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setGroupeSelect(e.target.value);
  };
  useEffect(() => {
    const getAllData = async () => {
      try {
        setLoadingGroupeData(true);

        const groupeData = await requestTogetAllUniversalData<GroupeDataType>(
          "GroupeData"
        );
        console.log({ groupeData });
        setGroupePageAssociateTotal([...groupeData]);
        setGroupeSelect(groupeData[0].id as string);
        setLoadingGroupeData(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description:
            "Les données n'ont pas pu etre télécharger, vérifier votre connexion",
        });
      }
    };
    getAllData();
  }, []);

  if (loadingGroupeData) {
    return (
      <div className="w-full text-center pt-4">
        Une erreur est survenue pendant le chargement ou problème de connexion
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col pl-3 ">
      <HeaderForAllBackOffice />
      <div className="w-full flex flex-col gap-4 max-[840px]:w-full min-[840px]:flex-row min-[840px]:items-center min-[840px]:justify-between mt-10">
        <div className="flex justify-between items-center w-full pr-2 ">
          <div className="titleAcceuil">
            <div className=" flex items-center gap-2 text-[#e91e63] mt-3">
              <span className="icon-[material-symbols--rewarded-ads] text-3xl"></span>
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                GAMIFICATION
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-5 mr-4">
            <button
              type="button"
              title="Retour à la page communauté"
              className="flex items-center"
            >
              <NavLink
                to="/GROUPES"
                className="flex items-center px-2 py-2 bg-[#fff] text-[#191919] font-bold rounded-md border-solid border-[1px] border-[#191919]"
              >
                <span className="icon-[material-symbols--arrow-circle-left-rounded] text-xl  mr-1 "></span>{" "}
                <span>Retour</span>
              </NavLink>
            </button>
            <p>Groupe</p>
            <select
              title="selectionner un group"
              name="groupeSelect"
              id="groupeSelect"
              value={groupeSelect}
              onChange={handleGroupeSelectValue}
              className="flex-1 text-[16px] sm:text-[18px] border-[1px] border-[#000]/10 border-solid focus:border-[#e91e63] focus:outline-none p-2 rounded-md selection:border-[#e91e63] "
            >
              {groupePageAssociateTotal.map((value) => (
                <option value={value.id}> {value.titleGroupe} </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* <HeaderBackoffice /> */}
      <div className=" w-full px-2 flex items-center  mt-[20px] mx-auto ">
        <BodyGamification
          groupeData={groupePageAssociateTotal.find(
            (value) => value.id === groupeSelect
          )}
          communityId={communityId as string}
        />
        <Toaster />
      </div>
      {/*  </div>
    </div> */}
      <FooterBackoffice />
    </div>
  );
}

export { PageGamification };
