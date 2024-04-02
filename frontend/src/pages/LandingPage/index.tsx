import React from "react";
import { Comments } from "../../components/Comments";
import { Supporters } from "../../components/Supporters";
import { TopPanel } from "../../components/TopPanel";
import { Products } from "../ProductList";
export const LandingPage: React.FC = () => {
  return (
    <main className="overflow-hidden">
      <TopPanel />
      <Products />
      <Comments />
      <Supporters />
    </main>
  );
};
