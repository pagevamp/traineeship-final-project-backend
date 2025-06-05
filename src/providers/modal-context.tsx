"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

type ModalType = {
  component: React.ComponentType<any>;
  props?: Record<string, any>;
  maxWidth?: string;
  className?: any;
  overlayClassName?: any;
};

type ModalContextType = {
  modals: ModalType[];
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modals, setModals] = useState<ModalType[]>([]);

  const openModal = (modal: ModalType) => {
    setModals((prevModals) => [...prevModals, modal]);
  };

  const closeModal = () => {
    setModals((prevModals) => prevModals.slice(0, -1));
  };

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
