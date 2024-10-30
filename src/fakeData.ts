//import { faker } from "@faker-js/faker";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  getCountFromServer,
  orderBy,
  query,
  limit,
  QueryDocumentSnapshot,
  DocumentData,
  startAfter,
  endBefore,
  startAt,
  /* where, */
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { communityDataType } from "./mycomponents/communautePage/UpdateCommunaute";
import { format } from "date-fns";
import { stateGroupeEvent } from "./mycomponents/evenementPage/hook/UseselectGroupeInEvent";
import { MemberDataType } from "./mycomponents/membreGererPage/MemberDataComponent";
export interface User {
  iconUrl: string;
  title: string;
  body: string;
  date: string;
  id: string;
  actionUrl: string;
}

export interface GroupeDataType {
  titleGroupe: string;
  descriptionGroupe: string;
  typeAccess: string;
  date: string;
  id: string;
  banniereUrlGroupe: string;
  logoUrlGroupe: string;
  status: string;
}

export interface ClientDataType {
  nomClient: string;
  emailClient: string;
  passwordClient: string;
  logoClient: string;
  dateCreated: string;
  dateUpdated: string;
  statusClient: string;
  id: string;
}

/* export function createRandomUser(): User {
  return {
    profile: faker.image.avatar(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
  };
} 
  
*/

