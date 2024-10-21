import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PaymentComponentType {
  type: string;
  image: string;
}

function PaymentComponent({ type, image }: PaymentComponentType) {
  const [connectState, setConnectState] = useState(false);

  const handleConnectState = () => {
    setConnectState((prev) => !prev);
  };

  return (
    <div className="relative w-[250px] h-[250px] flex flex-col items-center gap-3 px-4 shadow-2xl rounded-xl border-[2px] ">
      <img
        src={image}
        alt={type}
        width={120}
        height={120}
        className="object-cover shadow-lg mt-3"
      />
      <div className="absolute bottom-11 left-0  w-full text-center text-[#191919] py-3 ">
        {type}
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
