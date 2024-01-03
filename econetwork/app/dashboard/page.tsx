"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../contexts/AuthContext";

import AddModal from "@/components/AddModal";
import { Button, useDisclosure } from "@nextui-org/react";
import NavbarComponent from "@/components/Navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";

import { ref, onValue } from "firebase/database";
import { db } from "@/app/firebaseconfig";
import { auth } from "../firebaseconfig";
import React from "react";

export default function Dashboard(props: any) {
  const uid = useGlobalContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  let recycleItemsArr;

  const loadData = () => {
    console.log(uid);
    const recyclingRef = ref(db, uid!);

    onValue(recyclingRef, (snapshot) => {
      if (snapshot.exists()) {
        recycleItemsArr = Object.entries(snapshot.val());
        console.log(recycleItemsArr);
      }
    });
  };

  useEffect(() => {
    if (!uid) return;

    loadData();
  }, [uid]);

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
          <div className="flex justify-center gap-4">
            <Button
              size="md"
              onPress={onOpen}
              className="font-medium text-white text-md bg-green"
            >
              Recycle an Item
            </Button>
            <AddPersonalGoal></AddPersonalGoal>
          </div>
        </div>
      </section>

      <AddModal isOpen={isOpen} onOpenChange={onOpenChange}></AddModal>
    </div>
  ) : (
    <Spinner />
  );
}

function AddPersonalGoal(props: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        size="md"
        onPress={onOpen}
        className="font-medium text-white text-md bg-green"
      >
        Set a Goal
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-green text-xl">
                Set a Goal
              </ModalHeader>
              <ModalBody>
                <Input type="number" label="Point Amount"></Input>
                <Input type="number" label="Day Limit"></Input>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose} className="bg-green">
                  Set
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
