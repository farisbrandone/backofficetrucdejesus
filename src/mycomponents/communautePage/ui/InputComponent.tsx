import React, { ChangeEvent } from "react";

export function InputComponent({
  startSending,
  label,
  inputValue,
  setInputValue,
}: {
  startSending: boolean;
  label: string;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor="BodyColor">{label}</label>
      <div className="relative w-full">
        <input
          type="text"
          id="BodyColor"
          value={inputValue}
          onChange={handleInputValue}
          className="inputStyle rounded-md h-42px w-full"
          disabled={startSending}
        />
        <div
          className="absolute w-[38px] top-[2px] bottom-[2px] right-[2px] border-[1px] border-solid border-[#000]/50"
          style={{ backgroundColor: inputValue }}
        ></div>
      </div>
    </div>
  );
}
