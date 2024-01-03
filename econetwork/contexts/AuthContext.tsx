"use client";
import { recycleItems } from "@/utils/RecycleItems";
import { onValue, ref } from "firebase/database";
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

const GlobalContext = createContext(null as string | null);

export const GlobalContextProvider = ({ children }: { children: any }) => {
  const [user] = useAuthState(auth);
  const userId = user?.uid;
  const recyclingRef = ref(db, userId!);
  let recycleItemsArr: any;
  let totalPoints;

  const calculatePoints = async () => {
    const userIndex = recycleItemsArr.findIndex(
      (item: any) => Array.isArray(item) && item[0] === userId
    );

    for (let i = 0; i < recycleItemsArr.length; i++) {
      console.log(recycleItemsArr[userIndex][i]);
    }
  };

  onValue(recyclingRef, (snapshot) => {
    if (snapshot.exists()) {
      recycleItemsArr = Object.entries(snapshot.val());
      calculatePoints();
    }
  });

  return (
    <GlobalContext.Provider value={userId || null}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
