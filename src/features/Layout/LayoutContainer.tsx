import React from "react";
import { Header } from "./Header";

type LayoutContainerProps = {
  children: React.ReactNode;
};

export const LayoutContainer = ({ children }: LayoutContainerProps) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
