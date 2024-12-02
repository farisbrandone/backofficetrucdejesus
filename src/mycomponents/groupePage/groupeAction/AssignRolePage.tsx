import { ChangeEvent, Fragment, useEffect, useState } from "react";
import {
  requestTogetAllMembreData,
  requestTogetAllUniversalData,
  requestToSetUniversalData,
  requestToUpdateUniversalDataWithId,
} from "@/fakeData";
import { NavLink, useParams } from "react-router-dom";
import { MemberDataType } from "@/mycomponents/membreGererPage/MemberDataComponent";
import { FooterBackoffice } from "@/mycomponents/acceuilPage/FooterBackoffice";
import SearchBarForMembre from "@/mycomponents/ui/searchBarUi/SearchBarForMembre";
import AssignRoleComponent from "./AssignRoleComponent";
import clsx from "clsx";
import { toast } from "@/hooks/use-toast";

export interface RoleUserGroupeDataType {
  groupeId: string;
  role: string;
  member: MemberDataType;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
}

function AssignRolePage() {
  const [membreData, setMembreData] = useState<MemberDataType[]>();
  const [openAsignRole, setOpenAsignRole] = useState(false);
  const [memberSelect, setMemberSelect] = useState<MemberDataType>();
  const [alreadyExist, setAlreadyExist] = useState<RoleUserGroupeDataType>();
  const [loadingFail, setLoadingFail] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [startSending, setStartSending] = useState(false);
  const [radioValue, setRadioValue] = useState("");
  const { groupeId } = useParams<string>();

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value);
  };

  const submitRoleUser = async () => {
    if (!radioValue || !memberSelect) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Donnée fournit insufisant",
      });
      return;
    }

    const data = {
      groupeId: groupeId as string,
      role: radioValue,
      member: memberSelect,
    };

    if (alreadyExist) {
      try {
        const result =
          await requestToUpdateUniversalDataWithId<RoleUserGroupeDataType>(
            alreadyExist.id as string,
            "RoleUserGroupeData",
            data
          );

        if (result.success) {
          toast({
            title: "Success",
            description: " success",
          });
          setStartSending(() => false);
          return;
        } else {
          toast({
            variant: "destructive",
            title: "Erreur",
            description: "Une erreur est survenue cotée serveur",
          });
          setStartSending(() => false);
          return;
        }
      } catch (error) {}
    }
    const resultAll = await requestToSetUniversalData<RoleUserGroupeDataType>(
      "RoleUserGroupeData",
      data
    );
    if (resultAll.success) {
      toast({
        title: "Success",
        description: " success",
      });
      setStartSending(() => false);
      return;
    } else {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue cotée serveur",
      });
      setStartSending(() => false);
      return;
    }
  };

  useEffect(() => {
    const getAllMembreData = async () => {
      try {
        const data = await requestTogetAllMembreData();
        setMembreData([...data]);
      } catch (error) {
        setLoadingFail(true);
      }
    };
    getAllMembreData();
  }, []);

  useEffect(() => {
    const getAllData = async () => {
      try {
        setLoadingData(true);
        const result = (
          await requestTogetAllUniversalData<RoleUserGroupeDataType>(
            "RoleUserGroupeData"
          )
        ).find((value) => value.groupeId === groupeId);
        setLoadingData(false);
        if (result) {
          setAlreadyExist({ ...result });
          setMemberSelect(result.member);
          setRadioValue(result.role);
          return;
        }
      } catch (error) {
        setLoadingFail(true);
      }
    };
    getAllData();
  }, []);

  if (loadingData) {
    return (
      <div className="fixed bg-[#000]/50 flex flex-col items-center justify-center top-0 right-0 bottom-0 left-0 z-10">
        Loading...
      </div>
    );
  }

  if (!membreData && !loadingFail && loadingData) {
    return (
      <div className="w-full text-center pt-4">
        Le document est en cours de chargement ...
      </div>
    );
  }

  if (loadingFail) {
    return (
      <div className="w-full text-center pt-4">
        Une erreur est survenue pendant le chargement ou problème de connexion
      </div>
    );
  }

  return (
    <Fragment>
      {/*  <HeaderForAllBackOffice /> */}
      {openAsignRole && (
        <div className="fixed   bg-[#000]/50 flex flex-col items-center top-0 right-0 bottom-0 left-0 z-10 ">
          <div className="w-[800px] flex flex-col p-0 bg-white mt-[200px] rounded-lg ">
            <div className=" w-full p-2 bg-[#e91e63] text-white flex justify-between items-center rounded-t-lg">
              <p className="font-bold"> ASSIGNER DES ROLES</p>
              <button
                title="Fermer"
                type="button"
                onClick={() => setOpenAsignRole(false)}
              >
                <span className="icon-[ooui--close]"></span>
              </button>
            </div>
            <div className="flex flex-col h-[500px] gap-3">
              <p className="mx-4 px-2 py-3 border-l-[5px] border-l-solid border-l-[#e91e63] rounded-md mt-3 ">
                <span className="text-[#e91e63] font-bold">Email:</span>{" "}
                {memberSelect?.email}
              </p>
              <div className="flex items-start justify-between mt-4 px-4 flex-1">
                <div className="flex items-center gap-3">
                  <div>
                    <label
                      htmlFor="assignRole1"
                      className={clsx(
                        "relative w-[20px] h-[20px] rounded-full border-[2px] border-solid border-[#fff] afterRadio block ",
                        { "bg-[#e91e63]": radioValue === "Admin" }
                      )}
                    ></label>
                  </div>
                  <p>
                    {" "}
                    Admin (Permission to edit post, edit comment, delete
                    comment, delete post and approve post.)
                  </p>
                  <input
                    placeholder="!!"
                    type="radio"
                    id="assignRole1"
                    value="Admin"
                    checked={radioValue === "Admin"}
                    onChange={handleRadioChange}
                    className="hidden"
                    disabled={startSending}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <label
                      htmlFor="assignRole2"
                      className={clsx(
                        "relative w-[20px] h-[20px] rounded-full border-[2px] border-solid border-[#fff]   afterRadio block ",
                        { "bg-[#e91e63]": radioValue === "Moderator" }
                      )}
                    ></label>
                    <input
                      placeholder="!!"
                      type="radio"
                      id="assignRole2"
                      value="Moderator"
                      className="hidden"
                      checked={radioValue === "Moderator"}
                      onChange={handleRadioChange}
                      disabled={startSending}
                    />
                  </div>
                  <p>Moderator (Permission to edit post and edit comment.)</p>
                </div>
              </div>
              <button
                className="p-2 bg-[#191919] text-white rounded-md text-center w-[100px] ml-3 mb-5 "
                onClick={submitRoleUser}
                disabled={startSending}
              >
                {" "}
                Enregistrer{" "}
              </button>
            </div>
          </div>
        </div>
      )}
      <FooterBackoffice />
      <div className="w-full flex flex-col gap-4 max-[840px]:w-full min-[840px]:flex-row min-[840px]:items-center min-[840px]:justify-between mt-10">
        <div className="flex gap-3 ">
          <div className="titleAcceuil">
            <div className=" flex items-center gap-2 text-[#e91e63] mt-3">
              <span className="icon-[material-symbols--group-rounded] text-3xl mr-2"></span>
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                ASSIGNER DES ROLES
              </h1>
            </div>
          </div>
          <p className="bg-[#e91e63] px-2 py-1 align-middle self-center rounded-lg text-white ">
            Total: {membreData?.length}
          </p>
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
          <SearchBarForMembre
            placeholder="Recherche par nom de membre..."
            setMemberData={setMembreData}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 py-4  w-full border-[2px] shadow-xl rounded-xl mt-5 px-3 ">
        <div className=" rounded-xl w-full p-4 bg-[#e91e63] flex items-center justify-between">
          <p className="text-white text-[20px] font-bold">
            GROUPE: {"Nom du groupe"}
          </p>
        </div>
        <div className="w-full mt-5">
          <div className="w-full grid grid-cols-5 mb-2">
            <p className="text-center  ">NOM</p>
            <p className="text-center   ">PHONE</p>
            <p className="text-center   ">NAISSANCE</p>
            <p className="text-center   ">CREER</p>
            <p className="text-center ">ACTION</p>
          </div>

          {membreData?.map((value, index) => (
            <Fragment key={index}>
              <AssignRoleComponent
                value={value}
                index={index}
                setMembreData={setMembreData}
                setLoadingFail={setLoadingFail}
                setOpenAsignRole={setOpenAsignRole}
                setMemberSelect={setMemberSelect}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default AssignRolePage;
