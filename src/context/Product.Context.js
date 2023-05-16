import { createContext } from "react";

import productUpdate from "../hooks/productUpdate";

const Context = createContext();

function ProductProvider({ children }) {
  const { update } = productUpdate();

  return <Context.Provider value={update}>{children}</Context.Provider>;
}

export { Context, ProductProvider };
