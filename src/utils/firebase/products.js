import {
  doc,
  setDoc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import omit from "lodash/omit";
import { database } from "./";

export const getProducts = async (userId) => {
  // zaciaga dane
  console.log(1);
  const querySnapshot = await getDocs(
    collection(database, `users/${userId}/products`)
  );
  console.log(2, querySnapshot);
  const x = querySnapshot.docs
    .map((doc) => ({
      ...doc.data(),
      uid: doc.id,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return x;
};

export const deleteProductDoc = async (userId, productId) => {
  console.log(productId);
  await deleteDoc(doc(database, `users/${userId}/products`, productId));
};

export const addProductDoc = async (userId, productDto) => {
  try {
    console.log(productDto, "122");
    const productsRef = doc(
      database,
      `users/${userId}/products`,
      productDto.uid || uuidv4()
    );
    await setDoc(productsRef, omit(productDto, "uid"), { merge: true });
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

// export const getProductFromBase = async () => {
//   // const collectionRef = collection(database, `users/`);
//   const { productData } = productToDocAdd;
//   const productDetails = await getDocs(productData);
//   const productInfo = productDetails.docs.map((doc) => ({
//     ...doc.data(),
//     id: doc.id,
//   }));
//   console.log(productInfo);
// };
