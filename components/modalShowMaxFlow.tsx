import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "@nextui-org/modal";
  import { Button } from "@nextui-org/button";
  
  export const ModalShowMaxFlow = (props: {
    isOpen: any;
    onOpenChange: any;
    maxFlow: string;
  }) => {
    return (
      <>
        <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange} size="md" placement="top-center">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Flujo máximo encontrado.
                </ModalHeader>
                <ModalBody>
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <p>El flujo máximo es: {props.maxFlow}</p>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onPress={() => {
                      onClose();
                    }}
                  >
                    Cerrar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  };