//import { faker } from "@faker-js/faker";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { communityDataType } from "./mycomponents/communautePage/UpdateCommunaute";
import { faker } from "@faker-js/faker";
import { format } from "date-fns";
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
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const {
        titleGroupe,
        descriptionGroupe,
        logoUrlGroupe,
        banniereUrlGroupe,
        typeAccess,
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
      });
    });
    console.log({ drdr_drdr: groupeData[0].id });
    return groupeData;
  } catch (error) {
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
}: GroupeDataType) {
  try {
    const NotifRef = collection(db, "GroupeData");
    const date = format(
      faker.date.between({ from: "2023-01-01", to: Date.now() }),
      "'il ya' dd 'jours à' kk:mm"
    );
    await setDoc(doc(NotifRef), {
      titleGroupe,
      descriptionGroupe,
      logoUrlGroupe,
      banniereUrlGroupe,
      typeAccess,
      date,
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
  const date = format(
    faker.date.between({ from: "2023-01-01", to: Date.now() }),
    "'il ya' dd 'jours à' kk:mm"
  );
  try {
    const {
      titleGroupe,
      descriptionGroupe,
      typeAccess,
      id,
      banniereUrlGroupe,
      logoUrlGroupe,
    } = singleGroupeData;
    await setDoc(doc(GroupeDataRef, id), {
      titleGroupe,
      descriptionGroupe,
      typeAccess,
      date,
      banniereUrlGroupe,
      logoUrlGroupe,
    });
    return { message: "La donnée a été envoyé avec success", success: true };
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
      } = docSnap.data();
      return {
        id,
        titleGroupe,
        descriptionGroupe,
        typeAccess,
        banniereUrlGroupe,
        logoUrlGroupe,
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
      console.log("Document data:", docSnap.data());
      const { title, description, logoUrl, banniereUrl } = docSnap.data();
      return { title, description, logoUrl, banniereUrl };
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
