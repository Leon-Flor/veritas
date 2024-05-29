import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (question: string) => void;
}

const schema = yup.object().shape({
  question: yup.string().required("Debes de ingresar un titulo").max(20),
});

export const CreateQuestionFragment = ({
  isOpen,
  onClose,
  onSubmit,
}: IModalProps) => {
  const { control, getValues, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      question: "",
    },
    resolver: yupResolver(schema),
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isDismissable
      isKeyboardDismissDisabled
    >
      <ModalContent>
        <ModalHeader>Create Question</ModalHeader>
        <ModalBody>
          <Controller
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                isInvalid={!!formState.errors.question}
                errorMessage={formState.errors.question?.message}
              />
            )}
            name="question"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onPress={onClose}>
            Close
          </Button>
          <Button
            disabled={!formState.isValid}
            color={!formState.isValid ? "default" : "primary"}
            onPress={() => onSubmit(getValues().question)}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
