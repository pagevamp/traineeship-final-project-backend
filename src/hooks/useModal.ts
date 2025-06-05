import { useModalContext } from "@/providers/modal-context";

export const useModal = () => {
  const { openModal, closeModal } = useModalContext();

  return {
    openModal,
    closeModal,
  };
};
