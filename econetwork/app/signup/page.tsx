"use client";
import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { auth } from "../firebaseconfig";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [createUserWithEmailAndPassoword] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassoword(email, password);
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
      <div className="flex gap-6 flex-col bg-white rounded-2xl p-6">
        <h1 className="text-2xl font-bold">Sign up For Eco Network</h1>
        <div className="flex gap-6">
          <div className="flex flex-col items-start gap-4 text-md">
            <p className="max-w-xs">
              Be sure to sign up to participate in challenges, log your
              recycling, and start an initiative!
            </p>
            <p className="max-w-xs">
              We offer an engaging and interactive way to promote healthy
              garbage disposal habits. Through our point-based recycling system,
              we hope to see you compete in our recycling competitions!
            </p>
          </div>
          <div className="w-0 border-r"></div>
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-col gap-1">
              <input
                type="name"
                placeholder="Name"
                className="px-2 py-1 rounded-lg border"
              ></input>
              <input
                type="email"
                placeholder="Email"
                className="px-2 py-1 rounded-lg border"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <input
                type="password"
                placeholder="Password"
                className="px-2 py-1 rounded-lg border"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <Button
              className="bg-green w-max text-white"
              size="md"
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
            <p className="text-sm text-black mt-auto">
              Have an account already?{" "}
              <a href="/login" className="text-green">
                Log In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
