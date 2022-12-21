import {
  doc,
  setDoc,
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import omit from "lodash/omit";
import { database } from "./";

export const getProducts = async (userId) => {
  const querySnapshot = await getDocs(
    collection(database, `users/${userId}/products`)
  );
  const x = querySnapshot.docs
    .map((doc) => ({
      ...doc.data(),
      uid: doc.id,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return x;
};

export const updateDecCurrentValue = async (
  userId,
  productId,
  currValue,
  decValue
) => {
  await updateDoc(doc(database, `users/${userId}/products/`, productId), {
    currentValue: currValue - decValue,
  });
};

export const updateCurrentValue = async (
  userId,
  productId,
  currValue,
  addValue
) => {
  await updateDoc(doc(database, `users/${userId}/products/`, productId), {
    currentValue: currValue + addValue,
  });
};

export const deleteProductDoc = async (userId, productId) => {
  await deleteDoc(doc(database, `users/${userId}/products`, productId));
};

export const addProductDoc = async (userId, productDto) => {
  try {
    const productsRef = doc(
      database,
      `users/${userId}/products`,
      productDto.uid || uuidv4()
    );
    await setDoc(
      productsRef,
      {
        ...omit(productDto, "uid"),
        currentValue: productDto.currentValue || 0,
      },
      { merge: true }
    );
  } catch (error) {
    console.error(error);
  }
};

export const addProductsDocs = async (userId, { products }) => {
  try {
    await Promise.all(
      products.map((productValues) => addProductDoc(userId, productValues))
    );
  } catch (error) {
    console.error(error);
  }
};
