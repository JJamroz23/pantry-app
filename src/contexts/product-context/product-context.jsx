// import { createContext, useState, useEffect } from "react";
// import {
//   productToDocAdd,
//   getProductFromBase,
// } from "../../utils/firebase/firebase.utils";

// export const ProductContext = createContext({
//   product: [],
// });

// export const ProductProvider = ({ children }) => {
//   const [product, setProduct] = useState([]);

//   useEffect(() => {
//     if (productToDocAdd) {
//       getProductFromBase();
//     }
//   }, []);

//   const value = { product };
//   return (
//     <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
//   );
// };
