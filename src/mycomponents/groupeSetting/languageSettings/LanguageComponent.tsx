import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import React, { useState } from "react";

type openStateType = {
  sign: boolean;
  chekout: boolean;
  manual: boolean;
  payment: boolean;
  orders: boolean;
  comm: boolean;
};

const initialOpenState: openStateType = {
  sign: false,
  chekout: false,
  manual: false,
  payment: false,
  orders: false,
  comm: false,
};

interface LanguageComponentType<A extends readonly string[]> {
  global: A;
  state: Record<A[number], string> | undefined;
  setState: React.Dispatch<
    React.SetStateAction<Record<A[number], string> | undefined>
  >;
  valueOpen: keyof openStateType;
  label: string;
}

export default function LanguageComponent<T extends readonly string[]>({
  global,
  label,
  state,
  setState,
  valueOpen,
}: LanguageComponentType<T>) {
  const [openState, setOpenState] = useState<openStateType>(initialOpenState);

  const handleOpenstate = (value: keyof typeof openState) => {
    setOpenState((prev) => {
      /*  console.log(prev[value]);
      prev[value] = !prev[value]; */
      return { ...prev, ...{ [`${value}`]: !prev[value] } };
    });
  };

  const handleSign = (
    e: React.ChangeEvent<HTMLInputElement>,
    val: T[number]
  ) => {
    e.preventDefault();

    setState((prev) => {
      if (prev) {
        prev[val] = e.target.value;
        return { ...prev };
      }
    });
  };

  return (
    <div className="text-[#7b809a] text-[16px] py-0 px-6   ">
      <div
        className={clsx(
          "flex items-center py-2 px-2 justify-between border-b-[1px] border-b-solid border-b-[#000]/40  cursor-pointer",
          { "mb-0": !openState[valueOpen] },
          { "mb-4": openState[valueOpen] }
        )}
        onClick={() => handleOpenstate(valueOpen)}
      >
        <p className="font-bold">{label}</p>
        {!openState[valueOpen] ? (
          <span className="icon-[fa-solid--plus] text-xl "></span>
        ) : (
          <span className="icon-[mdi--minus-thick]"></span>
        )}
      </div>
      <div
        className={clsx(
          "flex  flex-wrap items-center transition-all max-w-[950px] justify-between m-auto  ",
          { "max-h-0 overflow-hidden": !openState[valueOpen] }
          /*  { "max-h-[800px]": openState[valueOpen] } */
        )}
      >
        {global.map((value: T[number], index) => (
          <div className="flex flex-col gap-1 w-[380px] mb-5 " key={index}>
            <Label className="font-normal sm:text-[16px] "> {value} </Label>
            <Input
              onChange={(e) => handleSign(e, value)}
              value={state ? state[value] : ""}
              className="sm:text-[16px] border-[1px] border-solid border-[#000]/40 "
            />
          </div>
        ))}
      </div>
    </div>
  );
}
