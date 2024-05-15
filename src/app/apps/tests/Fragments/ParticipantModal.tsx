import { Button, Input, Modal, ModalContent } from "@nextui-org/react";

interface IProps {
  isOpen: boolean;
  value: string;
  onTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleStart: () => void;
}

export const ParticipantModal = ({
  isOpen,
  value,
  onTextChange,
  handleStart,
}: IProps) => {
  return (
    <Modal isOpen={isOpen} hideCloseButton>
      <ModalContent className="flex flex-col p-8 gap-8 items-center justify-center">
        <Input
          label="Nombre de usuario"
          value={value}
          onChange={onTextChange}
        />
        <div className="w-full flex gap-8 items-center justify-center text-center text-white">
          <Button onPress={handleStart} color="success">
            Iniciar
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};
