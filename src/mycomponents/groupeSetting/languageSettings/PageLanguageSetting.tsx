import { useEffect, useState } from "react";
import { myData as data } from "./data";
import HeaderForAllBackOffice from "@/mycomponents/ui/HeaderForAllBackOffice";
import { NavLink, useParams } from "react-router-dom";

import LanguageComponent from "./LanguageComponent";
import { Button } from "@/components/ui/button";
import {
  requestTogetAllUniversalData,
  requestToSetUniversalData,
  requestToUpdateUniversalDataWithId,
} from "@/fakeData";
import { toast } from "@/hooks/use-toast";

const SignInAndRegisterPage = data[0]["Sign In & Register Page"];
const Community = data[1]["Community"];
const CheckoutPage = data[2]["Checkout Page"];
const ManualPayment = data[3]["Manual Payment"];
const PaymentPage = data[4]["Payment Page"];
const MyOrders = data[5]["My Orders"];

type T = (typeof SignInAndRegisterPage)[number];
type CO = (typeof Community)[number];
type CH = (typeof CheckoutPage)[number];
type MA = (typeof ManualPayment)[number];
type PA = (typeof PaymentPage)[number];
type OR = (typeof MyOrders)[number];

export type LanguageSettingDataType = {
  "Sign In & Register Page": Record<T, string>;
  Community: Record<CO, string>;
  "Checkout Page": Record<CH, string>;
  "Manual Payment": Record<MA, string>;
  "Payment Page": Record<PA, string>;
  "My Orders": Record<OR, string>;
  communityId?: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
};

function PageLanguageSetting() {
  const { communityId } = useParams<string>();
  const [signInState, setSignInState] = useState<Record<T, string>>();
  const [communityState, setCommunityState] = useState<Record<CO, string>>();
  const [checkoutPageState, setCheckoutPageState] =
    useState<Record<CH, string>>();
  const [manualPaymentState, setManualPaymentState] =
    useState<Record<MA, string>>();
  const [paymentPage, setPaymentPageState] = useState<Record<PA, string>>();
  const [myOrders, setMyOrdersState] = useState<Record<OR, string>>();
  const [loadingFail, setLoadingFail] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [startSending, setStartSending] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState<LanguageSettingDataType>();

  console.log(startSending);
  const handleSubmit = async () => {
    if (
      !signInState ||
      !communityState ||
      !checkoutPageState ||
      !manualPaymentState ||
      !paymentPage ||
      !myOrders
    ) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "tous les champ ne sont pas remplis",
      });
      return;
    }

    const data = {
      "Sign In & Register Page": signInState,
      Community: communityState,
      "Checkout Page": checkoutPageState,
      "Manual Payment": manualPaymentState,
      "Payment Page": paymentPage,
      "My Orders": myOrders,
      communityId: communityId,
    };

    if (alreadyExist) {
      try {
        const result =
          await requestToUpdateUniversalDataWithId<LanguageSettingDataType>(
            alreadyExist.id as string,
            "LanguageSettingData",
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
    const resultAll = await requestToSetUniversalData<LanguageSettingDataType>(
      "LanguageSettingData",
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
          await requestTogetAllUniversalData<LanguageSettingDataType>(
            "OtherSettingData"
          )
        ).filter((value) => value.communityId === communityId);
        setLoadingData(false);
        if (result.length > 0) {
          setAlreadyExist({ ...result[0] });
          setSignInState(result[0]["Sign In & Register Page"]);
          setCommunityState(result[0].Community);
          setCheckoutPageState(result[0]["Checkout Page"]);
          setManualPaymentState(result[0]["Manual Payment"]);
          setPaymentPageState(result[0]["Payment Page"]);
          setMyOrdersState(result[0]["My Orders"]);

          return;
        }
      } catch (error) {
        setLoadingFail(false);
      }
    };
    getAllData();
  }, []);

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
    <div>
      <HeaderForAllBackOffice />
      <div className="w-full flex flex-col gap-4 max-[840px]:w-full min-[840px]:flex-row min-[840px]:items-center min-[840px]:justify-between mt-10 mb-5 pl-2 ">
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
      <LanguageComponent
        global={SignInAndRegisterPage}
        state={signInState}
        setState={setSignInState}
        valueOpen="sign"
        label="Sign In & Register Page"
      />
      <LanguageComponent
        global={Community}
        state={communityState}
        setState={setCommunityState}
        valueOpen="comm"
        label="Community"
      />
      <LanguageComponent
        global={CheckoutPage}
        state={checkoutPageState}
        setState={setCheckoutPageState}
        valueOpen="chekout"
        label="Checkout Page"
      />
      <LanguageComponent
        global={ManualPayment}
        state={manualPaymentState}
        setState={setManualPaymentState}
        valueOpen="manual"
        label="Manual Payment"
      />
      <LanguageComponent
        global={PaymentPage}
        state={paymentPage}
        setState={setPaymentPageState}
        valueOpen="payment"
        label="Payment Page"
      />
      <LanguageComponent
        global={MyOrders}
        state={myOrders}
        setState={setMyOrdersState}
        valueOpen="orders"
        label="My Orders"
      />

      <div className="w-full pl-4 mt-4">
        <Button onClick={handleSubmit}> Enregistrer </Button>
      </div>
    </div>
  );
}

export default PageLanguageSetting;
