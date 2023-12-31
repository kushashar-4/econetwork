"use client";
import { Button, Input } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { auth } from "../firebaseconfig";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import NavbarComponent from "@/components/Navbar";

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
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-col gap-2">
            <Input
              type="email"
              label="Email"
              size="sm"
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <Input
              type="password"
              label="Password"
              size="sm"
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </div>
          <Button
            className="bg-green w-max text-white"
            size="md"
            onClick={handleLogIn}
          >
            Log In
          </Button>
          <p className="text-sm text-black">
            Don't have an account yet?{" "}
            <a href="/signup" className="text-green">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
