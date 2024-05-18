import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

interface IModalConfirmationProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const ModalConfirmation = ({
  isOpen,
  onConfirm,
  onClose,
}: IModalConfirmationProps) => {
  return (
    <Modal
      isOpen={isOpen}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
        <ModalBody>
          <p>Estás seguro de realizar esta operación?</p>
          <p>
            Al realizar esta acción, se llevará a cabo un cambio significativo
            en la configuración actual. Por favor, asegúrate de entender
            completamente las implicaciones de esta acción antes de proceder.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={onConfirm}>
            Action
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
