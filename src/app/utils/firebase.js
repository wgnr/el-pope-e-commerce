import * as firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};
const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore(app);

export async function getCollection(collectionName, where) {
  let result = [];

  try {
    const collection = db.collection(collectionName);
    const querySnapshot = where
      ?
      await collection.where(where.field, where.comparator, where.value).get()
      :
      await collection.get();

    result = querySnapshot.docs.map(doc => ({
      ...doc.data(), id: doc.id
    }));
  } catch (e) {
    console.error(`Error getting collection ${collectionName}:`, e);
  } finally {
    return result
  }
}

export async function getDocument(collection, documentId) {
  const doc = await db.collection(collection).doc(documentId).get();
  return doc.exists
    ?
    {
      ...doc.data(),
      id: doc.id,
    }
    :
    undefined;
}