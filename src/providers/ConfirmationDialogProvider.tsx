"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

type ConfirmationDialogOptions = {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  confirmClassName?: string;
  isDisabled?: boolean;
  onConfirm: () => void;
};

type ConfirmationDialogContextValue = {
  showConfirmation: (options: ConfirmationDialogOptions) => void;
};

const ConfirmationDialogContext = createContext<
  ConfirmationDialogContextValue | undefined
>(undefined);

export const ConfirmationDialogProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogOptions, setDialogOptions] =
    useState<ConfirmationDialogOptions | null>(null);

  const showConfirmation = (options: ConfirmationDialogOptions) => {
    setDialogOptions(options);
    setIsOpen(true);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    if (dialogOptions?.onConfirm) {
      dialogOptions.onConfirm();
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <ConfirmationDialogContext.Provider value={{ showConfirmation }}>
      {children}
      {dialogOptions && (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-medium font-secondary">
                {dialogOptions.title}
              </AlertDialogTitle>
              <AlertDialogDescription className="font-secondary font-[300] text-sm">
                {dialogOptions.description}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={handleConfirm}
                className={
                  dialogOptions.confirmClassName
                    ? dialogOptions.confirmClassName
                    : "font-secondary font-[300]"
                }
                data-cy="confirm"
                disabled={dialogOptions.isDisabled || false}
              >
                {dialogOptions.confirmText || "Confirm"}
              </AlertDialogAction>
              <AlertDialogCancel
                className="font-secondary font-[300]"
                onClick={handleCancel}
                data-cy="cancel"
              >
                {dialogOptions.cancelText || "Cancel"}
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </ConfirmationDialogContext.Provider>
  );
};

export const useConfirmationDialog = () => {
  const context = useContext(ConfirmationDialogContext);
  if (!context) {
    throw new Error(
      "useConfirmationDialog must be used within a ConfirmationDialogProvider"
    );
  }
  return context;
};
