import React, { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
interface LayoutProp {
  children: ReactNode;
}
export const Layout: React.FC<LayoutProp> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
