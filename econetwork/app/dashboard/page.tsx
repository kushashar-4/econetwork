"use client";
import NavbarComponent from "@/components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseconfig";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const uid = useGlobalContext();
  const router = useRouter();

  return uid ? (
    <div className="bg-green min-h-screen flex flex-col items-center gap-8">
      <NavbarComponent></NavbarComponent>
      <section className="py-6">
        <p className="text-3xl font-bold text-white">Recycling Dashboard</p>
      </section>
    </div>
  ) : (
    router.push("/")
  );
}
