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
  increment,
  /* where, */
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { stateGroupeEvent } from "./mycomponents/evenementPage/hook/UseselectGroupeInEvent";
import { MemberDataType } from "./mycomponents/membreGererPage/MemberDataComponent";
import { CommunityDataType } from "./mycomponents/communautePage/CommunityDetails";
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
  communityId?: string;
  memberId?: string[];
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
  banniereUrlGroupe: string;
  logoUrlGroupe: string;
  status: string;
  nombreDePartages: number;
  nombreDevenements: number;
  nombreDeChaines: number;
  nombreDePassionnner: number;
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

export interface ChannelPageDataType {
  nomChannel: string;
  descriptionChannel: string;
  typeChannel: string;
  typeAccessChannel: string;
  imageChannel: string;
  amountChannel: string;
  groupeIdChannel: string;
  dateUpdatedChannel: string;
  dateCreatedChannel: string;
  statusChannel: string;
  channelRessources: RessourcesDataType[];
  id: string;
}

export interface RessourcesDataType {
  titleRessource: string;
  communityId?: string;
  descriptionRessource?: string;
  imageRessource?: string;
  textButtonRessource?: string;
  typeRessources: string;
  urlRessources?: string;
  urlExterne?: string;
  urlVideo?: string;
  urlAudio?: string;
  instruction?: string;
  status: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
}

/* export interface LessonLibraryDataType {
  titleLessonLibrary: string;
  descriptionLessonLibrary: string;
  imageLessonLibrary: string;
  textButtonLessonLibrary: string;
  typeLessonLibrary: string;
  urlLessonLibrary: string;
  communityId:string
  status: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?:string;
} */

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

/* export async function requestTogetAllGroupeData(): Promise<GroupeDataType[]> {
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
          nombreDePartages,
          nombreDevenements,
          nombreDeChaines,
          nombreDePassionnner,
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
          nombreDePartages,
          nombreDevenements,
          nombreDeChaines,
          nombreDePassionnner,
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
} */
/* export async function requestToSetGroupeData({
  titleGroupe,
  descriptionGroupe,
  logoUrlGroupe,
  banniereUrlGroupe,
  typeAccess,
  status,
}: GroupeDataType) {
  try {
    const NotifRef = collection(db, "GroupeData");
    const date = new Date().toUTCString();
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
  const date = new Date().toUTCString();
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
 */
