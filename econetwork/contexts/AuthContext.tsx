"use client";
import { recycleItems } from "@/utils/RecycleItems";
import { onValue, ref } from "firebase/database";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../app/firebaseconfig";
import { db } from "../app/firebaseconfig";

type contextType = {
  userId: string | null;
  totalPoints: number;
  personalGoalsArr: any;
  recyclingItemsArr: any;
};

const GlobalContext = createContext(null as contextType | null);

export const GlobalContextProvider = ({ children }: { children: any }) => {
  const [user] = useAuthState(auth);
  const userId = user?.uid;
  const recyclingRef = ref(db, userId + "/" + "recycleItems");

  const personalGoalsRef = ref(db, userId + "/" + "personalGoals");
  let personalGoalsArr: [string, unknown][] = [];

  const [recyclingItemsArr, setRecyclingItemsArr] = useState<
    [string, number][]
  >([]);
  const [totalPoints, setTotalPoints] = useState(0);

  // onValue(recyclingRef, (snapshot) => {
  //   if (snapshot.exists()) {
  //     console.log("exists");
  //     const items = Object.entries(snapshot.val()) as [string, number][];

  //     setRecyclingItemsArr(items);
  //     setTotalPoints(items.reduce((a, c) => a + c[1], 0));
  //   }
  // });

  onValue(personalGoalsRef, (snapshot) => {
    if (snapshot.exists()) {
      personalGoalsArr = Object.entries(snapshot.val());
    }
  });

  const returnValues = {
    userId: userId || null,
    totalPoints,
    personalGoalsArr,
    recyclingItemsArr,
  };

  return (
    <GlobalContext.Provider value={returnValues || null}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
