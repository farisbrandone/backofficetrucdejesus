import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  OtherSettingData,
  requestTogetAllUniversalData,
  requestToSetUniversalData,
  requestToUpdateUniversalDataWithId,
} from "@/fakeData";
import { toast } from "@/hooks/use-toast";
import { createDecimalArray, generateWorldCurrencyArray } from "@/lib/utils";
import HeaderForAllBackOffice from "@/mycomponents/ui/HeaderForAllBackOffice";
import { ChangeEvent, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import countryCode from "../../../../countryPhoneCodes.json";
import LoadingTotal from "@/mycomponents/ui/LoadingTotal";

const taxArrayValue = createDecimalArray(0.1, 251);
const arrayCurrency = generateWorldCurrencyArray();

export default function PageOtherSetting() {
  const { communityId } = useParams<string>();
  const [manualPaymentStatus, setManualPaymentStatus] = useState("desactivate");
  const [RTL, setRTL] = useState("desactivate");
  const [GPRSettings, setGPRSettings] = useState("desactivate");
  const [GDPRMandatory, setGDPRMandatory] = useState("desactivate");
  const [PhoneNumberRequired, setPhoneNumberRequired] = useState("desactivate");
  const [ValueAddedTaxStatus, setValueAddedTaxStatus] = useState("desactivate");
  const [ValueAddedTax, setValueAddedTax] = useState(20);
  const [DefaultCurrency, setDefaultCurrency] = useState("USD");

  const [LastName, setLastName] = useState("desactivate");
  const [Gender, setGender] = useState("desactivate");
  const [Phone, setPhone] = useState("desactivate");
  const [DateofBirth, setDateofBirth] = useState("desactivate");
  const [MemberCount, setMemberCount] = useState("desactivate");
  const [PhoneNumberCountryCodeStatus, setPhoneNumberCountryCodeStatus] =
    useState("desactivate");
  const [PhoneNumberCountryCode, setPhoneNumberCountryCode] = useState("+33");
  const [alreadyExist, setAlreadyExist] = useState<OtherSettingData>();
  const [loadingFail, setLoadingFail] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [startSending, setStartSending] = useState(false);

  const handlePhoneNumberCountryCode = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setPhoneNumberCountryCode(e.target.value);
  };

  const handleMemberCount = () => {
    if (MemberCount === "activate") {
      setMemberCount("desactivate");
      return;
    }
    setMemberCount("activate");
  };
  const handlePhoneNumberCountryCodeStatus = () => {
    if (PhoneNumberCountryCodeStatus === "activate") {
      setPhoneNumberCountryCodeStatus("desactivate");
      return;
    }
    setPhoneNumberCountryCodeStatus("activate");
  };

  const handleLastName = () => {
    if (LastName === "activate") {
      setLastName("desactivate");
      return;
    }
    setLastName("activate");
  };

  const handleGender = () => {
    if (Gender === "activate") {
      setGender("desactivate");
      return;
    }
    setGender("activate");
  };

  const handlePhone = () => {
    if (Phone === "activate") {
      setPhone("desactivate");
      return;
    }
    setPhone("activate");
  };

  const handleDateofBirth = () => {
    if (DateofBirth === "activate") {
      setDateofBirth("desactivate");
      return;
    }
    setDateofBirth("activate");
  };

  const handleDefaultCurrency = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setDefaultCurrency(e.target.value);
  };

  const handleManualPaymentStatus = () => {
    if (manualPaymentStatus === "activate") {
      setManualPaymentStatus("desactivate");
      return;
    }
    setManualPaymentStatus("activate");
  };

  const handleRTL = () => {
    if (RTL === "activate") {
      setRTL("desactivate");
      return;
    }
    setRTL("activate");
  };

  const handleGPRSettings = () => {
    if (GPRSettings === "activate") {
      setGPRSettings("desactivate");
      return;
    }
    setGPRSettings("activate");
  };

  const handleGDPRMandatory = () => {
    if (GDPRMandatory === "activate") {
      setGDPRMandatory("desactivate");
      return;
    }
    setGDPRMandatory("activate");
  };

  const handlePhoneNumberRequired = () => {
    if (PhoneNumberRequired === "activate") {
      setPhoneNumberRequired("desactivate");
      return;
    }
    setPhoneNumberRequired("activate");
  };

  const handleValueAddedTaxStatus = () => {
    if (ValueAddedTaxStatus === "activate") {
      setValueAddedTaxStatus("desactivate");
      return;
    }
    setValueAddedTaxStatus("activate");
  };

  const handleValueAddedTax = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    setValueAddedTax(Number(e.target.value));
  };

  const saveOtherSetting = async () => {
    const data = {
      manualPaymentStatus,
      RTL,
      GPRSettings,
      GDPRMandatory,
      PhoneNumberRequired,
      ValueAddedTaxStatus,
      ValueAddedTax,
      DefaultCurrency,
      LastName,
      Gender,
      Phone,
      DateofBirth,
      MemberCount,
      PhoneNumberCountryCodeStatus,
      PhoneNumberCountryCode,
      communityId,
    };
    if (alreadyExist) {
      try {
        const result =
          await requestToUpdateUniversalDataWithId<OtherSettingData>(
            alreadyExist.id as string,
            "OtherSettingData",
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
    const resultAll = await requestToSetUniversalData<OtherSettingData>(
      "OtherSettingData",
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
    const getAllData = async () => {
      try {
        setLoadingData(true);
        const result = (
          await requestTogetAllUniversalData<OtherSettingData>(
            "OtherSettingData"
          )
        ).filter((value) => value.communityId === communityId);
        setLoadingData(false);
        if (result.length > 0) {
          setAlreadyExist({ ...result[0] });

          setDateofBirth(result[0].DateofBirth);
          setDefaultCurrency(result[0].DefaultCurrency);
          setGDPRMandatory(result[0].GDPRMandatory);
          setGPRSettings(result[0].GPRSettings);
          setGender(result[0].Gender);
          setLastName(result[0].LastName);
          setManualPaymentStatus(result[0].manualPaymentStatus);
          setMemberCount(result[0].MemberCount);
          setPhone(result[0].Phone);
          setPhoneNumberCountryCode(result[0].PhoneNumberCountryCode);
          setPhoneNumberCountryCodeStatus(
            result[0].PhoneNumberCountryCodeStatus
          );
          setPhoneNumberRequired(result[0].PhoneNumberRequired);
          setRTL(result[0].RTL);
          setValueAddedTax(result[0].ValueAddedTax);
          setValueAddedTaxStatus(result[0].ValueAddedTaxStatus);
          return;
        }
      } catch (error) {
        setLoadingFail(false);
      }
    };
    getAllData();
  }, []);

  const classSimilar =
    "flex flex-col gap-4 text-[#344767] border-[1px] border-solid border-[#e91e63] p-5 text-[16px] max-w-[550px] rounded-lg  flex-shrink-0";
  const classSelect =
    "p-2 rounded-md border-[1px] border-solid border-[#000]/40 focus:border-[#e91e63] focus:outline-none";
  if (loadingData) {
    return <div className="w-full text-center pt-4">Loading...</div>;
  }

  if (loadingFail) {
    return (
      <div className="w-full text-center pt-4">
        Une erreur est survenue pendant le chargement ou problème de connexion
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col pl-3 ">
      <HeaderForAllBackOffice />
      <div className="w-full flex flex-col gap-4 max-[840px]:w-full min-[840px]:flex-row min-[840px]:items-center min-[840px]:justify-between mt-10 ">
        <div className="flex justify-between items-center w-full pr-2 ">
          <div className="titleAcceuil">
            <div className=" flex items-center gap-2 text-[#e91e63] mt-3">
              <span className="icon-[fa6-solid--lock] text-3xl "></span>
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                Autres paramètres
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
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-wrap gap-5 mt-5 max-h-[1200px]  items-center ">
        <div className={classSimilar}>
          <div className="flex justify-between px-2">
            <p className="text-[20px] ">Paiement manuelle</p>
            <Switch onChange={handleManualPaymentStatus} />
          </div>
          <p>
            Lorsque vous activez cette section, l'option de paiement manuel
            s'affichera dans la caisse pour cette communauté. la caisse pour
            cette communauté.
          </p>
        </div>

        <div className={classSimilar}>
          <div className="flex justify-between px-2">
            <p className="text-[20px] ">RTL (direction du texte)</p>
            <Switch onChange={handleRTL} />
          </div>
          <p>
            Lorsque vous activez cette section, la direction du texte sera « De
            droite à gauche » pour les communautés backend et frontend. gauche »
            pour les communautés backend et frontend.
          </p>
        </div>

        <div className={classSimilar}>
          <div className="flex justify-between px-2">
            <p className="text-[20px] ">Paramètres GDPR</p>
            <Switch onChange={handleGPRSettings} />
          </div>
          <p>
            Lorsque vous activez cette section, la case à cocher « Consentement
            de l'utilisateur GDPR » s'affiche dans la communauté.
          </p>

          <p className="text-[#e91e63] ">
            <strong>Note:</strong> Le client ne sera ajouté à la liste du
            répondeur automatique que s'il accepte la case à cocher relative au
            consentement de l'utilisateur.
          </p>
          <div className="flex justify-between px-2">
            <p className="text-[20px] ">GDPR Obligatoire</p>
            <Switch onChange={handleGDPRMandatory} />
          </div>

          <p>
            Lorsque vous activez ce champ obligatoire, le client ne pourra
            procéder à l'opération que s'il accepte la case à cocher relative au
            consentement de l'utilisateur.
          </p>
        </div>

        <div className={classSimilar}>
          <div className="flex justify-between px-2">
            <p className="text-[20px] ">Numéro de téléphone requis</p>
            <Switch onChange={handlePhoneNumberRequired} />
          </div>
          <p>
            Lorsque vous activez cette section, le numéro de téléphone est un
            champ obligatoire pour la communauté.
          </p>
        </div>
        <div className={classSimilar}>
          <div className="flex justify-between px-2">
            <p className="text-[20px] ">TVA</p>
            <Switch onChange={handleValueAddedTaxStatus} />
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="ValueAddedTax">Tax %</Label>
            <select
              title="selectionner la taxe à ajouter"
              name="ValueAddedTax"
              id="ValueAddedTax"
              value={ValueAddedTax}
              onChange={handleValueAddedTax}
              className={classSelect}
            >
              {taxArrayValue.map((value) => (
                <option key={value} value={value}>
                  {" "}
                  {value}{" "}
                </option>
              ))}
            </select>
          </div>

          <p>
            Lorsque vous activez cette section, le pourcentage de « TVA » pour
            le montant de l'achat sera ajouté à cette boutique. sera ajouté à ce
            magasin.
          </p>
        </div>
        <div className={classSimilar}>
          <p className="text-[20px] ">Devise par défaut</p>

          <select
            title="selectionner la taxe à ajouter"
            name="DefaultCurrency"
            id="DefaultCurrency"
            value={DefaultCurrency}
            onChange={handleDefaultCurrency}
            className={classSelect}
          >
            {arrayCurrency.map((value) => (
              <option key={value} value={value}>
                {" "}
                {value}{" "}
              </option>
            ))}
          </select>
          <p>
            Choisissez la devise par défaut dans le menu déroulant. La devise
            sélectionnée sera affichée par défaut dans la communauté.
          </p>
        </div>
        <div className={classSimilar}>
          <div className="flex justify-between px-2">
            <p className="text-[20px] ">Nom de famille</p>
            <Switch onChange={handleLastName} />
          </div>
          <div className="flex justify-between px-2">
            <p className="text-[20px] ">Genre</p>
            <Switch onChange={handleGender} />
          </div>
          <div className="flex justify-between px-2">
            <p className="text-[20px] ">Numéro de téléphone</p>
            <Switch onChange={handlePhone} />
          </div>
          <div className="flex justify-between px-2">
            <p className="text-[20px] ">Date de naissance</p>
            <Switch onChange={handleDateofBirth} />
          </div>
          <p>
            Lorsque vous activez cette section, le nom de famille, la date de
            naissance, le sexe et le numéro de téléphone ne s'afficheront pas
            lors de l'inscription à la communauté.
          </p>
        </div>
        <div className={classSimilar}>
          <div className="flex justify-between px-2">
            <p className="text-[20px] ">Member Count</p>
            <Switch onChange={handleMemberCount} />
          </div>
          <p>
            Lorsque vous activez cette section, le nombre de membres ne
            s'affiche pas dans la communauté. communauté.
          </p>
        </div>
        <div className={classSimilar}>
          <div className="flex justify-between px-2">
            <p className="text-[20px] ">Phone Number Country Code</p>
            <Switch onChange={handlePhoneNumberCountryCodeStatus} />
          </div>
          <select
            title="selectionner la taxe à ajouter"
            name="DefaultCurrencyPhoneNumberCountryCode"
            id="PhoneNumberCountryCode"
            value={PhoneNumberCountryCode}
            onChange={handlePhoneNumberCountryCode}
            className={classSelect}
          >
            {countryCode.map((value) => (
              <option key={value.iso} value={value.code}>
                {" "}
                {value.country}{" "}
              </option>
            ))}
          </select>
          <p>
            Choisissez l'indicatif de pays du numéro de téléphone par défaut
            dans le menu déroulant. Le code pays sélectionné sera affiché par
            défaut dans la communauté.
          </p>
        </div>
      </div>
      <div className="w-full flex items-start pl-5 mt-4 mb-5 ">
        <button
          type="button"
          title="Enregistrer"
          className=" flex items-center justify-center bg-[#191919] text-white rounded-md h-[30px] p-5 text-[18px] "
          onClick={saveOtherSetting}
          disabled={startSending}
        >
          <span> Enregistrer</span> {startSending && <LoadingTotal />}
        </button>
      </div>
    </div>
  );
}
