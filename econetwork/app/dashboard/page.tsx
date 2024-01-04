"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../contexts/AuthContext";

import AddModal from "@/components/AddModal";
import { Button, useDisclosure } from "@nextui-org/react";
import NavbarComponent from "@/components/Navbar";
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Progress,
} from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import React from "react";
import { ref, push } from "firebase/database";
import { db } from "../firebaseconfig";

export default function Dashboard(props: any) {
  const { userId, totalPoints, personalGoals, setPersonalGoals } =
    useGlobalContext()!;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const recyclingRef = ref(db, userId!);

  useEffect(() => {
    console.log(personalGoals);
  }, [personalGoals]);

  return userId ? (
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
            <AddPersonalGoal
              personalGoals={personalGoals}
              setPersonalGoals={setPersonalGoals}
            ></AddPersonalGoal>
          </div>
        </div>
      </section>

      <AddModal isOpen={isOpen} onOpenChange={onOpenChange}></AddModal>
    </div>
  ) : (
    <div className="flex flex-col min-h-screen items-center justify-center bg-green">
      <Spinner color="white" size="lg" />
    </div>
  );
}

function PersonalGoalDisplay(props: any) {
  return (
    <Progress
      size="md"
      radius="sm"
      classNames={{
        base: "max-w-md",
        track: "drop-shadow-md border border-default",
        indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
        label: "tracking-wider font-medium text-default-600",
        value: "text-foreground/60",
      }}
      label="Goal Progress"
      value={props.totalPoints}
      maxValue={props.maxValue}
    ></Progress>
  );
}

function AddPersonalGoal(props: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [number, setNumber] = useState<number>();
  const [dayLimit, setDayLimit] = useState<number>();
  const { userId, totalPoints, personalGoals, setPersonalGoals } =
    useGlobalContext()!;

  const handleGoalAdd = async () => {
    const dataObj = {
      number,
      dayLimit,
    };

    setPersonalGoals((p: any[]) => [...p, dataObj]);
  };

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
                <Input
                  type="number"
                  label="Point Amount"
                  onChange={(e) => {
                    setNumber(parseInt(e.target.value));
                  }}
                ></Input>
                <Input
                  type="number"
                  label="Day Limit"
                  onChange={(e) => {
                    setDayLimit(parseInt(e.target.value));
                  }}
                ></Input>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  className="bg-green"
                  onClick={handleGoalAdd}
                >
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
