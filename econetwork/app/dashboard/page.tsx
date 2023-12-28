"use client";
import NavbarComponent from "@/components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseconfig";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../contexts/AuthContext";
import AddModal from "@/components/AddModal";
import { Button, useDisclosure } from "@nextui-org/react";

export default function Dashboard() {
  const uid = useGlobalContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return uid ? (
    <div className="bg-green min-h-screen flex flex-col items-center gap-8">
      <NavbarComponent></NavbarComponent>
      <section className="py-6">
        <p className="text-3xl font-bold text-white">Recycling Dashboard</p>
      </section>
      <Button
        size="md"
        onPress={onOpen}
        className="font-medium text-green text-md bg-white"
      >
        Recycle an Item
      </Button>
      <AddModal isOpen={isOpen} onOpenChange={onOpenChange}></AddModal>
    </div>
  ) : null;
}
