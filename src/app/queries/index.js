import {
  getCollection,
  db,
} from '../utils/firebase';
import {
  firestore,
} from 'firebase/app';


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


export async function createNewOrder(order) {
  // Check items stock vs requested
  const selectedItemsQuery = await db.collection("items")
    .where(
      // firebase.firestore.FieldPath.documentId(),
      firestore.FieldPath.documentId(),
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

  try {
    // All items are OK! Commit order!
    const batch = db.batch();
    // Update stock
    selectedItems.forEach(selectedItem => {
      const orderedItem = order.items.find(ordItem => ordItem.id === selectedItem.id);
      batch.update(selectedItem.ref, { stock: selectedItem.stock - orderedItem.quantity })
    })
    // Create order
    // order.date = firebase.firestore.FieldValue.serverTimestamp();
    order.date = firestore.FieldValue.serverTimestamp();
    const orderRef = db.collection("orders").doc();
    batch.set(orderRef, order);

    await batch.commit();
    return { success: true, message: orderRef.id }
  } catch (e) {
    return { success: false, message: e }
  }
}