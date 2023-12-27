"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseconfig";

export default function Dashboard() {
  const [user] = useAuthState(auth);

  console.log(user);

  return <div></div>;
}
