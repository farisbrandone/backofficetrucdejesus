import { faker } from "@faker-js/faker";
import { format } from "date-fns";

export const membreData = [
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    motsDepasse: faker.word.words(2),
    sexe: faker.person.sex().charAt(0).toUpperCase(),
    phone: faker.phone.number({ style: "international" }),
    birthDay: format(faker.date.birthdate(), "dd-MM-yyyy"),
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
    id: "",
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    motsDepasse: faker.word.words(2),
    sexe: faker.person.sex().charAt(0).toUpperCase(),
    phone: faker.phone.number({ style: "international" }),
    birthDay: format(faker.date.birthdate(), "dd-MM-yyyy"),
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
    id: "",
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    motsDepasse: faker.word.words(2),
    sexe: faker.person.sex().charAt(0).toUpperCase(),
    phone: faker.phone.number({ style: "international" }),
    birthDay: format(faker.date.birthdate(), "dd-MM-yyyy"),
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
    id: "",
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    motsDepasse: faker.word.words(2),
    sexe: faker.person.sex().charAt(0).toUpperCase(),
    phone: faker.phone.number({ style: "international" }),
    birthDay: format(faker.date.birthdate(), "dd-MM-yyyy"),
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
    id: "",
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    motsDepasse: faker.word.words(2),
    sexe: faker.person.sex().charAt(0).toUpperCase(),
    phone: faker.phone.number({ style: "international" }),
    birthDay: format(faker.date.birthdate(), "dd-MM-yyyy"),
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
    id: "",
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    motsDepasse: faker.word.words(2),
    sexe: faker.person.sex().charAt(0).toUpperCase(),
    phone: faker.phone.number({ style: "international" }),
    birthDay: format(faker.date.birthdate(), "dd-MM-yyyy"),
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
    id: "",
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    motsDepasse: faker.word.words(2),
    sexe: faker.person.sex().charAt(0).toUpperCase(),
    phone: faker.phone.number({ style: "international" }),
    birthDay: format(faker.date.birthdate(), "dd-MM-yyyy"),
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
    id: "",
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    motsDepasse: faker.word.words(2),
    sexe: faker.person.sex().charAt(0).toUpperCase(),
    phone: faker.phone.number({ style: "international" }),
    birthDay: format(faker.date.birthdate(), "dd-MM-yyyy"),
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
    id: "",
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    motsDepasse: faker.word.words(2),
    sexe: faker.person.sex().charAt(0).toUpperCase(),
    phone: faker.phone.number({ style: "international" }),
    birthDay: format(faker.date.birthdate(), "dd-MM-yyyy"),
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
    id: "",
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    motsDepasse: faker.word.words(2),
    sexe: faker.person.sex().charAt(0).toUpperCase(),
    phone: faker.phone.number({ style: "international" }),
    birthDay: format(faker.date.birthdate(), "dd-MM-yyyy"),
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
    id: "",
  },
];
