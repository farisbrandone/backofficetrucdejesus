import { Avatar } from "@/components/ui/avatar";
import { useState } from "react";
import { eyeCloseIcon, eyeOpenIcon } from "../clientGererPage/ClientGerer";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { faker } from "@faker-js/faker";

export interface UserDataType {
  name: string;
  email: string;
  motsDepasse: string;
  dateCreation: string;
  dateMiseAJour: string;
  status: boolean;
  image: string;
}

export interface UserDataComponentType {
  value: UserDataType;
  index: number;
}

function UserDataComponent({ value, index }: UserDataComponentType) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="w-full grid grid-cols-7  mb-2">
      <div className="avatarNameEmail flex items-center ml-3 ">
        <div>
          <Avatar
            className={` ${
              (index + 1) % 2 === 0
                ? "bg-[#191919] text-white "
                : "bg-[#e91e63] text-white"
            } text-[20px] flex items-center justify-center `}
          >
            {value.name.charAt(0).toUpperCase()}
          </Avatar>
        </div>
        <div className="flex flex-col px-2">
          <p className="text-[14px] "> {value.name.split(" ")[0]} </p>
          <p className="text-[10px] "> {value.email} </p>
        </div>
      </div>
      <div className="place-content-center mx-auto">
        <img src={value.image} alt="" className="object-cover " />
      </div>
      <div className="place-content-center mx-auto ">
        <input
          type={!isPasswordVisible ? "password" : "text"}
          title="enter password"
          value={value.motsDepasse}
          className="outline-none w-[50px] "
        />
        <button onClick={togglePasswordVisibility} className="pl-2">
          {isPasswordVisible
            ? eyeOpenIcon("15", "15")
            : eyeCloseIcon("15", "15")}
        </button>
      </div>
      <div className=" place-content-center mx-auto">{value.dateCreation}</div>
      <div className="place-content-center mx-auto ">{value.dateMiseAJour}</div>
      <div className="place-content-center mx-auto">
        <Switch id="airplane-mode" />
      </div>
      <div className=" place-content-center mx-auto ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center justify-center"
            >
              ...
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-[#191919] text-white">
            <DropdownMenuGroup>
              <DropdownMenuItem>{faker.word.words(2)}</DropdownMenuItem>
              <DropdownMenuItem>{faker.word.words(2)}</DropdownMenuItem>
              <DropdownMenuItem>{faker.word.words(2)}</DropdownMenuItem>
              <DropdownMenuItem>{faker.word.words(2)}</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default UserDataComponent;
