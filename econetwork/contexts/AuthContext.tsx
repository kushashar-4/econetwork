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
import { db } from "../app/firebaseconfig";
import { useList } from "react-firebase-hooks/database";
import { ref } from "firebase/database";

const GlobalContext = createContext(null as string | null);

export const GlobalContextProvider = ({ children }: { children: any }) => {
  const [user] = useAuthState(auth);
  const userId = user?.uid;

  const [snapshots, loading, error] = useList(ref(db, userId));

  return (
    <GlobalContext.Provider value={userId || null}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
