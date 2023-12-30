"use client";
import NavbarComponent from "@/components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseconfig";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../contexts/AuthContext";
import AddModal from "@/components/AddModal";
import { Button, useDisclosure } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { ref, onValue } from "firebase/database";
import { db } from "@/app/firebaseconfig";

export default function Dashboard(props: any) {
  const uid = useGlobalContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  let recycleItemsArr;

  const loadData = async () => {
    const recyclingRef = ref(db, uid!);
    onValue(recyclingRef, (snapshot) => {
      if (snapshot.exists()) {
        recycleItemsArr = Object.entries(snapshot.val());
        console.log(recycleItemsArr);
      }
    });
  };

  useEffect(() => {
    loadData();
  });

  return uid ? (
    <div className="bg-green min-h-screen flex flex-col items-center gap-8">
      <NavbarComponent></NavbarComponent>
      <section className="py-6">
        <div className="flex flex-col items-center bg-white py-3 px-8 rounded-2xl gap-4">
          <div className="flex justify-center items-center gap-[200px]">
            <p className="text-2xl font-medium text-green">Dashboard</p>
            <Button size="md" className="text-white bg-green">
              Info
            </Button>
          </div>
          <div className="flex justify-center items-center gap-[120px]">
            <div className="flex flex-col items-center">
              <p className="text-green text-lg font-medium">
                Recently Recycled
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-green text-lg font-medium">Point Statistics</p>
            </div>
          </div>
          <div>
            <Button
              size="md"
              onPress={onOpen}
              className="font-medium text-white text-md bg-green"
            >
              Recycle an Item
            </Button>
          </div>
        </div>
      </section>

      <AddModal isOpen={isOpen} onOpenChange={onOpenChange}></AddModal>
    </div>
  ) : null;
}
