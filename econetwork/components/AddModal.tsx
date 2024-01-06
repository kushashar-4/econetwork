import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
} from "@nextui-org/react";
import { recycleItems } from "@/utils/RecycleItems";

import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/contexts/AuthContext";

import { db } from "@/app/firebaseconfig";
import { push, ref } from "firebase/database";
import { groupBy } from "lodash";

export default function AddModal(props: any) {
  const { userId } = useGlobalContext()!;
  const [itemName, setItemName] = useState<React.Key>("");
  const [itemCount, setItemCount] = useState<string>("");

  const addData = async () => {
    const recyclingRef = ref(db, userId! + "/" + "recycleItems");

    const pointValue = recycleItems.find((item) => item.name === itemName)
      ?.pointValue as number;

    const recyclingObj = {
      itemName: itemName,
      itemCount: itemCount,
      pointValue: pointValue * (itemCount as any),
    };

    push(recyclingRef, recyclingObj);
  };

  return (
    <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-green text-xl">
              Recycle an Item
            </ModalHeader>
            <ModalBody>
              <Autocomplete
                label="Choose an Item"
                onSelectionChange={(key: React.Key) => {
                  setItemName(key);
                }}
              >
                {Object.keys(groupBy(recycleItems, "pointValue")).map(
                  (pointValue) => (
                    <AutocompleteSection
                      title={`${pointValue} points`}
                      key={pointValue}
                    >
                      {groupBy(recycleItems, "pointValue")[pointValue].map(
                        (item) => (
                          <AutocompleteItem key={item.name}>
                            {item.name}
                          </AutocompleteItem>
                        )
                      )}
                    </AutocompleteSection>
                  )
                )}
              </Autocomplete>
              <Input
                label="Amount"
                type="number"
                onChange={(e) => {
                  setItemCount(e.target.value);
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
                onClick={addData}
              >
                Recycle
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
