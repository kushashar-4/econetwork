"use client";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../app/firebaseconfig";
import { collection } from "firebase/firestore";
import { db } from "../app/firebaseconfig";

const GlobalContext = createContext(null as string | null);

export const GlobalContextProvider = ({ children }: { children: any }) => {
  const [user] = useAuthState(auth);
  const userId = user?.uid;

  return (
    <GlobalContext.Provider value={userId || null}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
