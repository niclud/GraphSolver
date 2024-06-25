import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
} from "@nextui-org/autocomplete";

export const ModalSelectInitAndEnd = (props: {
  isOpen: any;
  onOpenChange: any;
  nodes: any[];
}) => {
  //const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Seleccione un nodo de incio y fin
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Autocomplete label="Selecciona un nodo de inicio" className="max-w-xs">
                    {props.nodes.map((node, index) => (
                      <AutocompleteItem key={index} value={node}>
                        {node}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                  <Autocomplete label="Selecciona un nodo de fin" className="max-w-xs">
                    {props.nodes.map((node, index) => (
                      <AutocompleteItem key={index} value={node}>
                        {node}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
