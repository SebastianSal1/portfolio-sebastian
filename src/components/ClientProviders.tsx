"use client";

import React, { ReactNode } from "react";
import { CvModalProvider, useCvModal } from "@/context/CvModalContext";
import { CvPreviewModal } from "@/components/CvPreviewModal";

function GlobalCvModalConsumer() {
  const { isCvModalOpen, closeCvModal } = useCvModal();
  return <CvPreviewModal isOpen={isCvModalOpen} onClose={closeCvModal} />;
}

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <CvModalProvider>
      {children}
      <GlobalCvModalConsumer />
    </CvModalProvider>
  );
}
