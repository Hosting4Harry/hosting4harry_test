import React, { useEffect, useState } from "react";
import InfoIcon from "./icons/InfoIcon";
import { wordList } from "../constants/index";
import { Question } from "../types/index";
import Loader from "./icons/Loader";

const Hangman = () => {
  const [key, setKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(0);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [show, setShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState<Question>({
    word: "",
    hint: "",
    category: "",
  });

  const [wordArr, setWordArr] = useState<string[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.api-ninjas.com/v1/trivia", {
        method: "GET",
        headers: {
          "X-Api-Key": "6fgzCR6rz4/KajUIAnTKnw==gBXcRaiL6JzBSKZO",
        },
      });
      const data = await response.json();
      if (data[0].answer.length > 10) {
        fetchData();
        return;
      }
      console.log(data[0]);
      const obj = {
        word: data[0].answer,
        hint: data[0].question,
        category: data[0].category,
      };
      setQuestion(obj);
      setWordArr(Array(data[0].answer.length).fill(""));
      updateState();
    } catch (error) {
      console.error("Error:", error);
      const obj: Question =
        wordList[Math.floor(Math.random() * wordList.length)];
      obj.category = "";
      setQuestion(obj);
      setWordArr(Array(obj?.word?.length).fill(""));
      updateState();
    }
  };
  const updateState = () => {
    setLoading(false);
    setCorrect(0);
    setImage(0);
    setIsModalOpen(false);
    setWrong(0);
    setShow(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (question?.word === "") return;
    setImage(wrong);
    if (
      question.word
        .split("")
        .every((letter) => wordArr.includes(letter.toLowerCase())) ||
      wrong === 6
    ) {
      setIsModalOpen(true);
      if (wrong === 6) {
        setScore((prev) => prev - 1);
      } else {
        setScore((prev) => prev + 1);
      }
    }
  }, [wrong, correct]);

  const handleClick = (val: string) => {
    const value = val.toLowerCase();
    if (!question.word.toLowerCase().includes(value)) {
      setWrong((prev) => prev + 1);
    } else {
      setCorrect((prev) => prev + 1);
      setWordArr((prev) => {
        const arr = [...prev];
        Array.from(question.word).forEach((letter, index) => {
          if (letter.toLowerCase() === value) {
            arr[index] = letter.toLowerCase();
          }
        });
        return arr;
      });
    }
  };
  const playAgain = () => {
    setKey((prev) => prev + 1);
    fetchData();
  };

  const showAnswer = () => {
    if (score < 4) return;
    setShow(true);
    setScore((prev) => prev - 4);
  };
  const skip = () => {
    if (score < 1) return;
    setScore((prev) => prev - 1);
    fetchData();
  };
  return (
    <React.Fragment key={key}>
      {isModalOpen && !loading && (
        <div className="game-modal fixed flex items-center justify-center bg-[rgba(0,0,0,0.6)] left-0 top-0 w-full h-full backdrop-blur z-50">
          <div className="content text-center p-[30px] bg-white max-w-[420px] w-full rounded">
            <img
              src={`images/${wrong === 6 ? "lost.gif" : "victory.gif"}`}
              alt=""
              className="max-w-[130px] mx-auto mb-5"
            />
            <h4 className="text-[1.53rem] font-semibold">
              {correct === question.word.length && <>Well Done</>}
              {wrong === 6 && <>Game Over!</>}
            </h4>
            <p className="text-[1.15rem] mt-[15px] mr-0 mb-[30px]">
              The correct word was:
              <span className="text-[#5E63BA] font-semibold">
                {question.word}
              </span>
            </p>
            <button
              className="play-again py-3 px-[23px] border bg-[#5E63BA] hover:bg-[#8286c9] text-white text-base font-semibold outline-none cursor-pointer rounded uppercase"
              onClick={playAgain}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row max-w-[850px] bg-white py-[30px] md:py-[60px] px-[15px] md:px-10 items-center rounded-md md:items-end gap-[70px] w-full">
        <div className="hangman-box flex flex-col">
          {show && (
            <h1 className="flex gap-2 items-center justify-evenly mb-10 text-green-500 font-semibold text-2xl">
              {question.word}
            </h1>
          )}
          <img
            src={`/images/hangman-${image}.svg`}
            className="max-w-[200px] md:max-w-[270px]"
          />
          <h1 className="font-extrabold mt-5 text-[1.45rem] uppercase text-center hidden md:block">
            Hangman Game
          </h1>
        </div>
        <div className="w-full">
          {!loading && (
            <>
              <ul className="flex gap-3 list-none items-center justify-center w-full">
                {question.word
                  .toLowerCase()
                  .split("")
                  .map((char, index) => (
                    <li
                      key={index + char}
                      className={`${
                        char.toLowerCase() === wordArr[index] ? "guessed" : ""
                      } mb-10 w-[28px] border-b-[3px] border-[#000] text-[2rem] font-semibold text-center uppercase`}
                    >
                      {wordArr[index]}
                    </li>
                  ))}
                <li className="mb-10 w-[28px] text-[2rem] font-semibold text-center relative group hidden">
                  <div className="relative hidden">
                    <div className="absolute text-black bottom-6 bg-[#ebe5e5] w-[250px] shadow-2xl right-0 text-sm font-normal not-italic p-2 rounded z-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {question?.word &&
                        (question.word.length % 2 === 0
                          ? `First letter is '${question.word[0]?.toUpperCase()}'`
                          : `Last letter is '${question.word[
                              question.word.length - 1
                            ]?.toUpperCase()}'`)}
                    </div>
                    <InfoIcon />
                  </div>
                </li>
              </ul>

              <h4 className="text-[1.1rem] font-medium ">
                Category:{" "}
                <b>
                  {question.category
                    ? question?.category.toLocaleUpperCase()
                    : "Unknown"}
                </b>
              </h4>
              <h4 className="flex text-center text-[1.1rem] font-medium mb-[15px]">
                Question:&nbsp;
                <span
                  className={`flex font-semibold text-start ${
                    question.hint.length > 100 ? "text-sm" : ""
                  }`}
                >
                  {question.hint}{" "}
                </span>
              </h4>
            </>
          )}
          {loading && (
            <div className="flex flex-col justify-start items-center gap-2  w-full">
              <Loader />
            </div>
          )}
          <h4 className="flex flex-col lg:flex-row text-center text-[1.1rem] font-medium mb-[15px] justify-between">
            <div className="flex items-start justify-start">
              Incorrect guesses:&nbsp;
              <span className="text-[#ff0000]"> {wrong} / 6 </span>
            </div>
            <div className="flex">
              Score:&nbsp;
              <span
                className={score >= 0 ? "text-green-500" : "text-[#ff0000]"}
              >
                {" "}
                {score}
              </span>
            </div>
          </h4>
          <div className="flex flex-wrap gap-2 mt-10 justify-center">
            {Array.from("#$%&*123abcde456fghij789klmno(0)pqrstuvwxyz@").map(
              (alphabet, index) => (
                <button
                  key={index}
                  className="w-cal p-1 border bg-[#152c53] hover:bg-[#22437c] text-white text-base font-semibold outline-none cursor-pointer rounded uppercase"
                  onClick={() => handleClick(alphabet)}
                >
                  {alphabet}
                </button>
              )
            )}
          </div>
          <div className="flex flex-wrap gap-2 mt-10 justify-center">
            <button
              className={`relative w-[60px] p-1 border bg-green-600 hover:bg-green-500 text-white text-base font-semibold outline-none cursor-pointer rounded uppercase ${
                score < 4 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={showAnswer}
            >
              Ans
              <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                -4
              </span>
            </button>
            <button
              className="w-cal p-1 border bg-[#152c53] hover:bg-[#22437c] text-white text-base font-semibold outline-none cursor-pointer rounded uppercase"
              onClick={() => handleClick("=")}
            >
              =
            </button>
            <button
              className="w-cal p-1 border bg-[#152c53] hover:bg-[#22437c] text-white text-base font-semibold outline-none cursor-pointer rounded uppercase"
              onClick={() => handleClick(".")}
            >
              .
            </button>
            <button
              className="w-[100px] p-1 border bg-[#152c53] hover:bg-[#22437c] text-white text-base font-semibold outline-none cursor-pointer rounded uppercase"
              onClick={() => handleClick(" ")}
            >
              Space
            </button>
            <button
              className="w-cal p-1 border bg-[#152c53] hover:bg-[#22437c] text-white text-base font-semibold outline-none cursor-pointer rounded uppercase"
              onClick={() => handleClick("'")}
            >
              '
            </button>
            <button
              className={`relative z-2 w-[60px] p-1 border bg-red-700 hover:bg-red-800 text-white text-base font-semibold outline-none cursor-pointer rounded uppercase ${
                score < 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={skip}
            >
              Skip
              <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                -1
              </span>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Hangman;
