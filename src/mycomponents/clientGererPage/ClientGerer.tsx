import { faker } from "@faker-js/faker";
import { Fragment, useEffect, useState } from "react";
import ButtonForCopy from "../ui/ButtonForCopy";
import { CopyIcon } from "lucide-react";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";
import { ClientDataType, requestTogetAllClientData } from "@/fakeData";
import ClientDataComponent from "./ClientDataComponent";
import SearchBarForClient from "../ui/searchBarUi/SearchBarForClient";

const userData = [
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    motsDepasse: faker.word.words(2),
    dateCreation: format(
      faker.date.between({ from: "2023-01-01", to: Date.now() }),
      "dd/MM/yyyy"
    ),
    dateMiseAJour: format(
      faker.date.between({ from: "2023-01-01", to: Date.now() }),
      "dd/MM/yyyy"
    ),
    status: faker.datatype.boolean(),
    image: faker.image.url({ width: 35, height: 35 }),
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    motsDepasse: faker.word.words(2),
    dateCreation: format(
      faker.date.between({ from: "2023-01-01", to: Date.now() }),
      "dd/MM/yyyy"
    ),
    dateMiseAJour: format(
      faker.date.between({ from: "2023-01-01", to: Date.now() }),
      "dd/MM/yyyy"
    ),
    status: faker.datatype.boolean(),
    image: faker.image.url({ width: 35, height: 35 }),
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    motsDepasse: faker.word.words(2),
    dateCreation: format(
      faker.date.between({ from: "2023-01-01", to: Date.now() }),
      "dd/MM/yyyy"
    ),
    dateMiseAJour: format(
      faker.date.between({ from: "2023-01-01", to: Date.now() }),
      "dd/MM/yyyy"
    ),
    status: faker.datatype.boolean(),
    image: faker.image.url({ width: 35, height: 35 }),
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    motsDepasse: faker.word.words(2),
    dateCreation: format(
      faker.date.between({ from: "2023-01-01", to: Date.now() }),
      "dd/MM/yyyy"
    ),
    dateMiseAJour: format(
      faker.date.between({ from: "2023-01-01", to: Date.now() }),
      "dd/MM/yyyy"
    ),
    status: faker.datatype.boolean(),
    image: faker.image.url({ width: 35, height: 35 }),
  },
];

export const gererClientIcon = (width: string, heigth: string) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={heigth}
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        d="M18 21c-1.655 0-3-1.346-3-3s1.345-3 3-3c1.654 0 3 1.346 3 3s-1.346 3-3 3Zm6-3h-3zm-3.879 2.122l2.121 2.12zM18.001 24v-3zm-4.244-1.757l2.121-2.122zM12 18h3zm3.878-2.121l-2.12-2.121zm2.122-.88v-3zm2.121.88l2.121-2.121zM12.5 12.5C11.266 11.446 9.775 11 8 11c-3.866 0-7 2.03-7 7v5h10M8 11A5 5 0 1 0 8 1a5 5 0 0 0 0 10Z"
      />
    </svg>
  );
};

export const eyeOpenIcon = (width: string, heigth: string) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={heigth}
      viewBox="0 0 1024 896"
    >
      <path
        fill="currentColor"
        d="M512 896q-122 0-231-58.5t-183.5-161T0 448q23-126 97.5-228.5T281 58.5T512 0t231 58.5t183.5 161T1024 448q-23 126-97.5 228.5T743 837.5T512 896m0-768q-162 0-289.5 91.5T64 448q31 138 158.5 229T512 768t289.5-91T960 448q-31-137-158.5-228.5T512 128m0 576q-106 0-181-75t-75-181q0-60 27-114l58 29q-21 42-21 85q0 80 56 136t135.5 56t136-56T704 448.5t-56.5-136T512 256q-44 0-86 21l-28-57q54-28 114-28q106 0 181 75t75 181t-75 181t-181 75m-57-370q28-14 57-14q53 0 90.5 37.5T640 448t-37.5 90.5T512 576t-90.5-37.5T384 448q0-29 14-57l114 57z"
      />
    </svg>
  );
};

export const eyeCloseIcon = (width: string, heigth: string) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={heigth}
      viewBox="0 0 1024 1023"
    >
      <path
        fill="currentColor"
        d="M110 1004q-19 19-45.5 19T19 1004T0 958.5T19 913l122-122Q30 671 1 512q23-126 97-228.5t183-161T512 64q145 0 272 84L913 19q19-19 46-19t45.5 18.5T1023 64t-19 46zm402-812q-131 0-245 64h-11v6q-73 44-123.5 108.5T65 512q28 125 141 214l85-86q-35-59-35-128q0-60 28-114l57 28q-21 42-21 86q0 43 19 81l50-50q-5-17-5-31q0-29 14-57l53 26l30-31l-26-52q28-14 57-14q14 0 32 4l50-50q-39-18-82-18t-85 21l-29-58q54-27 114-27q69 0 129 35l61-61q-92-38-190-38m255 347q-10 90-74 153.5T540 766zM512 831q162 0 289.5-91T960 512q-14-60-50-116l53-53q45 80 61 169q-23 126-97.5 228.5T743 901t-231 58q-72 0-143-22l107-107q20 1 36 1"
      />
    </svg>
  );
};

