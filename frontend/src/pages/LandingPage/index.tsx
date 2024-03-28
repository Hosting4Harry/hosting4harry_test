import React from "react";
import { Comments } from "../../components/Comments";
import { Supporters } from "../../components/Supporters";
import { TopPanel } from "../../components/TopPanel";
export const LandingPage: React.FC = () => {
  return (
    <main className="overflow-hidden">
      <TopPanel />
      <Comments />
      <Supporters />
    </main>
  );
};
