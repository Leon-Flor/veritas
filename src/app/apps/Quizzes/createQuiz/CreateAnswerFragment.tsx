import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import "@aws-amplify/ui-react/styles.css";
import { useImage } from "@/hooks/useImage";
import { IconUpload } from "@tabler/icons-react";
import { useState } from "react";
import { v4 as uuidV4 } from "uuid";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (answer: string, img: unknown, id?: string) => void;
}

const schema = yup.object().shape({
  answer: yup.string().required("Debes de ingresar un titulo").max(20),
  img: yup.mixed().required("Debes de agregar una imagen"),
});

export const CreateAnswerFragment = ({
  isOpen,
  onClose,
  onSubmit,
}: IModalProps) => {
  const { control, getValues, formState, setValue, watch } = useForm({
    mode: "onChange",
    defaultValues: {
      answer: "",
    },
    resolver: yupResolver(schema),
  });

  const id = uuidV4();

  const { errors } = formState;
  const { img } = watch();

  const { imageCompress } = useImage();

  const [loading, setLoading] = useState(false);
  const handleUploadOrDrop = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      event.preventDefault();

      const target = (event as React.ChangeEvent<HTMLInputElement>).target;

      const compressedFile = await imageCompress(target.files[0], 0.4);
      setValue("img", compressedFile);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAnswer = () => {
    const { answer, img } = getValues();

    onSubmit(answer, img, id);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isDismissable
      isKeyboardDismissDisabled
    >
      <ModalContent>
        <ModalHeader>Create Answer</ModalHeader>
        <ModalBody>
          <div className="relative group border-2 border-black rounded-lg text-center p-2 cursor-pointer hover:border-blue-600 transition-all h-[320px] overflow-hidden">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleUploadOrDrop}
              className="absolute top-0 left-0 w-full h-full opacity-0 z-50"
            />
            {loading ? (
              <Spinner size="lg" />
            ) : (
              <>
                {img ? (
                  <div className="w-full h-full relative">
                    <img
                      src={URL.createObjectURL(img as Blob)}
                      className="w-full h-full object-cover group-hover:opacity-20 transition-all duration-300 rounded-lg"
                    />
                    <IconUpload
                      size={40}
                      className="absolute z-40 text-transparent group-hover:text-blue-600 group-hover:top-1/2 group-hover:-translate-y-1/2 left-1/2 -translate-x-1/2 transition-all duration-300 hidden group-hover:block"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
                    <IconUpload size={40} />

                    <p className="group-hover:text-blue-600">
                      Arrastra o selecciona una imagen
                    </p>
                  </div>
                )}
              </>
            )}
            {errors.img && <p className="text-red-500">{errors.img.message}</p>}
          </div>

          <Controller
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                isInvalid={!!formState.errors.answer}
                errorMessage={formState.errors.answer?.message}
              />
            )}
            name="answer"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onPress={onClose}>
            Close
          </Button>
          <Button
            disabled={!formState.isValid}
            color={!formState.isValid ? "default" : "primary"}
            onPress={handleCreateAnswer}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
