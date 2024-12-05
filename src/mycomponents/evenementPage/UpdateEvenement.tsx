/* function UpdateEvenement() {
  return <div>UpdateEvenement</div>;
}

export default UpdateEvenement;
 */

/* import React from 'react'

function NewEvenementPage() {
  return (
    <div>NewEvenementPage</div>
  )
}

export default NewEvenementPage */

import { Fragment } from "react/jsx-runtime";
import { faker } from "@faker-js/faker";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ButtonUploadFile from "../ui/ButtonUploadFile";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { eventIcon } from "./EvenementPage";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "react-day-picker/style.css";
import {
  EventDataType,
  requestToGetAllUniversalDataWithId,
  requestToUpdateUniversalDataWithId,
} from "@/fakeData";
import UseselectGroupeInEvent from "./hook/UseselectGroupeInEvent";
import { Checkbox } from "@/components/ui/checkbox";
import LoadingTotal from "../ui/LoadingTotal";
import { useParams } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function UpdateEvenement() {
  const [titleEvent, setTitleEvent] = useState("");
  const [descriptionEvent, setDescriptionEvent] = useState("");
  const [locationOfEvent, setLocationOfEvent] = useState("");
  const [textCTAEvent, setTextCTAEvent] = useState("");
  const [urlOfEvent, setUrlOfEvent] = useState("");
  const [typeEvent, setTypeEvent] = useState("googleMeet");
  const [dateOfEvent, setDateOfEvent] = useState<Value>(new Date());
  const [status, setStatus] = useState("activate");
  const [imageUrlEvent, setImageUrlEvent] = useState("");
  const [stateDownload, setStateDownload] = useState(false);
  const [classTitle, setClassTitle] = useState(false);
  const [classDescription, setClassDescription] = useState(false);
  const [startSending, setStartSending] = useState(false);
  const [typeAccess, setTypeAccess] = useState("Public");
  const [loadingFail, setLoadingFail] = useState(false);
  const [dataEvent, setDataEvent] = useState<EventDataType>();
  const { toast } = useToast();
  const {
    groupeForEventSelect,
    setGroupeForEventSelect,
    loadinggroupeForEvent,
    totalgroupeForEvent,
    handleSelectGroupeEvent,
  } = UseselectGroupeInEvent();

  const { eventId } = useParams<string>();

  const handleTitleEvent = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitleEvent(() => e.target.value);
    setClassTitle(false);
  };
  const handleDescriptionEvent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setDescriptionEvent(() => e.target.value);
    setClassDescription(false);
  };

  const handleImageUrlEvent = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setImageUrlEvent(() => e.target.value);
  };

  const handleLocationOfEvent = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLocationOfEvent(() => e.target.value);
  };

  const handleTextCTAEvent = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTextCTAEvent(() => e.target.value);
  };

  const handleUrlOfEvent = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUrlOfEvent(() => e.target.value);
  };

  const handleTypeEvent = (value: string) => {
    setTypeEvent(() => value);
  };

  const handleChangeStatus = () => {
    if (status === "activate") {
      setStatus("desactivate");
      return;
    }
    setStatus("activate");
  };

  const handleChangeRadioEvent = (val: string) => {
    setTypeAccess(() => val);
  };

  const updateEventWithId = async () => {
    const dateString = dateOfEvent?.toString() as string;
    setStartSending(() => true);
    if (!titleEvent || !descriptionEvent) {
      if (!titleEvent) {
        setClassTitle(true);
      }
      if (!descriptionEvent) {
        setClassDescription(true);
      }
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Tous les champs requis n'ont pas été remplis",
      });
      setStartSending(() => false);
      return;
    }
    try {
      if (!eventId) {
        return;
      }
      var data: EventDataType = {
        titleEvent: titleEvent,
        descriptionEvent: descriptionEvent,
        imageUrlEvent: imageUrlEvent,
        typeAccess: typeAccess,
        status: status,
        dateOfEvent: dateString,
        typeEvent: typeEvent,
        urlOfEvent: urlOfEvent,
        textCTAEvent: textCTAEvent,
        locationOfEvent: locationOfEvent,
        groupeForEventSelect: groupeForEventSelect,
        communityId: dataEvent?.communityId as string,
        id: eventId,
      };
      const result = await requestToUpdateUniversalDataWithId<EventDataType>(
        eventId,
        "EventData",
        data
      );

      if (result.success) {
        toast({
          title: "Success",
          description: "L'événement a été mis à jour avec success",
        });
        setStartSending(() => false);
        window.location.replace(`/EVENEMENTS/${dataEvent?.communityId}`);
        return;
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue cotée serveur",
        });
        setStartSending(() => false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description:
          "Une erreur est survenue pendant la mise à jour de l'événement, vérifier votre connexion",
      });
      setStartSending(() => false);
    }
  };

  useEffect(() => {
    async function getEventDataForUpdateWithId() {
      try {
        const data = await requestToGetAllUniversalDataWithId<EventDataType>(
          eventId as string,
          "EventData"
        );
        setDataEvent(data);
        setTitleEvent(data.titleEvent);
        setDescriptionEvent(data.descriptionEvent);
        setLocationOfEvent(data.locationOfEvent);
        setTextCTAEvent(data.textCTAEvent);
        setUrlOfEvent(data.urlOfEvent);
        setTypeEvent(data.typeEvent);
        setDateOfEvent(new Date(data.dateOfEvent));
        setStatus(data.status);
        setImageUrlEvent(data.imageUrlEvent);
        setTypeAccess(data.typeAccess);
        setGroupeForEventSelect(data.groupeForEventSelect);
      } catch (error) {
        setLoadingFail(true);
      }
    }
    getEventDataForUpdateWithId();
  }, []);

  if ((!descriptionEvent || !titleEvent) && !loadingFail) {
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
      {/* <HeaderForAllBackOffice /> */}
      <div className="w-full flex flex-col gap-6 max-[840px]:w-full min-[840px]:flex-row min-[840px]:items-center min-[840px]:justify-between mt-10">
        <div className="flex gap-3 ">
          <div className="titleAcceuil">
            <div className=" flex items-center gap-2 text-[#e91e63] mt-3">
              {eventIcon("30", "30")}
              <h1 className=" text-[#344767] font-bold text-[18px] ">
                Créer un événement
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
            <option selected>{faker.word.words(2)}</option>
          </select>
        </div>
      </div>

      <Card className="">
        <CardHeader>
          <CardTitle className="text-[12px] sm:text-[18px]">
            Création d'un événement
          </CardTitle>
          <CardDescription>
            Remplir les champs suivants et créer un nouveau événement
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-[16px] sm:text-[18px] flex flex-col gap-3">
          {loadinggroupeForEvent ? (
            <LoadingTotal />
          ) : (
            <div
              className="space-y-1 w-[350px] h-[250px] rounded-xl shadow-2xl bg-[#e91e63] text-white overflow-y-scroll flex flex-col items-center gap-3
"
            >
              <p className="text-[18px] text-center">
                Selectionner les groupes associés à cet événement
              </p>
              <div className="flex flex-col items-center gap-2">
                {totalgroupeForEvent.length &&
                  totalgroupeForEvent?.map((value, index) => (
                    <div className="flex items-center space-x-2" key={index}>
                      <Checkbox
                        id="terms"
                        onCheckedChange={() =>
                          handleSelectGroupeEvent(
                            value.groupeId,
                            value.titleGroupe
                          )
                        }
                        checked={
                          !!groupeForEventSelect.find(
                            (val) => val.groupeId === value.groupeId
                          )
                        }
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {value.titleGroupe}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div className="space-y-1">
            <Label htmlFor="titleEvent">
              Nom de l'événement <span className="text-[#e91e63] ">*</span>{" "}
            </Label>
            <Input
              id="titleEvent"
              name="titleEvent"
              value={titleEvent}
              placeholder="Entrer le nom de l'événement"
              onChange={handleTitleEvent}
              className={`${classTitle ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="descriptionEvent">
              Description de l'événement{" "}
              <span className="text-[#e91e63]">*</span>
            </Label>
            <Textarea
              id="descriptionEvent"
              name="descriptionEvent"
              value={descriptionEvent}
              placeholder="Entrer une descriptionEvent de l'événement"
              onChange={handleDescriptionEvent}
              required
              className={`${classDescription ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="locationOfEvent">
              Entrer le lieu de l'évènement{" "}
              <span className="text-[#e91e63] ">*</span>{" "}
            </Label>
            <Input
              id="locationOfEvent"
              name="locationOfEvent"
              value={locationOfEvent}
              placeholder="Entrer le nom de l'événement"
              onChange={handleLocationOfEvent}
              className={`${classTitle ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="textCTAEvent">
              Entrer le text CTA <span className="text-[#e91e63] ">*</span>{" "}
            </Label>
            <Input
              id="textCTAEvent"
              name="textCTAEvent"
              value={textCTAEvent}
              placeholder="Entrer le text CTA"
              onChange={handleTextCTAEvent}
              className={`${classTitle ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>

          <Select
            value={typeEvent}
            onValueChange={(value: string) => handleTypeEvent(value)}
            disabled={startSending}
          >
            <p className="text-[14px] ">Sélectionner le type d'évènement</p>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sélectionner le type d'évènement" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sélectionner le type d'évènement</SelectLabel>
                <SelectItem value="webinar">Webinar</SelectItem>
                <SelectItem value="googleMeet">Google Meet</SelectItem>
                <SelectItem value="zoom">Zoom</SelectItem>
                <SelectItem value="liveEvent">Live Event</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="space-y-1">
            <Label htmlFor="urlOfEvent">
              Entrer l'url de l'évènement {typeEvent}{" "}
              <span className="text-[#e91e63] ">*</span>{" "}
            </Label>
            <Input
              id="urlOfEvent"
              name="urlOfEvent"
              value={urlOfEvent}
              placeholder={`Entrer l'url de l'événement ${typeEvent}`}
              onChange={handleUrlOfEvent}
              className={`${classTitle ? "border-red-600" : ""}`}
              disabled={startSending}
            />
          </div>

          <div>
            <p className="mb-2">Entrer l'heure et la date de l'événement</p>
            <DateTimePicker onChange={setDateOfEvent} value={dateOfEvent} />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[16px] font-semibold ">Type d'access</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="option1"
                  name="typeAccess"
                  value="Public"
                  checked={typeAccess === "Public"}
                  onClick={() => handleChangeRadioEvent("Public")}
                  className=" "
                />
                <label htmlFor="option1" className="">
                  Public
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="option2"
                  name="typeAccess"
                  value="Privée"
                  checked={typeAccess === "Privée"}
                  onClick={() => handleChangeRadioEvent("Privée")}
                  className="   "
                />
                <label htmlFor="option2" className="">
                  Privée
                </label>
              </div>
            </div>
          </div>
          <div className="felx flex-col items-center mt-3">
            <input
              type="checkbox"
              id="statusId"
              value={status}
              checked={status === "activate"}
              onChange={handleChangeStatus}
            />
            <label
              htmlFor="statusId"
              className="ml-2 text-[16px] font-semibold"
            >
              Activé l'événement
            </label>
          </div>
          <div className="space-y-1 " key="button2">
            <Label htmlFor="imageUrlEvent">
              Entrer Une image associé à l'évènement {" (optionnel)"}
            </Label>
            <div className="flex items-center gap-2" key="button21">
              <Input
                key="button21"
                id="imageUrlEvent"
                name="imageUrlEvent"
                value={imageUrlEvent}
                placeholder="Entrer une image représentant l'événement"
                onChange={handleImageUrlEvent}
                disabled={stateDownload || startSending}
              />
              <ButtonUploadFile
                name="file2"
                valueForHtml="drop-zone-2"
                key="button211"
                setImageUrl={setImageUrlEvent}
                setStateDownloadProps={setStateDownload}
                stateDownloadProps={stateDownload}
              />
            </div>
          </div>
        </CardContent>
        {startSending && (
          <div>Patienter l'action est en cours d'éxécution...</div>
        )}
        <CardFooter className="flex items-center gap-3">
          <Button
            disabled={stateDownload || startSending}
            onClick={updateEventWithId}
          >
            Mettre à jour l'événement
          </Button>
          <Button
            disabled={stateDownload || startSending}
            className="p-0 flex items-center justify-center bg-[#e91e63] hover:bg-[#e91e62e0]"
          >
            <NavLink
              to="/EVENEMENTS"
              className="w-full h-full flex items-center justify-center p-2"
            >
              Retour à la page événement
            </NavLink>
          </Button>
        </CardFooter>
      </Card>
    </Fragment>
  );
}

export default UpdateEvenement;
