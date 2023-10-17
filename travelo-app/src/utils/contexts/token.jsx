import {
  createContext,
  useMemo,
  useState,
  useContext,
  useCallback,
} from "react";

const contextValue = {
  token: "",
  changeToken: () => {},
};

const ThemeContext = createContext(contextValue);

function TokenProvider({ children }) {
  const initialValue = localStorage.getItem("user") ?? "";
  const [token, setToken] = useState(initialValue);

  const changeToken = useCallback(
    (data) => {
      const newData = data ?? "";
      if (data) {
        localStorage.setItem("user", newData);
      } else {
        localStorage.removeItem("user");
      }
      setToken(newData);
    },
    [token]
  );

  const tokenContextValue = useMemo(
    () => ({
      token,
      changeToken,
    }),
    [token, changeToken]
  );

  return (
    <ThemeContext.Provider value={tokenContextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

function useToken() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    console.log("ERROR, useToken must be used within TokenContext");
  }

  return context;
}

export { TokenProvider, useToken };

// import { createContext, useState, useMemo, useContext } from "react";

// const TokenContext = createContext("");

// function TokenProvider({ children }) {
//   const [token, setToken] = useState("");

//   const tokenContextValue = useMemo(
//     () => ({
//       token,
//       setToken,
//     }),
//     [token]
//   );

//   return (
//     <TokenContext.Provider value={tokenContextValue}>
//       {children}
//     </TokenContext.Provider>
//   );
// }

// function useToken() {
//   const tokenContext = useContext(TokenContext);

//   if (tokenContext === undefined) {
//     console.log("ERROR, useToken must be used within TokenContext");
//   }

//   return tokenContext;
// }

// export { TokenProvider, useToken };
