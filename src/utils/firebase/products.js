// import { getAnalytics } from "firebase/analytics";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { database } from "./";

export const productToDocAdd = async (userId, productDto) => {
  try {
    const productsRef = doc(database, `users/${userId}/products`, uuidv4());
    await setDoc(productsRef, productDto);
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
