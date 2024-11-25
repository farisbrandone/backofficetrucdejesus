import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DataIntegrationType } from "../integrationPage/data";

function PaymentComponent({ data }: { data: DataIntegrationType }) {
  const [connectState, setConnectState] = useState(false);
  const [openState, setOpenState] = useState(false);

  const handleConnectState = () => {
    setOpenState(true);
    setConnectState((prev) => !prev);
  };

  return (
    <div className="relative w-[250px] h-[250px] flex flex-col items-center gap-3 px-4 shadow-2xl rounded-xl border-[2px] ">
      {openState && data.keyAndSecret && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#000]/30 flex items-center justify-center z-10 ">
          <div className="bg-[#fff] w-[700px] h-[500px] p-0 rounded-xl ">
            <div className="bg-[#e91e63] w-full rounded-t-xl p-2 flex items-center justify-between mb-4">
              <p className="text-white font-bold">{data.nom}</p>
              <span
                className="icon-[fontisto--close] cursor-pointer"
                onClick={() => setOpenState(false)}
              ></span>
            </div>
            <div className="flex flex-col px-5  ">
              <div className="flex flex-col gap-1 mt-5">
                <label htmlFor="key">
                  Key <span className="text-[#e91e63] ">*</span>
                </label>
                <input
                  type="text"
                  placeholder={`your ${data.nom} key`}
                  className="p-1 px-2 border-[1px] border-solid border-[#000]/40 focus:outline-none focus:border-[#e91e63] rounded-md "
                />
              </div>
              <div className="flex flex-col gap-1 mt-3">
                <label htmlFor="key">
                  Secret <span className="text-[#e91e63] ">*</span>
                </label>
                <input
                  type="text"
                  placeholder={`your ${data.nom} secret`}
                  className="p-1 px-2 border-[1px] border-solid border-[#000]/40 focus:outline-none focus:border-[#e91e63] rounded-md "
                />
              </div>

              <button
                type="button"
                title="Enregistrer"
                className="flex items-center gap-2 mt-4 bg-[#191919] text-white hover:bg-[#e91e63] w-[120px] p-1 px-2 rounded-md "
              >
                <span className="icon-[fa-solid--save] "></span>
                <p>Enregistrer</p>
              </button>
            </div>
          </div>
        </div>
      )}

      <img
        src={data.image}
        alt={data.nom}
        width={120}
        height={120}
        className="object-cover shadow-lg mt-3 w-[80px] h-[80px] "
      />
      <div className="absolute bottom-11 left-0  w-full text-center flex flex-col gap-[2px] text-[#191919] py-3 ">
        <p>{data.nom}</p>
        <p className="text-[12px] "> {data.description}</p>
      </div>

      <Button
        className={`${
          connectState
            ? "bg-[#e91e63] translate-x-[calc(50%+9px)] hover:bg-[#e91e62b2]"
            : "bg-[#191919] translate-x-[calc(50%-6px)] hover:bg-[#191919be]"
        }  text-white px-4 py-3 text-[16px] absolute bottom-2 left-0  `}
        onClick={handleConnectState}
      >
        {connectState ? "Connecté" : "Se Connecter"}
      </Button>
    </div>
  );
}

export default PaymentComponent;
