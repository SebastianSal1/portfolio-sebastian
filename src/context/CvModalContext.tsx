"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface CvModalContextValue {
  isCvModalOpen: boolean;
  openCvModal: () => void;
  closeCvModal: () => void;
}

const CvModalContext = createContext<CvModalContextValue | undefined>(undefined);

export function CvModalProvider({ children }: { children: ReactNode }) {
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  const openCvModal = useCallback(() => {
    setIsCvModalOpen(true);
  }, []);

  const closeCvModal = useCallback(() => {
    setIsCvModalOpen(false);
  }, []);

  return (
    <CvModalContext.Provider value={{ isCvModalOpen, openCvModal, closeCvModal }}>
      {children}
    </CvModalContext.Provider>
  );
}

export function useCvModal(): CvModalContextValue {
  const context = useContext(CvModalContext);
  if (!context) {
    return {
      isCvModalOpen: false,
      openCvModal: () => {
        if (typeof window !== "undefined") {
          window.open("/cv.pdf", "_blank");
        }
      },
      closeCvModal: () => {},
    };
  }
  return context;
}
