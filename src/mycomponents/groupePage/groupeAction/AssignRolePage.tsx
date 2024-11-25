import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { requestTogetAllMembreData } from "@/fakeData";
import { NavLink } from "react-router-dom";
import { MemberDataType } from "@/mycomponents/membreGererPage/MemberDataComponent";
import { FooterBackoffice } from "@/mycomponents/acceuilPage/FooterBackoffice";
import SearchBarForMembre from "@/mycomponents/ui/searchBarUi/SearchBarForMembre";
import AssignRoleComponent from "./AssignRoleComponent";
import clsx from "clsx";

function AssignRolePage() {
  const [membreData, setMembreData] = useState<MemberDataType[]>();
  const [loadingFail, setLoadingFail] = useState(false);
  const [openAsignRole, setOpenAsignRole] = useState(false);
  const [radioValue, setRadioValue] = useState("");

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value);
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

  if (!membreData && !loadingFail) {
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
                farisbrandone@yahoo.com
              </p>
              <div className="flex items-start justify-between mt-4 px-4 flex-1">
                <div className="flex items-center gap-3">
                  <div>
                    <label
                      htmlFor="assignRole1"
                      className={clsx(
                        "relative w-[20px] h-[20px] rounded-full border-[2px] border-solid border-[#fff] afterRadio block ",
                        { "bg-[#e91e63]": radioValue === "option1" }
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
                    value="option1"
                    checked={radioValue === "option1"}
                    onChange={handleRadioChange}
                    className="hidden"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <label
                      htmlFor="assignRole2"
                      className={clsx(
                        "relative w-[20px] h-[20px] rounded-full border-[2px] border-solid border-[#fff]   afterRadio block ",
                        { "bg-[#e91e63]": radioValue === "option2" }
                      )}
                    ></label>
                    <input
                      placeholder="!!"
                      type="radio"
                      id="assignRole2"
                      value="option2"
                      className="hidden"
                      checked={radioValue === "option2"}
                      onChange={handleRadioChange}
                    />
                  </div>
                  <p>Moderator (Permission to edit post and edit comment.)</p>
                </div>
              </div>
              <button className="p-2 bg-[#191919] text-white rounded-md text-center w-[100px] ml-3 mb-5 ">
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
              />
            </Fragment>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default AssignRolePage;
