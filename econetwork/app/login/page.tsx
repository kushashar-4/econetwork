"use client";
import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { auth } from "../firebaseconfig";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const handleLogIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log({ res });
      setEmail("");
      setPassword("");
      router.push("/");
    } catch (e) {
      console.log("Error", e);
    }
  };

  return (
    <div className="min-h-screen bg-green flex flex-col items-center justify-center">
      <div className="flex justify-center items-center gap-12 bg-white rounded-2xl p-6">
        <div className="flex flex-col items-start gap-4">
          <p className="text-2xl font-bold">Log in To Eco Network</p>
          <p className="text-lg max-w-xs font-medium">
            Be sure to sign up to participate in challenges, log your recycling,
            and start an initiative!
          </p>
          <p className="text-md max-w-xs">
            We offer an engaging and interactive way to promote healthy garbage
            disposal habits. Through our point-based recycling system, we hope
            to see you compete in our recycling competitions!
          </p>
        </div>
        <div className="flex flex-col items-start gap-6">
          <div className="flex flex-col gap-3">
            <input type="name" placeholder="Name"></input>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <Button
            className="bg-green w-max text-white"
            size="md"
            onClick={handleLogIn}
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
}