export async function seedData(): Promise<User[]> {
  let notifications: User[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, "Notifications"));
    console.log({ length: querySnapshot.docs.length });
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const { title, body, iconUrl, actionUrl, date } = doc.data();
      notifications.push({ id, iconUrl, title, body, actionUrl, date });
    });
    console.log({ drdr_drdr: notifications[0].id });
    return notifications;
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestTogetAllGroupeData(): Promise<GroupeDataType[]> {
  let groupeData: GroupeDataType[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, "GroupeData"));
    console.log({ length: querySnapshot.docs.length });
    if (querySnapshot.docs.length !== 0) {
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const {
          titleGroupe,
          descriptionGroupe,
          logoUrlGroupe,
          banniereUrlGroupe,
          typeAccess,
          status,
          date,
        } = doc.data();
        groupeData.push({
          id,
          titleGroupe,
          descriptionGroupe,
          logoUrlGroupe,
          banniereUrlGroupe,
          typeAccess,
          date,
          status,
        });
      });
      console.log({ drdr_drdr: groupeData[0].id });
      return groupeData;
    }

    return [];
  } catch (error) {
    console.log({ error: error });
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}
export async function requestToSetGroupeData({
  titleGroupe,
  descriptionGroupe,
  logoUrlGroupe,
  banniereUrlGroupe,
  typeAccess,
  status,
}: GroupeDataType) {
  try {
    const NotifRef = collection(db, "GroupeData");
    const date = format(Date.now(), "'le ' dd/MM/yyyy' à ' kk:mm");
    await setDoc(doc(NotifRef), {
      titleGroupe,
      descriptionGroupe,
      logoUrlGroupe,
      banniereUrlGroupe,
      typeAccess,
      date,
      status,
    });
    return { message: "Le groupe a été créer avec success", success: true };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestToUpdateGroupeData(
  singleGroupeData: GroupeDataType
) {
  const GroupeDataRef = collection(db, "GroupeData");
  const date = format(Date.now(), "'le ' dd/MM/yyyy' à ' kk:mm");
  try {
    const {
      titleGroupe,
      descriptionGroupe,
      typeAccess,
      id,
      banniereUrlGroupe,
      logoUrlGroupe,
      status,
    } = singleGroupeData;
    await updateDoc(doc(GroupeDataRef, id), {
      titleGroupe,
      descriptionGroupe,
      typeAccess,
      date,
      banniereUrlGroupe,
      logoUrlGroupe,
      status,
    });
    return { message: "La donnée a été envoyé avec success", success: true };
  } catch (error) {
    return {
      message: "Un problème est survenu pendant l'envoie des données",
      success: false,
    };
  }
}

export async function requestToChangeStatus(
  id: string,
  status: string,
  database: string
) {
  console.log({ status });
  const GroupeDataRef = collection(db, database);
  const date = format(Date.now(), "'le ' dd/MM/yyyy' à ' kk:mm");
  try {
    await updateDoc(doc(GroupeDataRef, id), {
      status,
      date,
    });
    return {
      message: "Le Status a été mis à jour avec success",
      success: true,
    };
  } catch (error) {
    return {
      message: "Un problème est survenu pendant l'envoie des données",
      success: false,
    };
  }
}

export async function requestToGetGroupDataWithId(
  groupeId: string
): Promise<GroupeDataType> {
  try {
    const docRef = doc(db, "GroupeData", groupeId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const {
        id,
        titleGroupe,
        descriptionGroupe,
        typeAccess,
        banniereUrlGroupe,
        logoUrlGroupe,
        date,
        status,
      } = docSnap.data();
      return {
        id,
        titleGroupe,
        descriptionGroupe,
        typeAccess,
        banniereUrlGroupe,
        logoUrlGroupe,
        date,
        status,
      };
    } else {
      throw new Error("Le document n'existe pas");
    }
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestToDeleteGroupeWithId(dataId: string) {
  const docRef = doc(db, "GroupeData", dataId);
  try {
    await deleteDoc(docRef);
    return {
      message: "le document à été supprimer avec success",
      success: true,
    };
  } catch (error) {
    return {
      message: "Un problème est survenu pendant la suppression",
      success: false,
    };
  }
}

export async function seedDataWithId(dataId: string): Promise<User> {
  try {
    const docRef = doc(db, "Notifications", dataId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const { id, title, body, iconUrl, actionUrl, date } = docSnap.data();
      return { id, title, body, iconUrl, actionUrl, date };
    } else {
      throw new Error("Le document n'existe pas");
    }
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}
export async function seedCommunityDataWithId(): Promise<communityDataType> {
  try {
    const docRef = doc(db, "CommunityData", "RH7E1UQKdNJ42iBtAOku");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const id = docSnap.id;
      console.log("Document data:", docSnap.data());
      const { title, description, logoUrl, banniereUrl } = docSnap.data();
      return { id, title, description, logoUrl, banniereUrl };
    } else {
      throw new Error("Le document n'existe pas");
    }
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function setDataWithId(singleData: User) {
  const NotifRef = collection(db, "Notifications");
  try {
    const { id, title, body, iconUrl, actionUrl, date } = singleData;
    await setDoc(doc(NotifRef, id), {
      title,
      body,
      iconUrl,
      actionUrl,
      date,
    });
    return { message: "La donnée a été envoyé avec success", success: true };
  } catch (error) {
    return {
      message: "Un problème est survenu pendant l'envoie des données",
      success: false,
    };
  }
}

export async function deleteDataWithId(dataId: string) {
  const docRef = doc(db, "Notifications", dataId);
  try {
    await deleteDoc(docRef);
    return {
      message: "le document à été supprimer avec success",
      success: true,
    };
  } catch (error) {
    return {
      message: "Un problème est survenu pendant la suppression",
      success: false,
    };
  }
}

//export const USERS = [...notifications]

/*export const USERS = faker.helpers.multiple(createRandomUser, {
  count: 30,
});*/

export interface EventDataType {
  titleEvent: string;
  descriptionEvent: string;
  imageUrlEvent: string;
  typeAccess: string;
  status: string;
  dateOfEvent: string;
  typeEvent: string;
  urlOfEvent: string;
  textCTAEvent: string;
  locationOfEvent: string;
  groupeForEventSelect: stateGroupeEvent[];
  date: string;
  id: string;
}

export async function requestToSetEventData({
  titleEvent,
  descriptionEvent,
  imageUrlEvent,
  typeAccess,
  status,
  dateOfEvent,
  typeEvent,
  urlOfEvent,
  textCTAEvent,
  locationOfEvent,
  groupeForEventSelect,
}: EventDataType) {
  try {
    const NotifRef = collection(db, "EventData");
    const date = format(Date.now(), "'le ' dd/MM/yyyy' à ' kk:mm");
    await setDoc(doc(NotifRef), {
      titleEvent,
      descriptionEvent,
      imageUrlEvent,
      typeAccess,
      status,
      dateOfEvent,
      typeEvent,
      urlOfEvent,
      textCTAEvent,
      locationOfEvent,
      groupeForEventSelect,
      date,
    });
    return { message: "Le groupe a été créer avec success", success: true };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestToGetEventDataWithId(
  groupeId: string
): Promise<EventDataType> {
  try {
    console.log({ groupeId });
    const docRef = doc(db, "EventData", groupeId);
    const docSnap = await getDoc(docRef);
    console.log("bounga1");
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const {
        id,
        titleEvent,
        descriptionEvent,
        imageUrlEvent,
        typeAccess,
        status,
        dateOfEvent,
        typeEvent,
        urlOfEvent,
        textCTAEvent,
        locationOfEvent,
        groupeForEventSelect,
        date,
      } = docSnap.data();
      return {
        id,
        titleEvent,
        descriptionEvent,
        imageUrlEvent,
        typeAccess,
        status,
        dateOfEvent,
        typeEvent,
        urlOfEvent,
        textCTAEvent,
        locationOfEvent,
        groupeForEventSelect,
        date,
      };
    } else {
      throw new Error("Le document n'existe pas");
    }
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestToSetEventDataWithId({
  titleEvent,
  descriptionEvent,
  imageUrlEvent,
  typeAccess,
  status,
  dateOfEvent,
  typeEvent,
  urlOfEvent,
  textCTAEvent,
  locationOfEvent,
  groupeForEventSelect,
  id,
}: EventDataType) {
  try {
    const NotifRef = collection(db, "EventData");
    const date = format(Date.now(), "'le ' dd/MM/yyyy' à ' kk:mm");
    await setDoc(doc(NotifRef, id), {
      titleEvent,
      descriptionEvent,
      imageUrlEvent,
      typeAccess,
      status,
      dateOfEvent,
      typeEvent,
      urlOfEvent,
      textCTAEvent,
      locationOfEvent,
      groupeForEventSelect,
      date,
    });
    return { message: "Le groupe a été créer avec success", success: true };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestTogetAllEventData(): Promise<EventDataType[]> {
  let groupeData: EventDataType[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, "EventData"));
    console.log({ length: querySnapshot.docs.length });
    if (querySnapshot.docs.length !== 0) {
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const {
          titleEvent,
          descriptionEvent,
          imageUrlEvent,
          typeAccess,
          status,
          dateOfEvent,
          typeEvent,
          urlOfEvent,
          textCTAEvent,
          locationOfEvent,
          groupeForEventSelect,
          date,
        } = doc.data();
        groupeData.push({
          id,
          titleEvent,
          descriptionEvent,
          imageUrlEvent,
          typeAccess,
          status,
          dateOfEvent,
          typeEvent,
          urlOfEvent,
          textCTAEvent,
          locationOfEvent,
          groupeForEventSelect,
          date,
        });
      });
      console.log({ drdr_drdr: groupeData[0].id });
      return groupeData;
    }

    return [];
  } catch (error) {
    console.log({ error: error });
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestToDeleteEventWithId(dataId: string) {
  const docRef = doc(db, "EventData", dataId);
  try {
    await deleteDoc(docRef);
    return {
      message: "le document à été supprimer avec success",
      success: true,
    };
  } catch (error) {
    return {
      message: "Un problème est survenu pendant la suppression",
      success: false,
    };
  }
}

export async function requestToSetClientData({
  nomClient,
  emailClient,
  passwordClient,
  logoClient,
}: ClientDataType) {
  try {
    const NotifRef = collection(db, "ClientData");
    const dateCreated = format(Date.now(), "'le ' dd/MM/yyyy' à ' kk:mm");

    const dateUpdated = format(Date.now(), "'le ' dd/MM/yyyy' à ' kk:mm");
    await setDoc(doc(NotifRef), {
      nomClient,
      emailClient,
      passwordClient,
      logoClient,
      dateCreated,
      dateUpdated,
    });
    return { message: "Le groupe a été créer avec success", success: true };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestTogetAllClientData(): Promise<ClientDataType[]> {
  let clientData: ClientDataType[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, "ClientData"));
    console.log({ length: querySnapshot.docs.length });
    if (querySnapshot.docs.length !== 0) {
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const {
          nomClient,
          emailClient,
          passwordClient,
          logoClient,
          dateCreated,
          dateUpdated,
          statusClient,
        } = doc.data();
        clientData.push({
          id,
          nomClient,
          emailClient,
          passwordClient,
          logoClient,
          dateCreated,
          dateUpdated,
          statusClient,
        });
      });

      return clientData;
    }

    return [];
  } catch (error) {
    console.log({ error: error });
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestToUpdateClientData({
  nomClient,
  emailClient,
  passwordClient,
  logoClient,
  id,
}: ClientDataType) {
  try {
    const NotifRef = collection(db, "ClientData");

    const dateUpdated = format(Date.now(), "'le ' dd/MM/yyyy' à ' kk:mm");
    await updateDoc(doc(NotifRef, id), {
      nomClient,
      emailClient,
      passwordClient,
      logoClient,
      dateUpdated,
    });
    return { message: "Le groupe a été créer avec success", success: true };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestToGetClientDataWithId(
  clientId: string
): Promise<ClientDataType> {
  try {
    const docRef = doc(db, "ClientData", clientId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const {
        id,
        nomClient,
        emailClient,
        passwordClient,
        logoClient,
        dateCreated,
        dateUpdated,
        statusClient,
      } = docSnap.data();
      return {
        id,
        nomClient,
        emailClient,
        passwordClient,
        logoClient,
        dateCreated,
        dateUpdated,
        statusClient,
      };
    } else {
      throw new Error("Le document n'existe pas");
    }
  } catch (error) {
    console.log({ error: error });
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestTodeleteClientDataWithId(dataId: string) {
  const docRef = doc(db, "ClientData", dataId);
  try {
    await deleteDoc(docRef);
    return {
      message: "le document à été supprimer avec success",
      success: true,
    };
  } catch (error) {
    return {
      message: "Un problème est survenu pendant la suppression",
      success: false,
    };
  }
}

export async function requestToGetTotalCountOfNotificationData() {
  const notificationDataRef = collection(db, "Notifications");
  const snapshot = await getCountFromServer(notificationDataRef);
  return snapshot.data().count;
}

export const fetchPaginationPage = async (limitValue: number) => {
  let clientData: User[] = [];
  const collectionRef = collection(db, "Notifications");
  const q = query(collectionRef, orderBy("timestamp"), limit(limitValue));
  const querySnapshot = await getDocs(q);

  // const documents = querySnapshot.docs.map(doc => doc.data());
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]; // Get the last document
  const firstVisible = querySnapshot.docs[0];
  querySnapshot.forEach((doc) => {
    const id = doc.id;
    const { iconUrl, title, body, date, actionUrl } = doc.data();
    clientData.push({
      id,
      iconUrl,
      title,
      body,
      date,
      actionUrl,
    });
  });
  return { clientData, firstVisible, lastVisible };
};

export const fetchNextPage = async (
  mylastVisible: QueryDocumentSnapshot<DocumentData, DocumentData>,
  limitofPage: number
) => {
  let clientData: User[] = [];
  const collectionRef = collection(db, "Notifications");
  const q = query(
    collectionRef,
    orderBy("timestamp"),
    startAfter(mylastVisible),
    limit(limitofPage)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const id = doc.id;
    const { iconUrl, title, body, date, actionUrl } = doc.data();
    clientData.push({
      id,
      iconUrl,
      title,
      body,
      date,
      actionUrl,
    });
  });
  //const documents = querySnapshot.docs.map(doc => doc.data());
  const firstVisible = querySnapshot.docs[0];
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  return { clientData, firstVisible, lastVisible };
};

export const fetchPreviousPage = async (
  myFirstVisible: QueryDocumentSnapshot<DocumentData, DocumentData>,
  limitofPage: number
) => {
  let clientData: User[] = [];
  const collectionRef = collection(db, "Notifications");
  const q = query(
    collectionRef,
    orderBy("timestamp"),
    endBefore(myFirstVisible),
    limit(limitofPage)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const id = doc.id;
    const { iconUrl, title, body, date, actionUrl } = doc.data();
    clientData.push({
      id,
      iconUrl,
      title,
      body,
      date,
      actionUrl,
    });
  });
  //const documents = querySnapshot.docs.map(doc => doc.data());
  const firstVisible = querySnapshot.docs[0];
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  return { clientData, firstVisible, lastVisible };
};

export const fetchPage = async (indexStart: number, limitofPage: number) => {
  let clientData: User[] = [];
  try {
    const collectionRef = collection(db, "Notifications");
    const q = query(
      collectionRef,
      orderBy("date"),
      startAt(indexStart),
      limit(limitofPage)
    );
    console.log({ q });
    const querySnapshot = await getDocs(q);
    console.log({ querySnapshot });
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const { iconUrl, title, body, date, actionUrl } = doc.data();
      clientData.push({
        id,
        iconUrl,
        title,
        body,
        date,
        actionUrl,
      });
    });
    //const documents = querySnapshot.docs.map(doc => doc.data());
    const firstVisible = querySnapshot.docs[0];
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { clientData, firstVisible, lastVisible };
  } catch (error) {
    throw error;
  }
};

export const requestToGetClientDataBySearchValue = async (
  searchValue: string
) => {
  let clientData: ClientDataType[] = [];
  console.log("tete");
  try {
    const clientRef = collection(db, "ClientData");
    /*   const q = query(
      clientRef,
      where("nomClient", "<=", searchValue),
      where("nomClient", ">=", searchValue),
      orderBy("dateUpdated")
    ); */
    const querySnapshot = await getDocs(clientRef);
    console.log({ querySnapshot: querySnapshot.docs });
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const {
        nomClient,
        emailClient,
        passwordClient,
        logoClient,
        dateCreated,
        dateUpdated,
        statusClient,
      } = doc.data();
      clientData.push({
        id,
        nomClient,
        emailClient,
        passwordClient,
        logoClient,
        dateCreated,
        dateUpdated,
        statusClient,
      });
    });
    const filteredDocuments = clientData.filter(
      (doc) =>
        doc.nomClient.toLowerCase().includes(searchValue.toLowerCase()) ||
        doc.emailClient.toLowerCase().includes(searchValue.toLowerCase())
    );
    return filteredDocuments;
    //return clientData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const requestToGetMembreDataBySearchValue = async (
  searchValue: string
) => {
  let memberData: MemberDataType[] = [];

  try {
    const clientRef = collection(db, "MemberData");
    /*  const q = query(
      clientRef,
      orderBy("dateMiseAJour"),
      where("name", "<=", searchValue),
      where("name", ">=", searchValue),
      where("email", "<=", searchValue),
      where("email", ">=", searchValue)
    ); */
    const querySnapshot = await getDocs(clientRef);
    console.log({ querySnapshot });
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const {
        name,
        email,
        motsDepasse,
        sexe,
        birthDay,
        phone,
        dateCreation,
        dateMiseAJour,
        status,
        image,
      } = doc.data();
      memberData.push({
        id,
        name,
        email,
        motsDepasse,
        sexe,
        birthDay,
        phone,
        dateCreation,
        dateMiseAJour,
        status,
        image,
      });
    });
    const filteredDocuments = memberData.filter(
      (doc) =>
        doc.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        doc.email.toLowerCase().includes(searchValue.toLowerCase())
    );
    return filteredDocuments;
    //return memberData;
  } catch (error) {
    throw error;
  }
};

export const requestToGetEventDataBySearchValue = async (
  searchValue: string
) => {
  let eventData: EventDataType[] = [];

  try {
    const clientRef = collection(db, "EventData");
    /*  const q = query(
      clientRef,
      orderBy("date"),
      where("titleEvent", "<=", searchValue),
      where("titleEvent", ">=", searchValue)
    ); */
    const querySnapshot = await getDocs(clientRef);
    console.log({ querySnapshot });
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const {
        titleEvent,
        descriptionEvent,
        imageUrlEvent,
        typeAccess,
        status,
        dateOfEvent,
        typeEvent,
        urlOfEvent,
        textCTAEvent,
        locationOfEvent,
        groupeForEventSelect,
        date,
      } = doc.data();
      eventData.push({
        id,
        titleEvent,
        descriptionEvent,
        imageUrlEvent,
        typeAccess,
        status,
        dateOfEvent,
        typeEvent,
        urlOfEvent,
        textCTAEvent,
        locationOfEvent,
        groupeForEventSelect,
        date,
      });
    });
    const filteredDocuments = eventData.filter((doc) =>
      doc.titleEvent.toLowerCase().includes(searchValue.toLowerCase())
    );
    return filteredDocuments;
    //return eventData;
  } catch (error) {
    throw error;
  }
};

export const requestToGetGroupeDataBySearchValue = async (
  searchValue: string
) => {
  let groupeData: GroupeDataType[] = [];

  try {
    const clientRef = collection(db, "GroupeData");
    /*  const q = query(
      clientRef,
      orderBy("date"),
      where("titleGroupe", "<=", searchValue),
      where("titleGroupe", ">=", searchValue)
    ); */
    const querySnapshot = await getDocs(clientRef);
    console.log({ querySnapshot });
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const {
        titleGroupe,
        descriptionGroupe,
        typeAccess,
        banniereUrlGroupe,
        logoUrlGroupe,
        date,
        status,
      } = doc.data();
      groupeData.push({
        id,
        titleGroupe,
        descriptionGroupe,
        typeAccess,
        banniereUrlGroupe,
        logoUrlGroupe,
        date,
        status,
      });
    });

    const filteredDocuments = groupeData.filter((doc) =>
      doc.titleGroupe.toLowerCase().includes(searchValue.toLowerCase())
    );
    return filteredDocuments;

    //return groupeData;
  } catch (error) {
    throw error;
  }
};

export const requestToGetCommunityDataBySearchValue = async (
  searchValue: string
) => {
  let communityData: communityDataType[] = [];

  try {
    const clientRef = collection(db, "CommunityData");
    /*  const q = query(
      clientRef,
      orderBy("date"),
      where("title", "<=", searchValue),
      where("title", ">=", searchValue)
    ); */
    const querySnapshot = await getDocs(clientRef);
    console.log({ querySnapshot });
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const { title, description, logoUrl, banniereUrl } = doc.data();
      communityData.push({
        id,
        title,
        description,
        logoUrl,
        banniereUrl,
      });
    });
    const filteredDocuments = communityData.filter((doc) =>
      doc.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return filteredDocuments;
    //return communityData;
  } catch (error) {
    throw error;
  }
};

