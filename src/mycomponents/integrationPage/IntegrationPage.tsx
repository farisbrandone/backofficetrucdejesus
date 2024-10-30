import { Fragment } from "react";
import HeaderForAllBackOffice from "../ui/HeaderForAllBackOffice";
import PaymentComponent from "../ui/PaymentComponent";
import { FooterBackoffice } from "../acceuilPage/FooterBackoffice";

export const integrationIcon = (width: string, height: string) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    className="lucide lucide-settings"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
export const dollarIcon = (width: string, heigth: string) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={heigth}
    viewBox="0 0 24 24"
  >
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      d="M17 5h-5m0 0H9.5a3.5 3.5 0 1 0 0 7H12m0-7V3m0 2v7m0 0h2.5a3.5 3.5 0 1 1 0 7H12m0-7v7m0 0H6m6 0v2"
    />
  </svg>
);
export const emailIcon = (width: string, heigth: string) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={heigth}
    viewBox="0 0 432 384"
  >
    <path
      fill="currentColor"
      d="M384 21q18 0 30.5 12.5T427 64v256q0 18-12.5 30.5T384 363H43q-18 0-30.5-12.5T0 320V64q0-18 12.5-30.5T43 21zm0 86V64L213 171L43 64v43l170 106z"
    />
  </svg>
);

export const cameraIcon = (width: string, heigth: string) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={heigth}
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11z"
    />
  </svg>
);

export const typePayment = [
  { typePayment: "PAYPAL", imgage: "./paypal.png" },
  { typePayment: "STRIPE", imgage: "./stripe.png" },
  { typePayment: "RAZORPAY", imgage: "./Razorpay.jpg" },
  { typePayment: "FLUTTERWAVE", imgage: "./flutterWave.png" },
  { typePayment: "VISA-MASTERCARD-BANK", imgage: "./visamastercard.png" },
];

function IntegrationPage() {
  return (
    <div className="flex flex-col px-3">
      <HeaderForAllBackOffice />
      <div className="w-full flex flex-col gap-4 max-[840px]:w-full min-[840px]:flex-row min-[840px]:items-center min-[840px]:justify-between mt-10">
        <div className="flex gap-3 ">
          <div className="titleAcceuil">
            <div className=" flex items-center gap-2 text-[#e91e63] mt-3">
              {integrationIcon("25", "25")}
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                INTEGRATIONS
              </h1>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <p className="align-middle self-center">Communauté</p>
          <select
            title="Select element"
            id="countries"
            className=" w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Un Truc de Jesus!</option>
          </select>
        </div>
      </div>
      <div className="flex gap-2 w-full mt-8">
        <div className="flex items-center gap-2 px-5 py-3 rounded-lg shadow-xl cursor-pointer">
          <div className="text-[#e91e63]"> {dollarIcon("25", "25")} </div>
          <p className="text-[#e91e63] text-[14px] ">Integration du payement</p>
        </div>
        <div className="flex items-center gap-2 px-5 py-3 rounded-lg shadow-xl cursor-pointer">
          <div className="text-[#000]"> {emailIcon("25", "25")} </div>
          <p className="text-[#000] text-[14px] ">Integration auto répondant</p>
        </div>
        <div className="flex items-center gap-2 px-5 py-3 rounded-lg shadow-xl cursor-pointer">
          <div className="text-[#000]"> {cameraIcon("25", "25")} </div>
          <p className="text-[#000] text-[14px] ">Integration de webinaire</p>
        </div>
        <div className="flex items-center gap-2 px-5 py-3 rounded-lg shadow-xl cursor-pointer">
          <div className="text-[#000]"> {integrationIcon("25", "25")} </div>
          <p className="text-[#000] text-[14px] ">Autres intégrations</p>
        </div>
      </div>

      <div className="flex gap-3 mt-3 flex-wrap">
        {typePayment.map((value, index) => (
          <Fragment key={index}>
            <PaymentComponent type={value.typePayment} image={value.imgage} />
          </Fragment>
        ))}
      </div>
      <FooterBackoffice />
    </div>
  );
}

export default IntegrationPage;
