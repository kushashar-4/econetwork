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
import { db } from "@/app/firebaseconfig";
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useGlobalContext } from "@/contexts/AuthContext";

export default function AddModal(props: any) {
  const uid = useGlobalContext();
  const [itemName, setItemName] = useState("");
  const [pointValue, setPointValue] = useState("");

  const addItem = async () => {
    await setDoc(doc(db, "recycleItems", uid), {
      itemName: itemName,
      pointValue: pointValue,
    });
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
                onChange={(e) => {
                  setItemName(e.target.value);
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
                  setPointValue(e.target.value);
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
                onClick={addItem}
                className="bg-green"
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
