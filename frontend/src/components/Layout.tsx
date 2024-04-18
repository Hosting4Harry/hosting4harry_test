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
      <div className="absolute inset-0 z-0 w-full h-full">
        <img
        className="w-full"
          src="/images/header.jpg"
          alt="no-img"
        />
      </div>
      {children}
      <Footer />
    </>
  );
};
