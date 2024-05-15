import { Button, Modal, ModalContent } from "@nextui-org/react";
import QRCode from "react-qr-code";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  quizId: string;
  onStart: () => void;
  onEdit: () => void;
}

export const OptionModal = ({
  isOpen,
  onClose,
  quizId,
  onEdit,
  onStart,
}: IProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent className="flex flex-col p-8 gap-8 items-center justify-center">
        <QRCode
          className="p-2 border-2 rounded-lg border-primary"
          value={`${window.location.origin}/quiz/${quizId}`}
          color="red"
        />
        <div className="w-full flex gap-8 items-center justify-center text-center text-white">
          <Button onPress={onEdit} color="primary" variant="bordered">
            Editar
          </Button>
          <Button onPress={onStart} color="success">
            Iniciar
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};