export async function requestToSetMembreData({
  name,
  email,
  motsDepasse,
  image,
  sexe,
  birthDay,
  phone,
  status,
}: MemberDataType) {
  try {
    const NotifRef = collection(db, "MembreData");
    const dateCreation = format(Date.now(), "'le ' dd/MM/yyyy' à ' kk:mm");

    const dateMiseAJour = format(Date.now(), "'le ' dd/MM/yyyy' à ' kk:mm");
    await setDoc(doc(NotifRef), {
      name,
      email,
      motsDepasse,
      image,
      sexe,
      birthDay,
      phone,
      status,
      dateCreation,
      dateMiseAJour,
    });
    return { message: "Le groupe a été créer avec success", success: true };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestToUpdateMembreData({
  id,
  name,
  email,
  motsDepasse,
  image,
  sexe,
  birthDay,
  phone,
  status,
}: MemberDataType) {
  try {
    const docRef = doc(db, "MembreData", id);
    console.log({
      name,
      email,
      motsDepasse,
      image,
      sexe,
      birthDay,
      phone,
      status,
    });
    const dateMiseAJour = format(Date.now(), "'le ' dd/MM/yyyy' à ' kk:mm");
    await updateDoc(docRef, {
      name,
      email,
      motsDepasse,
      image,
      sexe,
      birthDay,
      phone,
      status,
      dateMiseAJour,
    });
    console.log("counde2");
    return { message: "Le groupe a été créer avec success", success: true };
  } catch (error) {
    console.log("counde3");
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestToGetMemberDataWithId(
  membreId: string
): Promise<MemberDataType> {
  try {
    const docRef = doc(db, "MembreData", membreId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const {
        id,
        name,
        email,
        motsDepasse,
        image,
        sexe,
        birthDay,
        phone,
        status,
        dateCreation,
        dateMiseAJour,
      } = docSnap.data();
      return {
        id,
        name,
        email,
        motsDepasse,
        image,
        sexe,
        birthDay,
        phone,
        status,
        dateCreation,
        dateMiseAJour,
      };
    } else {
      throw new Error("Le document n'existe pas");
    }
  } catch (error) {
    console.log({ error: error });
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestTogetAllMembreData(): Promise<MemberDataType[]> {
  let membreData: MemberDataType[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, "MembreData"));
    console.log({ length: querySnapshot.docs.length });
    if (querySnapshot.docs.length !== 0) {
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const {
          name,
          email,
          motsDepasse,
          image,
          sexe,
          birthDay,
          phone,
          status,
          dateCreation,
          dateMiseAJour,
        } = doc.data();
        membreData.push({
          id,
          name,
          email,
          motsDepasse,
          image,
          sexe,
          birthDay,
          phone,
          status,
          dateCreation,
          dateMiseAJour,
        });
      });

      return membreData;
    }

    return [];
  } catch (error) {
    console.log({ error: error });
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestToDeleteMembreWithId(dataId: string) {
  const docRef = doc(db, "MembreData", dataId);
  try {
    await deleteDoc(docRef);
    return {
      message: "le document à été supprimer avec success",
      success: true,
    };
  } catch (error) {
    return {
      message: "Un problème est survenu pendant la suppression",
      success: false,
    };
  }
}
