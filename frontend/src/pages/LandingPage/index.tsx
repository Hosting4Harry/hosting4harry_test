import React from "react";
import { Comments } from "../../components/Comments";
import { Supporters } from "../../components/Supporters";
import { TopPanel } from "../../components/TopPanel";
import { Products } from "../ProductList";
import RockPaperScissor from "../../components/RockPaperScissor";
import Hangman from "../../components/Hangman";
export const LandingPage: React.FC = () => {
  return (
    <main className="">
      <TopPanel />
      <div className="flex flex-col items-center justify-center h-[100vh] bg-[#f6f7fb] bg-gradient-to-b from-[#152c53]  px-[10px] gap-2 bg-blend-normal">
        {/* <h1 className="font-bold text-xl">Hangman Game</h1> */}
        <Hangman />
      </div>
      <div className="flex flex-col items-center justify-center h-[100vh] bg-gradient-to-b from-[#f6f7fb] gap-2">
        <h1 className="font-bold text-xl">Rock-Paper-Scissors</h1>
        <RockPaperScissor />
      </div>
      <Products />
      <Comments />
      <Supporters />
    </main>
  );
};
