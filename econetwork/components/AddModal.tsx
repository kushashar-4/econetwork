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
import React, { useState } from "react";
import { useGlobalContext } from "@/contexts/AuthContext";
import { db } from "@/app/firebaseconfig";
import { push, ref } from "firebase/database";

export default function AddModal(props: any) {
  const uid = useGlobalContext();
  const [itemName, setItemName] = useState<React.Key>("");
  const [itemCount, setItemCount] = useState<string>("");
  const [pointValue, setPointValue] = useState<number>(0);

  const addData = async () => {
    const recyclingRef = ref(db, uid!);

    for (let i = 0; i < recycleItems.length; i++) {
      if (recycleItems[i].name == itemName) {
        setPointValue(recycleItems[i].pointValue);
      }
    }

    const recyclingObj = {
      itemName: itemName,
      itemCount: itemCount,
      pointValue: pointValue,
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
                {recycleItems.map((recycleItem) => (
                  <AutocompleteItem
                    key={recycleItem.name}
                    value={recycleItem.pointValue}
                  >
                    {recycleItem.name}
                  </AutocompleteItem>
                ))}
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