export async function requestToChangeStatus(
  id: string,
  status: string,
  database: string
) {
  console.log({ status });
  const GroupeDataRef = collection(db, database);
  const date = new Date().toUTCString();
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

export async function requestToChangeStatusChannel(
  id: string,
  status: string,
  database: string
) {
  console.log({ status });
  const GroupeDataRef = collection(db, database);
  const dateUpdatedChannel = new Date().toUTCString();
  try {
    await updateDoc(doc(GroupeDataRef, id), {
      statusChannel: status,
      dateUpdatedChannel,
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

/* export async function requestToGetGroupDataWithId(
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
        nombreDePartages,
        nombreDevenements,
        nombreDeChaines,
        nombreDePassionnner,
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
        nombreDePartages,
        nombreDevenements,
        nombreDeChaines,
        nombreDePassionnner,
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
} */

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
/* export async function seedCommunityDataWithId(): Promise<CommunityDataType> {
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
 */
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
    const date = new Date().toUTCString();
    const promise1 = setDoc(doc(NotifRef), {
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
    if (groupeForEventSelect.length !== 0) {
      const newval = groupeForEventSelect.map((value) => {
        const groupeDataRef = doc(db, "GroupeData", value.groupeId);
        const promise2 = updateDoc(groupeDataRef, {
          nombreDevenements: increment(1),
        });
        return promise2;
      });
      await Promise.all([promise1, ...newval]);
      return { message: "Le groupe a été créer avec success", success: true };
    }

    await promise1;
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
    const date = new Date().toUTCString();
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

export async function requestToDeleteEventWithId(
  dataId: string,
  groupeForEventSelect: stateGroupeEvent[]
) {
  const docRef = doc(db, "EventData", dataId);
  try {
    const promise1 = deleteDoc(docRef);
    if (groupeForEventSelect.length !== 0) {
      const newval = groupeForEventSelect.map((value) => {
        const groupeDataRef = doc(db, "GroupeData", value.groupeId);
        const promise2 = updateDoc(groupeDataRef, {
          nombreDevenements: increment(-1),
        });
        return promise2;
      });
      await Promise.all([promise1, ...newval]);
      return {
        message: "le document à été supprimer avec success",
        success: true,
      };
    }

    await promise1;
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
    const dateCreated = new Date().toUTCString();

    const dateUpdated = new Date().toUTCString();
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

export async function requestToSetChannelData(
  {
    nomChannel,
    descriptionChannel,
    typeChannel,
    imageChannel,
    groupeIdChannel,
    statusChannel,
    typeAccessChannel,
    amountChannel,
    channelRessources,
  }: ChannelPageDataType,
  groupeId: string
) {
  try {
    const NotifRef = collection(db, "ChannelData");
    const dateCreatedChannel = new Date().toUTCString();

    const dateUpdatedChannel = new Date().toUTCString();
    const promise1 = setDoc(doc(NotifRef), {
      nomChannel,
      descriptionChannel,
      typeChannel,
      imageChannel,
      groupeIdChannel,
      statusChannel,
      typeAccessChannel,
      amountChannel,
      dateCreatedChannel,
      dateUpdatedChannel,
      channelRessources,
    });

    const groupeDataRef = doc(db, "GroupeData", groupeId);
    const promise2 = updateDoc(groupeDataRef, {
      nombreDeChaines: increment(1),
    });

    await Promise.all([promise1, promise2]);

    return { message: "La chaine a été créer avec success", success: true };
  } catch (error) {
    console.log(error);
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

export async function requestTogetAllChannelData(
  groupeId: string
): Promise<ChannelPageDataType[]> {
  let channelData: ChannelPageDataType[] = [];

  try {
    console.log({ groupeId });
    const querySnapshot = await getDocs(collection(db, "ChannelData"));
    console.log({ length: querySnapshot.docs.length });
    if (querySnapshot.docs.length !== 0) {
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const {
          nomChannel,
          descriptionChannel,
          typeChannel,
          imageChannel,
          groupeIdChannel,
          dateUpdatedChannel,
          dateCreatedChannel,
          statusChannel,
          typeAccessChannel,
          amountChannel,
          channelRessources,
        } = doc.data();
        channelData.push({
          id,
          nomChannel,
          descriptionChannel,
          typeChannel,
          imageChannel,
          groupeIdChannel,
          dateUpdatedChannel,
          dateCreatedChannel,
          statusChannel,
          typeAccessChannel,
          amountChannel,
          channelRessources,
        });
      });
      const result = channelData.filter(
        (channel) => channel.groupeIdChannel === groupeId
      );
      console.log(result);
      return result;
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

    const dateUpdated = new Date().toUTCString();
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

export async function requestToUpdateChannelData({
  nomChannel,
  descriptionChannel,
  typeChannel,
  imageChannel,
  statusChannel,
  typeAccessChannel,
  amountChannel,
  id,
}: ChannelPageDataType) {
  try {
    const NotifRef = collection(db, "ChannelData");

    const dateUpdatedChannel = new Date().toUTCString();
    await updateDoc(doc(NotifRef, id), {
      nomChannel,
      descriptionChannel,
      typeChannel,
      imageChannel,
      statusChannel,
      typeAccessChannel,
      amountChannel,
      dateUpdatedChannel,
    });
    return { message: "Le groupe a été créer avec success", success: true };
  } catch (error) {
    throw error; /*- new Error(
      "Une erreur est survenue pendant la récupération des données"
    ); */
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

export async function requestToGetChannelDataWithId(
  channelId: string
): Promise<ChannelPageDataType> {
  try {
    const docRef = doc(db, "ChannelData", channelId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const {
        id,
        nomChannel,
        descriptionChannel,
        typeChannel,
        typeAccessChannel,
        imageChannel,
        amountChannel,
        groupeIdChannel,
        dateUpdatedChannel,
        dateCreatedChannel,
        statusChannel,
        channelRessources,
      } = docSnap.data();
      return {
        id,
        nomChannel,
        descriptionChannel,
        typeChannel,
        typeAccessChannel,
        imageChannel,
        amountChannel,
        groupeIdChannel,
        dateUpdatedChannel,
        dateCreatedChannel,
        statusChannel,
        channelRessources,
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
export async function requestTodeletenChannelDataWithId(
  dataId: string,
  groupeId: string
) {
  const docRef = doc(db, "ChannelData", dataId);

  try {
    const promise1 = deleteDoc(docRef);

    const groupeDataRef = doc(db, "GroupeData", groupeId);
    const promise2 = updateDoc(groupeDataRef, {
      nombreDeChaines: increment(-1),
    });

    await Promise.all([promise1, promise2]);

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
        nombrePartage,
        nombreLikes,
        nombreCommentaire,
        nombreDeMerciBenis,
        nombreDactivite,
        nombreDeBadge,
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
        nombrePartage,
        nombreLikes,
        nombreCommentaire,
        nombreDeMerciBenis,
        nombreDactivite,
        nombreDeBadge,
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

export const requestToGetUniversalDataBySearchValue = async <T>(
  searchValue: string,
  searchKey: keyof T,
  database: string
) => {
  let data: T[] = [];

  try {
    const clientRef = collection(db, database);

    const querySnapshot = await getDocs(clientRef);
    console.log({ querySnapshot });
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const dataGet = doc.data();
      const value = {
        id,
        ...dataGet,
      } as T;
      data.push(value);
    });
    const filteredDocuments = data.filter((doc) => {
      if (typeof doc[searchKey] === "string") {
        return doc[searchKey]
          ?.toLowerCase()
          .includes(searchValue.toLowerCase());
      } else return false;
    });
    return filteredDocuments;
    //return eventData;
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

export const requestToGetChannelDataBySearchValue = async (
  searchValue: string
) => {
  let channelData: ChannelPageDataType[] = [];

  try {
    const clientRef = collection(db, "ChannelData");
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
        nomChannel,
        descriptionChannel,
        typeChannel,
        imageChannel,
        groupeIdChannel,
        dateUpdatedChannel,
        dateCreatedChannel,
        statusChannel,
        typeAccessChannel,
        amountChannel,
        channelRessources,
      } = doc.data();
      channelData.push({
        id,
        nomChannel,
        descriptionChannel,
        typeChannel,
        imageChannel,
        groupeIdChannel,
        dateUpdatedChannel,
        dateCreatedChannel,
        statusChannel,
        typeAccessChannel,
        amountChannel,
        channelRessources,
      });
    });
    const filteredDocuments = channelData.filter((doc) =>
      doc.nomChannel.toLowerCase().includes(searchValue.toLowerCase())
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
        status,
        nombreDePartages,
        nombreDevenements,
        nombreDeChaines,
        nombreDePassionnner,
        communityId,
      } = doc.data();
      groupeData.push({
        id,
        titleGroupe,
        descriptionGroupe,
        typeAccess,
        banniereUrlGroupe,
        logoUrlGroupe,
        communityId,
        status,
        nombreDePartages,
        nombreDevenements,
        nombreDeChaines,
        nombreDePassionnner,
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
  let communityData: CommunityDataType[] = [];

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
      const {
        title,
        description,
        logoUrl,
        banniereUrl,
        communityUrl,
        faviconUrl,
        timeZone,
      } = doc.data();
      communityData.push({
        id,
        title,
        description,
        logoUrl,
        banniereUrl,
        communityUrl,
        faviconUrl,
        timeZone,
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
  nombrePartage,
  nombreLikes,
  nombreCommentaire,
  nombreDeMerciBenis,
  nombreDactivite,
  nombreDeBadge,
}: MemberDataType) {
  try {
    const NotifRef = collection(db, "MembreData");
    const dateCreation = new Date().toUTCString();

    const dateMiseAJour = new Date().toUTCString();
    const promise1 = setDoc(doc(NotifRef), {
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
      nombrePartage,
      nombreLikes,
      nombreCommentaire,
      nombreDeMerciBenis,
      nombreDactivite,
      nombreDeBadge,
    });

    const dataGroupe = await requestTogetAllUniversalData<GroupeDataType>(
      "GroupeData"
    );
    const newVal = dataGroupe.map((val) => {
      const groupeDataRef = doc(db, "GroupeData", val.id as string);
      const promisei = updateDoc(groupeDataRef, {
        nombreDePassionnner: increment(1),
      });
      return promisei;
    });

    await Promise.all([promise1, ...newVal]);

    return { message: "Le groupe a été créer avec success", success: true };
  } catch (error) {
    console.log(error);
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
    const dateMiseAJour = new Date().toUTCString();
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
        nombrePartage,
        nombreLikes,
        nombreCommentaire,
        nombreDeMerciBenis,
        nombreDactivite,
        nombreDeBadge,
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
        nombrePartage,
        nombreLikes,
        nombreCommentaire,
        nombreDeMerciBenis,
        nombreDactivite,
        nombreDeBadge,
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
          nombrePartage,
          nombreLikes,
          nombreCommentaire,
          nombreDeMerciBenis,
          nombreDactivite,
          nombreDeBadge,
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
          nombrePartage,
          nombreLikes,
          nombreCommentaire,
          nombreDeMerciBenis,
          nombreDactivite,
          nombreDeBadge,
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
    const promise1 = deleteDoc(docRef);
    const dataGroupe = await requestTogetAllUniversalData<GroupeDataType>(
      "GroupeData"
    );
    const newVal = dataGroupe.map((val) => {
      const groupeDataRef = doc(db, "GroupeData", val.id as string);
      const promisei = updateDoc(groupeDataRef, {
        nombreDePassionnner: increment(-1),
      });
      return promisei;
    });

    await Promise.all([promise1, ...newVal]);
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

export async function requestToSetRessourcesData({
  titleRessource,
  descriptionRessource,
  imageRessource,
  textButtonRessource,
  typeRessources,
  urlRessources,
  urlExterne,
  urlVideo,
  urlAudio,
  instruction,
  status,
}: RessourcesDataType) {
  try {
    const NotifRef = collection(db, "RessourcesData");
    const dateOfCreation = new Date().toUTCString();
    const dateOfUpdate = new Date().toUTCString();

    await setDoc(doc(NotifRef), {
      titleRessource,
      descriptionRessource,
      imageRessource,
      textButtonRessource,
      typeRessources,
      urlRessources,
      urlExterne,
      urlVideo,
      urlAudio,
      instruction,
      dateOfCreation,
      dateOfUpdate,
      status,
    });
    return { message: "Le groupe a été créer avec success", success: true };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestTogetAllRessourcesData(): Promise<
  RessourcesDataType[]
> {
  let ressourcesData: RessourcesDataType[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, "RessourcesData"));
    console.log({ length: querySnapshot.docs.length });
    if (querySnapshot.docs.length !== 0) {
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const {
          titleRessource,
          descriptionRessource,
          imageRessource,
          textButtonRessource,
          typeRessources,
          urlRessources,
          urlExterne,
          urlVideo,
          urlAudio,
          instruction,
          communityId,
          status,
          dateOfCreation,
          dateOfUpdate,
        } = doc.data();
        ressourcesData.push({
          id,
          titleRessource,
          descriptionRessource,
          imageRessource,
          textButtonRessource,
          typeRessources,
          urlRessources,
          urlExterne,
          urlVideo,
          urlAudio,
          instruction,
          communityId,
          status,
          dateOfCreation,
          dateOfUpdate,
        });
      });

      return ressourcesData;
    }

    return [];
  } catch (error) {
    console.log({ error: error });
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestToGetRessourcesDataWithId(
  ressourceId: string
): Promise<RessourcesDataType> {
  try {
    const docRef = doc(db, "RessourcesData", ressourceId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const {
        id,
        titleRessource,
        descriptionRessource,
        imageRessource,
        textButtonRessource,
        typeRessources,
        urlRessources,
        urlExterne,
        urlVideo,
        urlAudio,
        instruction,
        communityId,
        status,
        dateOfCreation,
        dateOfUpdate,
      } = docSnap.data();
      return {
        id,
        communityId,
        titleRessource,
        descriptionRessource,
        imageRessource,
        textButtonRessource,
        typeRessources,
        urlRessources,
        urlExterne,
        urlVideo,
        urlAudio,
        instruction,
        status,
        dateOfCreation,
        dateOfUpdate,
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

export async function requestToUpdateRessourcesData({
  id,
  titleRessource,
  descriptionRessource,
  imageRessource,
  textButtonRessource,
  typeRessources,
  urlRessources,
  urlExterne,
  urlVideo,
  urlAudio,
  instruction,
  status,
}: RessourcesDataType) {
  try {
    const docRef = doc(db, "RessourcesData", id as string);

    const dateOfUpdate = new Date().toUTCString();
    await updateDoc(docRef, {
      titleRessource,
      descriptionRessource,
      imageRessource,
      textButtonRessource,
      typeRessources,
      urlRessources,
      urlExterne,
      urlVideo,
      urlAudio,
      instruction,
      status,
      dateOfUpdate,
    });

    return {
      message: "La ressource a été mis à jour avec success",
      success: true,
    };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestToDeleteRessourcesWithId(dataId: string) {
  const docRef = doc(db, "RessourcesData", dataId);
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

export const requestToGetRessourcesDataBySearchValue = async (
  searchValue: string
) => {
  let ressourcesData: RessourcesDataType[] = [];

  try {
    const clientRef = collection(db, "RessourcesData");
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
        titleRessource,
        communityId,
        descriptionRessource,
        imageRessource,
        textButtonRessource,
        typeRessources,
        urlRessources,
        urlExterne,
        urlVideo,
        urlAudio,
        instruction,
        status,
        dateOfCreation,
        dateOfUpdate,
      } = doc.data();
      ressourcesData.push({
        id,
        communityId,
        titleRessource,
        descriptionRessource,
        imageRessource,
        textButtonRessource,
        typeRessources,
        urlRessources,
        urlExterne,
        urlVideo,
        urlAudio,
        instruction,
        status,
        dateOfCreation,
        dateOfUpdate,
      });
    });
    const filteredDocuments = ressourcesData.filter((doc) =>
      doc.titleRessource.toLowerCase().includes(searchValue.toLowerCase())
    );
    return filteredDocuments;
    //return eventData;
  } catch (error) {
    throw error;
  }
};

export interface LessonLibraryDataType {
  titleLessonLibrary: string;
  descriptionLessonLibrary: string;
  shortDescriptionLessonLibrary: string;
  imageLessonLibrary: string;
  textButtonLessonLibrary: string;
  typeLessonLibrary: string;
  urlLessonLibrary: string;
  communityId?: string;
  status: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
}

export async function requestToSetLessonLibraryData({
  titleLessonLibrary,
  descriptionLessonLibrary,
  shortDescriptionLessonLibrary,
  imageLessonLibrary,
  textButtonLessonLibrary,
  typeLessonLibrary,
  urlLessonLibrary,
  status,
}: LessonLibraryDataType) {
  try {
    const NotifRef = collection(db, "LessonLibraryData");
    const date = new Date().toUTCString();
    await setDoc(doc(NotifRef), {
      titleLessonLibrary,
      descriptionLessonLibrary,
      shortDescriptionLessonLibrary,
      imageLessonLibrary,
      textButtonLessonLibrary,
      typeLessonLibrary,
      urlLessonLibrary,
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

export async function requestTogetAllLessonLibraryData(): Promise<
  LessonLibraryDataType[]
> {
  let lessonLibraryData: LessonLibraryDataType[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, "LessonLibraryData"));
    console.log({ length: querySnapshot.docs.length });
    if (querySnapshot.docs.length !== 0) {
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const {
          titleLessonLibrary,
          descriptionLessonLibrary,
          shortDescriptionLessonLibrary,
          imageLessonLibrary,
          textButtonLessonLibrary,
          typeLessonLibrary,
          urlLessonLibrary,
          status,
          communityId,
        } = doc.data();
        lessonLibraryData.push({
          id,
          titleLessonLibrary,
          descriptionLessonLibrary,
          shortDescriptionLessonLibrary,
          imageLessonLibrary,
          textButtonLessonLibrary,
          typeLessonLibrary,
          urlLessonLibrary,
          status,
          communityId,
        });
      });

      return lessonLibraryData;
    }

    return [];
  } catch (error) {
    console.log({ error: error });
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export const requestToGetLessonLibraryDataBySearchValue = async (
  searchValue: string
) => {
  let lessonLibraryData: LessonLibraryDataType[] = [];

  try {
    const clientRef = collection(db, "LessonLibraryData");

    const querySnapshot = await getDocs(clientRef);
    console.log({ querySnapshot });
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const {
        titleLessonLibrary,
        descriptionLessonLibrary,
        shortDescriptionLessonLibrary,
        imageLessonLibrary,
        textButtonLessonLibrary,
        typeLessonLibrary,
        urlLessonLibrary,
        status,
        communityId,
      } = doc.data();
      lessonLibraryData.push({
        id,
        titleLessonLibrary,
        descriptionLessonLibrary,
        shortDescriptionLessonLibrary,
        imageLessonLibrary,
        textButtonLessonLibrary,
        typeLessonLibrary,
        urlLessonLibrary,
        status,
        communityId,
      });
    });
    const filteredDocuments = lessonLibraryData.filter((doc) =>
      doc.titleLessonLibrary.toLowerCase().includes(searchValue.toLowerCase())
    );
    return filteredDocuments;
    //return eventData;
  } catch (error) {
    throw error;
  }
};

export async function requestToGetLessonLibraryDataWithId(
  ressourceId: string
): Promise<LessonLibraryDataType> {
  try {
    const docRef = doc(db, "LessonLibraryData", ressourceId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const {
        id,
        titleLessonLibrary,
        descriptionLessonLibrary,
        shortDescriptionLessonLibrary,
        imageLessonLibrary,
        textButtonLessonLibrary,
        typeLessonLibrary,
        urlLessonLibrary,
        status,
        communityId,
      } = docSnap.data();
      return {
        id,
        titleLessonLibrary,
        descriptionLessonLibrary,
        shortDescriptionLessonLibrary,
        imageLessonLibrary,
        textButtonLessonLibrary,
        typeLessonLibrary,
        urlLessonLibrary,
        status,
        communityId,
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

export async function requestToUpdateLessonLibraryData({
  id,
  titleLessonLibrary,
  descriptionLessonLibrary,
  shortDescriptionLessonLibrary,
  imageLessonLibrary,
  textButtonLessonLibrary,
  typeLessonLibrary,
  urlLessonLibrary,
  status,
}: LessonLibraryDataType) {
  try {
    const docRef = doc(db, "LessonLibraryData", id as string);

    await updateDoc(docRef, {
      titleLessonLibrary,
      descriptionLessonLibrary,
      shortDescriptionLessonLibrary,
      imageLessonLibrary,
      textButtonLessonLibrary,
      typeLessonLibrary,
      urlLessonLibrary,
      status,
    });

    return {
      message: "La lecon a été mis à jour avec success",
      success: true,
    };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestToDeleteLessonLibraryWithId(dataId: string) {
  const docRef = doc(db, "LessonLibraryData", dataId);
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

export interface AssetsDataType {
  titleAssets: string;
  shortDescriptionAssets: string;
  imageAssets: string;
  amountAssets: string;
  valueAssets: string;
  webhookUrlAssets: string;
  communityId?: string;
  status: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
}

export async function requestToSetAssetsData({
  titleAssets,
  shortDescriptionAssets,
  imageAssets,
  amountAssets,
  valueAssets,
  webhookUrlAssets,
  status,
}: AssetsDataType) {
  try {
    const NotifRef = collection(db, "AssetsData");
    const date = new Date().toUTCString();
    await setDoc(doc(NotifRef), {
      titleAssets,
      shortDescriptionAssets,
      imageAssets,
      amountAssets,
      valueAssets,
      webhookUrlAssets,
      status,
      date,
    });
    return { message: "L'assets' a été créer avec success", success: true };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestTogetAllAssetsData(): Promise<AssetsDataType[]> {
  let assetsData: AssetsDataType[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, "AssetsData"));
    console.log({ length: querySnapshot.docs.length });
    if (querySnapshot.docs.length !== 0) {
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const {
          titleAssets,
          shortDescriptionAssets,
          imageAssets,
          amountAssets,
          valueAssets,
          webhookUrlAssets,
          status,
          communityId,
        } = doc.data();
        assetsData.push({
          id,
          titleAssets,
          shortDescriptionAssets,
          imageAssets,
          amountAssets,
          valueAssets,
          webhookUrlAssets,
          status,
          communityId,
        });
      });

      return assetsData;
    }

    return [];
  } catch (error) {
    console.log({ error: error });
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export const requestToGetAssetsDataBySearchValue = async (
  searchValue: string
) => {
  let assetsData: AssetsDataType[] = [];

  try {
    const clientRef = collection(db, "AssetsData");

    const querySnapshot = await getDocs(clientRef);
    console.log({ querySnapshot });
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const {
        titleAssets,
        shortDescriptionAssets,
        imageAssets,
        amountAssets,
        valueAssets,
        webhookUrlAssets,
        status,
        communityId,
      } = doc.data();
      assetsData.push({
        id,
        titleAssets,
        shortDescriptionAssets,
        imageAssets,
        amountAssets,
        valueAssets,
        webhookUrlAssets,
        status,
        communityId,
      });
    });
    const filteredDocuments = assetsData.filter((doc) =>
      doc.titleAssets.toLowerCase().includes(searchValue.toLowerCase())
    );
    return filteredDocuments;
    //return eventData;
  } catch (error) {
    throw error;
  }
};

export async function requestToGetAssetsDataWithId(
  ressourceId: string
): Promise<AssetsDataType> {
  try {
    const docRef = doc(db, "AssetsData", ressourceId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const {
        id,
        titleAssets,
        shortDescriptionAssets,
        imageAssets,
        amountAssets,
        valueAssets,
        webhookUrlAssets,
        status,
        communityId,
      } = docSnap.data();
      return {
        id,
        titleAssets,
        shortDescriptionAssets,
        imageAssets,
        amountAssets,
        valueAssets,
        webhookUrlAssets,
        status,
        communityId,
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

export async function requestToUpdateAssetsData({
  id,
  titleAssets,
  shortDescriptionAssets,
  imageAssets,
  amountAssets,
  valueAssets,
  webhookUrlAssets,
  status,
}: AssetsDataType) {
  try {
    const docRef = doc(db, "AssetsData", id as string);

    const date = new Date().toUTCString();
    await updateDoc(docRef, {
      titleAssets,
      shortDescriptionAssets,
      imageAssets,
      amountAssets,
      valueAssets,
      webhookUrlAssets,
      status,
      date,
    });

    return {
      message: "L'assets a été mis à jour avec success",
      success: true,
    };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestToDeleteAssetsWithId(dataId: string) {
  const docRef = doc(db, "AssetsData", dataId);
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

export interface EmailNotificationDataType {
  title: string;
  emailAuthor: string;
  subject: string;
  messageOfEmail: string;
  status: string;
  communityId?: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
}

export async function requestToSetEmailNotificationData({
  title,
  emailAuthor,
  subject,
  messageOfEmail,
  status,
}: EmailNotificationDataType) {
  try {
    const NotifRef = collection(db, "EmailNotificationData");

    await setDoc(doc(NotifRef), {
      title,
      emailAuthor,
      subject,
      messageOfEmail,
      status,
    });
    return { message: " success", success: true };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestTogetAllEmailNotificationData(): Promise<
  EmailNotificationDataType[]
> {
  let emailNotificationData: EmailNotificationDataType[] = [];
  try {
    const querySnapshot = await getDocs(
      collection(db, "EmailNotificationData")
    );
    console.log({ length: querySnapshot.docs.length });
    if (querySnapshot.docs.length !== 0) {
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const {
          title,
          emailAuthor,
          subject,
          messageOfEmail,
          status,
          communityId,
        } = doc.data();
        emailNotificationData.push({
          id,
          title,
          emailAuthor,
          subject,
          messageOfEmail,
          status,
          communityId,
        });
      });

      return emailNotificationData;
    }

    return [];
  } catch (error) {
    console.log({ error: error });
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestToUpdateEmailNotificationData({
  id,
  title,
  emailAuthor,
  subject,
  messageOfEmail,
  status,
}: EmailNotificationDataType) {
  try {
    const docRef = doc(db, "EmailNotificationData", id as string);

    await updateDoc(docRef, {
      title,
      emailAuthor,
      subject,
      messageOfEmail,
      status,
    });

    return {
      message: " success",
      success: true,
    };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

/* ---------------------------------------------- */

export interface AchatNotificationDataType {
  titleAchat: string;
  emailAuthorAchat: string;
  subjectAchat: string;
  messageOfEmailAchat: string;
  statusAchat: string;
  communityId?: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
}

/* export async function requestToSetAchatNotificationData({
  titleAchat,
  emailAuthorAchat,
  subjectAchat,
  messageOfEmailAchat,
  statusAchat,
}: AchatNotificationDataType) {
  try {
    const NotifRef = collection(db, "AchatNotificationData");
    const date = new Date().toUTCString();
    await setDoc(doc(NotifRef), {
      titleAchat,
      emailAuthorAchat,
      subjectAchat,
      messageOfEmailAchat,
      statusAchat,
      date,
    });
    return { message: " success", success: true };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestTogetAllAchatNotificationData(): Promise<
  AchatNotificationDataType[]
> {
  let AchatNotificationData: AchatNotificationDataType[] = [];
  try {
    const querySnapshot = await getDocs(
      collection(db, "AchatNotificationData")
    );
    console.log({ length: querySnapshot.docs.length });
    if (querySnapshot.docs.length !== 0) {
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const {
          titleAchat,
          emailAuthorAchat,
          subjectAchat,
          messageOfEmailAchat,
          statusAchat,
          date,
        } = doc.data();
        AchatNotificationData.push({
          id,
          titleAchat,
          emailAuthorAchat,
          subjectAchat,
          messageOfEmailAchat,
          statusAchat,
          date,
        });
      });

      return AchatNotificationData;
    }

    return [];
  } catch (error) {
    console.log({ error: error });
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestToUpdateAchatNotificationData({
  titleAchat,
  emailAuthorAchat,
  subjectAchat,
  messageOfEmailAchat,
  statusAchat,
  id,
}: AchatNotificationDataType) {
  try {
    const docRef = doc(db, "AchatNotificationData", id);

    const date = new Date().toUTCString();
    await updateDoc(docRef, {
      titleAchat,
      emailAuthorAchat,
      subjectAchat,
      messageOfEmailAchat,
      statusAchat,
      date,
    });

    return {
      message: " success",
      success: true,
    };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
} */

/* ------------------------------------------------------------ */

export interface MembreNotificationDataType {
  titleMembre: string;
  emailAuthorMembre: string;
  subjectMembre: string;
  messageOfEmailMembre: string;
  statusMembre: string;
  communityId?: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
}

/* export async function requestToSetMembreNotificationData({
  titleMembre,
  emailAuthorMembre,
  subjectMembre,
  messageOfEmailMembre,
  statusMembre,
}: MembreNotificationDataType) {
  try {
    const NotifRef = collection(db, "MembreNotificationData");
    const date = new Date().toUTCString();
    await setDoc(doc(NotifRef), {
      titleMembre,
      emailAuthorMembre,
      subjectMembre,
      messageOfEmailMembre,
      statusMembre,
      date,
    });
    return { message: " success", success: true };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestTogetAllMembreNotificationData(): Promise<
  MembreNotificationDataType[]
> {
  let MembreNotificationData: MembreNotificationDataType[] = [];
  try {
    const querySnapshot = await getDocs(
      collection(db, "MembreNotificationData")
    );
    console.log({ length: querySnapshot.docs.length });
    if (querySnapshot.docs.length !== 0) {
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const {
          titleMembre,
          emailAuthorMembre,
          subjectMembre,
          messageOfEmailMembre,
          statusMembre,
          date,
        } = doc.data();
        MembreNotificationData.push({
          id,
          titleMembre,
          emailAuthorMembre,
          subjectMembre,
          messageOfEmailMembre,
          statusMembre,
          date,
        });
      });

      return MembreNotificationData;
    }

    return [];
  } catch (error) {
    console.log({ error: error });
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestToUpdateMembreNotificationData({
  titleMembre,
  emailAuthorMembre,
  subjectMembre,
  messageOfEmailMembre,
  statusMembre,
  id,
}: MembreNotificationDataType) {
  try {
    const docRef = doc(db, "MembreNotificationData", id);

    const date = new Date().toUTCString();
    await updateDoc(docRef, {
      titleMembre,
      emailAuthorMembre,
      subjectMembre,
      messageOfEmailMembre,
      statusMembre,
      date,
    });

    return {
      message: " success",
      success: true,
    };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}
 */
/* --------------------------------------------------------------------- */

export interface BulkNotificationDataType {
  titleBulk: string;
  emailAuthorBulk: string;
  subjectBulk: string;
  messageOfEmailBulk: string;
  statusBulk: string;
  communityId?: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
}

/* export async function requestToSetBulkNotificationData({
  titleBulk,
  emailAuthorBulk,
  subjectBulk,
  messageOfEmailBulk,
  statusBulk,
}: BulkNotificationDataType) {
  try {
    const NotifRef = collection(db, "BulkNotificationData");
    const date = new Date().toUTCString();
    await setDoc(doc(NotifRef), {
      titleBulk,
      emailAuthorBulk,
      subjectBulk,
      messageOfEmailBulk,
      statusBulk,
      date,
    });
    return { message: " success", success: true };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestTogetAllBulkNotificationData(): Promise<
  BulkNotificationDataType[]
> {
  let BulkNotificationData: BulkNotificationDataType[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, "BulkNotificationData"));
    console.log({ length: querySnapshot.docs.length });
    if (querySnapshot.docs.length !== 0) {
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const {
          titleBulk,
          emailAuthorBulk,
          subjectBulk,
          messageOfEmailBulk,
          statusBulk,
          date,
        } = doc.data();
        BulkNotificationData.push({
          id,
          titleBulk,
          emailAuthorBulk,
          subjectBulk,
          messageOfEmailBulk,
          statusBulk,
          date,
        });
      });

      return BulkNotificationData;
    }

    return [];
  } catch (error) {
    console.log({ error: error });
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestToUpdateBulkNotificationData({
  titleBulk,
  emailAuthorBulk,
  subjectBulk,
  messageOfEmailBulk,
  statusBulk,
  id,
}: BulkNotificationDataType) {
  try {
    const docRef = doc(db, "BulkNotificationData", id);

    const date = new Date().toUTCString();
    await updateDoc(docRef, {
      titleBulk,
      emailAuthorBulk,
      subjectBulk,
      messageOfEmailBulk,
      statusBulk,
      date,
    });

    return {
      message: " success",
      success: true,
    };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

requestToSetAutoresponderData; */

export interface AutoresponderDataType {
  webinarValue: string;
  autoresponderValue: string;
  firstNameValue: string;
  emailValue: string;
  phoneValue: string;
  supportHTTPSValue: boolean;
  communityId?: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
}
export async function requestToSetAutoresponderData({
  webinarValue,
  autoresponderValue,
  firstNameValue,
  emailValue,
  phoneValue,
  supportHTTPSValue,
}: AutoresponderDataType) {
  try {
    const NotifRef = collection(db, "AutoresponderData");
    const date = new Date().toUTCString();
    await setDoc(doc(NotifRef), {
      webinarValue,
      autoresponderValue,
      firstNameValue,
      emailValue,
      phoneValue,
      supportHTTPSValue,
      date,
    });
    return { message: " success", success: true };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export interface FacebookShareData {
  facebookPostTitle: string;
  facebookPostDescription: string;
  facebookPostImage: string;
  communityId?: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
}

export async function requestToSetFacebookShareData({
  facebookPostTitle,
  facebookPostDescription,
  facebookPostImage,
}: FacebookShareData) {
  try {
    const NotifRef = collection(db, "FacebookShareData");
    const date = new Date().toUTCString();
    await setDoc(doc(NotifRef), {
      facebookPostTitle,
      facebookPostDescription,
      facebookPostImage,
      date,
    });
    return { message: " success", success: true };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export interface CustumScriptData {
  fBRetargetingPixel: string;
  perfectAudiencePixel: string;
  codeSnippet: string;
  communityId?: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
}

export async function requestToSetCustumScriptData({
  fBRetargetingPixel,
  perfectAudiencePixel,
  codeSnippet,
}: CustumScriptData) {
  try {
    const NotifRef = collection(db, "CustumScriptData ");
    const date = new Date().toUTCString();
    await setDoc(doc(NotifRef), {
      fBRetargetingPixel,
      perfectAudiencePixel,
      codeSnippet,
      date,
    });
    return { message: " success", success: true };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export interface CNAMEData {
  CNAMEURL: string;

  communityId: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
}

export async function requestToSetCNAMEData({ CNAMEURL }: CNAMEData) {
  try {
    const NotifRef = collection(db, "CNAMEData ");
    const date = new Date().toUTCString();
    await setDoc(doc(NotifRef), {
      CNAMEURL,
      date,
    });
    return { message: " success", success: true };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export interface WebhookUrlData {
  webhookUrl: string;
  communityId: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
}

export async function requestToSetWebhookUrlData({
  webhookUrl,
}: WebhookUrlData) {
  try {
    const NotifRef = collection(db, "WebhookUrlData ");
    const date = new Date().toUTCString();
    await setDoc(doc(NotifRef), {
      webhookUrl,
      date,
    });
    return { message: " success", success: true };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export interface PopupBannersDataType {
  title: string;
  targetUrl: string;
  image: string;
  types: string;
  status: string;
  statusCommunityPage: string;
  statusGroupePage: string;
  groupePageAssociate: GroupeDataType[];
  communityId?: string;
  id?: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
}

export interface BannersAdsDataType {
  title: string;
  targetUrl: string;
  image: string;
  status: string;
  statusCommunityPage: string;
  statusGroupePage: string;
  groupePageAssociate: GroupeDataType[];
  communityId?: string;
  id?: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
}

/* export async function requestTogetAllPopupBannersData(): Promise<
  PopupBannersDataType[]
> {
  let PopupBannersData: PopupBannersDataType[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, "BulkNotificationData"));
    console.log({ length: querySnapshot.docs.length });
    if (querySnapshot.docs.length !== 0) {
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const {
          title,
          targetUrl,
          image,
          types,
          status,
          statusCommunityPage,
          statusGroupePage,
          groupePageAssociate,
          dateOfCreation,
          dateOfUpdate,
        } = doc.data();
        PopupBannersData.push({
          id,
          title,
          targetUrl,
          image,
          types,
          status,
          statusCommunityPage,
          statusGroupePage,
          groupePageAssociate,
          dateOfCreation,
          dateOfUpdate,
        });
      });

      return PopupBannersData;
    }

    return [];
  } catch (error) {
    console.log({ error: error });
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
} */

export async function requestTogetAllUniversalData<T>(
  databaseName: string
): Promise<T[]> {
  let data: T[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, databaseName));
    console.log({ length: querySnapshot.docs.length });
    if (querySnapshot.docs.length !== 0) {
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        console.log(id);
        const partialdata = doc.data();
        data.push({
          id,
          ...partialdata,
        } as T);
      });

      return data;
    }

    return [];
  } catch (error) {
    console.log({ error: error });
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestToSetUniversalData<T>(
  databaseName: string,
  dataToSend: T
) {
  try {
    const NotifRef = collection(db, databaseName);
    const dateOfCreation = new Date().toUTCString();
    const dateOfUpdate = new Date().toUTCString();
    await setDoc(doc(NotifRef), {
      ...dataToSend,
      dateOfCreation,
      dateOfUpdate,
    });
    return { message: " success", success: true };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}

export async function requestToGetAllUniversalDataWithId<T>(
  parameterId: string,
  databaseName: string
): Promise<T> {
  try {
    const docRef = doc(db, databaseName, parameterId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const result = { ...docSnap.data() };
      return result as T;
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

export async function requestToDeleteUniversalDataWithId(
  dataId: string,
  databaseName: string
) {
  const docRef = doc(db, databaseName, dataId);
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

export interface PointDactiviteData {
  postScore: number;
  commentScore: number;
  likesScore: number;
  viralShareScore: number;
  groupeData: GroupeDataType;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
}

export interface CreateBadgeData {
  nomBadge: string;
  imageBadge: string;
  groupeData: GroupeDataType;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  savedState: boolean;
  pointNecessaire: number;
  id?: string;
}

export interface PrivacyPolicyData {
  title: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  communityId?: string;
  privacyPolicyText: string;
  id?: string;
}

export interface TermsData {
  title: string;
  communityId?: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  termsText: string;
  id?: string;
}

export interface OtherSettingData {
  manualPaymentStatus: string;
  RTL: string;
  GPRSettings: string;
  GDPRMandatory: string;
  PhoneNumberRequired: string;
  ValueAddedTaxStatus: string;
  ValueAddedTax: number;
  DefaultCurrency: string;
  LastName: string;
  Gender: string;
  Phone: string;
  DateofBirth: string;
  MemberCount: string;
  PhoneNumberCountryCodeStatus: string;
  PhoneNumberCountryCode: string;
  communityId?: string;
  dateOfCreation?: string;
  dateOfUpdate?: string;
  id?: string;
}

export async function requestToUpdateUniversalDataWithId<T>(
  parameterId: string,
  databaseName: string,
  data: T
) {
  try {
    const docRef = doc(db, databaseName, parameterId);

    const dateOfUpdate = new Date().toUTCString();
    await updateDoc(docRef, {
      ...data,
      dateOfUpdate,
    });

    return {
      message: " success",
      success: true,
    };
  } catch (error) {
    throw new Error(
      "Une erreur est survenue pendant la récupération des données"
    );
  }
}
