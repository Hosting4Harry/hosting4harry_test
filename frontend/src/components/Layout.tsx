import React, { ReactNode } from "react";
import { Header } from "./Header";
interface LayoutProp {
  children: ReactNode;
}
export const Layout: React.FC<LayoutProp> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
