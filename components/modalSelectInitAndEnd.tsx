import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import {
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/autocomplete";
import { useState } from "react";

export interface StartAndEndNodes {
  start: string;
  end: string;
}

const InitStartAndEndNodes = {
  start: "",
  end: "",
};

export const ModalSelectInitAndEnd = (props: {
  isOpen: any;
  onOpenChange: any;
  nodes: any[];
  handleClickResolver: any;
}) => {
  const [startAndEndNodes, setStartAndEndNodes] =
    useState<StartAndEndNodes>(InitStartAndEndNodes);
  const handleClick = () => {
    props.handleClickResolver(startAndEndNodes);
    setStartAndEndNodes(InitStartAndEndNodes);
  };

  const handleChangeStartNode = (value: any) => {
    setStartAndEndNodes({ ...startAndEndNodes, start: value });
  };

  const handleChangeEndNode = (value: any) => {
    setStartAndEndNodes({ ...startAndEndNodes, end: value });
  };

  const getIsDisableButton = () => {
    return startAndEndNodes.start == "" || startAndEndNodes.end == "";
  };
  return (
    <>
      <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange} size="2xl" placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Seleccione un nodo de inicio y fin
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Autocomplete
                    label="Selecciona un nodo de inicio"
                    className="max-w-xs"
                    onSelectionChange={handleChangeStartNode}
                  >
                    {props.nodes.map((node, index) => (
                      <AutocompleteItem key={node} value={node}>
                        {node}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                  <Autocomplete
                    label="Selecciona un nodo de fin"
                    className="max-w-xs"
                    onSelectionChange={handleChangeEndNode}
                  >
                    {props.nodes.map((node, index) => (
                      <AutocompleteItem key={node} value={node}>
                        {node}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => {
                  onClose()
                  setStartAndEndNodes(InitStartAndEndNodes)
                  }}>
                  Cerrar
                </Button>
                <Button
                  color="primary"
                  style={{background: getIsDisableButton() ? 'gray' : ''}}
                  disabled={getIsDisableButton()}
                  onPress={() => {
                    if(getIsDisableButton()) return;
                    onClose();
                    handleClick();
                  }}
                >
                  Resolver
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
