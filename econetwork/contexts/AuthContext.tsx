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

type contextType = {
  userId: string | null;
  totalPoints: number;
  personalGoals: Record<string, any>[];
  setPersonalGoals: any;
};

const GlobalContext = createContext(null as contextType | null);

export const GlobalContextProvider = ({ children }: { children: any }) => {
  const [user] = useAuthState(auth);
  const userId = user?.uid;
  const recyclingRef = ref(db, userId!);
  let totalPoints = 0;
  const [personalGoals, setPersonalGoals] = useState([]);

  const calculatePoints = async (arr: [string, any][]) => {
    for (let i = 0; i < arr.length; i++) {
      const points = parseInt(arr[i][1].pointValue);
      totalPoints += points;
    }

    // console.log(totalPoints);
    // const userIndex = recycleItemsArr.findIndex(
    //   (item: any) => Array.isArray(item) && item[0] === userId
    // );
    // for (let i = 0; i < recycleItemsArr.length; i++) {
    //   console.log(recycleItemsArr[i]);

    // }
  };

  onValue(recyclingRef, (snapshot) => {
    if (snapshot.exists()) {
      const recycleItemsArr = Object.entries(snapshot.val());
      calculatePoints(recycleItemsArr);
    }
  });

  const returnValues = {
    userId: userId || null,
    totalPoints,
    personalGoals,
    setPersonalGoals,
  };

  return (
    <GlobalContext.Provider value={returnValues || null}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
