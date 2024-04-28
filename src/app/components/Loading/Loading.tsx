import { Modal, Spinner } from "@nextui-org/react";
import { useAppSelector } from "../../hooks/store";
import { selectLoading } from "../../features/loadingSlice";

export const Loading = () => {
  const load = useAppSelector(selectLoading);

  return (
    <Modal size="full" isOpen>
      <h1 className="text-5xl tracking-tight font-extrabold text-white">
        {load.message || "Loading..."}
      </h1>
      <Spinner size="lg" />
    </Modal>
  );
};