export const PlusIcon = (width: string, heigth: string) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={heigth}
      viewBox="0 0 1408 1408"
    >
      <path
        fill="currentColor"
        d="M1408 608v192q0 40-28 68t-68 28H896v416q0 40-28 68t-68 28H608q-40 0-68-28t-28-68V896H96q-40 0-68-28T0 800V608q0-40 28-68t68-28h416V96q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68"
      />
    </svg>
  );
};

function ClientGerer() {
  const [copied, setCopied] = useState(false);
  const [clientData, setClientData] = useState<ClientDataType[]>();
  const [loadingFail, setLoadingFail] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      "https://untrucdejesus.gererlesclients.com/client"
    );
    setCopied(true);
  };

  useEffect(() => {
    const getAllClientData = async () => {
      try {
        const data = await requestTogetAllClientData();
        setClientData([...data]);
      } catch (error) {
        setLoadingFail(true);
      }
    };
    getAllClientData();
  }, []);

  if (!clientData && !loadingFail) {
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
        ou pas de client disponible
      </div>
    );
  }

  return (
    <Fragment>
      {/*  <HeaderForAllBackOffice /> */}
      <div className="w-full flex flex-col gap-4 max-[840px]:w-full min-[840px]:flex-row min-[840px]:items-center min-[840px]:justify-between mt-10">
        <div className="flex gap-3 ">
          <div className="titleAcceuil flex-shrink-0">
            <div className=" flex items-center gap-2 text-[#e91e63] mt-3">
              {gererClientIcon("30", "30")}
              <h1 className=" text-[#344767] font-bold text-[18px] flex-shrink-0 ">
                GESTION DES CLIENTS
              </h1>
            </div>
          </div>
          <p className="bg-[#e91e63] px-2 py-1 align-middle self-center rounded-lg text-white flex-shrink-0 ">
            Total:{userData.length}
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center justify-center">
            <button
              type="button"
              title="Ajouter des clients"
              className="flex items-center"
            >
              <NavLink
                to="/GERER LES CLIENS/ajouter-des-clients"
                className="px-2 py-2 bg-[#e91e63] text-white font-bold rounded-md "
              >
                <span className="inline-block">{PlusIcon("15", "15")}</span>{" "}
                Ajouter des clients
              </NavLink>
            </button>
          </div>
          <SearchBarForClient
            placeholder="Recherche par Nom et Email..."
            setClientData={setClientData}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 py-4  w-full border-[2px] shadow-xl rounded-xl mt-5 px-3 ">
        <div className=" rounded-xl w-full p-4 bg-[#e91e63] flex items-center justify-between">
          <p className="text-white text-[20px] font-bold">Liste des clients</p>
          <div className="flex gap-0 items-center p-0">
            <input
              title="Copier l'url"
              className="outline-none rounded-l-md bg-white p-2 text-center text-[#191919]"
              value={" https://untrucdejesus.gererlesclients.com/client"}
              onClick={handleCopy}
              onFocus={(e) => {
                e.target.select();
              }}
            />

            <ButtonForCopy
              setCopied={setCopied}
              name="email"
              title={copied ? "Url copié" : "Copier l'url"}
              icon={<CopyIcon />}
              position="left"
              otherClasses="!bg-[#161a31]"
              handleClick={handleCopy}
            />
          </div>
        </div>
        <div className="w-full mt-5">
          <div className="w-full grid grid-cols-7 mb-2">
            <p className="flex-1 text-center ">CLIENT</p>
            <p className="text-center   ">LOGO</p>
            <p className="text-center  ">MOT DE PASSE</p>
            <p className="text-center   ">DATE CREATION</p>
            <p className=" text-center ">DATE MISE A JOUR</p>
            <p className="text-center ">STATUS</p>
            <p className="text-center ">ACTION</p>
          </div>

          {clientData &&
            clientData.map((value, index) => (
              <Fragment key={index}>
                <ClientDataComponent
                  value={value}
                  index={index}
                  setClientData={setClientData}
                  setLoadingFail={setLoadingFail}
                />
              </Fragment>
            ))}
        </div>
      </div>
      {/* <FooterBackoffice /> */}
    </Fragment>
  );
}

export default ClientGerer;
