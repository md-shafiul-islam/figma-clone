"use client";
import React from "react";
import { TooltipProvider } from "./ui/tooltip";

interface ClientWarrapperProps {
  children: React.ReactNode;
}

const ClientWarrapper: React.FC<ClientWarrapperProps> = ({ children }) => {
  return (
    <>
      <TooltipProvider delayDuration={100}>{children}</TooltipProvider>
    </>
  );
};

export default ClientWarrapper;
