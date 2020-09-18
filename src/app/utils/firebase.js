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
const db = firebase.firestore(app);

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

export async function getItemsByCategory(categoryKey) {
  const categoryArr = await getCollection("categories", {
    field: "key",
    comparator: "==",
    value: categoryKey
  });
  // Category not found
  if (categoryArr.length === 0) return []

  // Items in category
  const categoryId = categoryArr[0].id;
  const itemsArr = await getCollection("items", {
    field: "idCategory",
    comparator: "==",
    value: categoryId
  });

  return itemsArr
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

export async function createNewOrder(order) {
  // Check items stock vs requested
  const selectedItemsQuery = await db.collection("items")
    .where(
      firebase.firestore.FieldPath.documentId(),
      'in',
      order.items.map(item => item.id))
    .get();

  const selectedItems = selectedItemsQuery.docs.map(item => ({
    ...item.data(),
    id: item.id,
    ref: item.ref // Later will be used to update stock
  }));

  const errorMessages = [];

  order.items.forEach(orderedItem => {
    const selectedItem = selectedItems.find(item => item.id === orderedItem.id);
    if (!selectedItem) {
      errorMessages.push(`${orderedItem.title}: Item doesn't exist in DB.`)
    } else if (selectedItem.stock < orderedItem.quantity) {
      errorMessages.push(`${orderedItem.title}: Ordered quantity ${orderedItem.quantity} is greater than stock ${selectedItem.stock}.`)
    }
  });

  if (errorMessages.length !== 0) {
    return { success: false, message: errorMessages.join("\n") }
  } else if (selectedItems.length !== order.items.length) {
    return { success: false, message: "Error: Items ordered length doesn't match items queried length." }
  }

  // All items are OK! Commit order!
  const batch = db.batch();
  // Update stock
  selectedItems.forEach(selectedItem => {
    const orderedItem = order.items.find(ordItem => ordItem.id === selectedItem.id);
    batch.update(selectedItem.ref, { stock: selectedItem.stock - orderedItem.quantity })
  })
  // Create order
  order.date = firebase.firestore.FieldValue.serverTimestamp();
  const orderRef = db.collection("orders").doc();
  batch.set(orderRef, order);

  try {
    await batch.commit();
    return { success: true, message: orderRef.id }
  } catch (e) {
    return { success: false, message: e }
  }
}