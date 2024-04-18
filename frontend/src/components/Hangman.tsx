import React, { useEffect, useState } from "react";
import InfoIcon from "./icons/InfoIcon";

const Hangman = () => {
  const [key, setKey] = useState(0);
  const [image, setImage] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState({
    word: "",
    hint: "",
    category: "",
  });
  // wordList[Math.floor(Math.random() * wordList.length)]
  const [wordArr, setWordArr] = useState<string[]>([]);
  // Array(question.word.length).fill("")
  const fetchData = async () => {
    try {
      const response = await fetch("https://api.api-ninjas.com/v1/trivia", {
        method: "GET",
        headers: {
          "X-Api-Key": "6fgzCR6rz4/KajUIAnTKnw==gBXcRaiL6JzBSKZO",
        },
      });
      const data = await response.json();
      console.log(data);
      const obj = {
        word: data[0].answer,
        hint: data[0].question,
        category: data[0].category,
      };
      setQuestion(obj);
      setWordArr(Array(data[0].answer.length).fill(""));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (question?.word === "") return;
    setImage(wrong);
    if (
      question.word.split("").every((letter) => wordArr.includes(letter)) ||
      wrong === 6
    ) {
      setIsModalOpen(true);
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
    setCorrect(0);
    setImage(0);
    setIsModalOpen(false);
    setWrong(0);
    fetchData();
  };
  return (
    <React.Fragment key={key}>
      {isModalOpen && question?.word !== "" && (
        <div className="game-modal fixed flex items-center justify-center bg-[rgba(0,0,0,0.6)] left-0 top-0 w-full h-full backdrop-blur overflow-hidden">
          <div className="content text-center p-[30px] bg-white max-w-[420px] w-full rounded">
            <img
              src={`images/${wrong === 6 ? "lost.gif" : "victory.gif"}`}
              alt=""
              className="max-w-[130px] mx-auto mb-5"
            />
            <h4 className="text-[1.53rem] font-semibold">
              {correct === question.word.length && <>Well Done</>}
              {wrong === 6 && <>Game Over!</>}
              {}
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
      <div className="flex flex-col md:flex-row w-[850px] bg-white py-[30px] md:py-[60px] px-[15px] md:px-10 items-center rounded-md md:items-end gap-[70px]">
        <div className="hangman-box">
          <img
            src={`/images/hangman-${image}.svg`}
            className="max-w-[200px] md:max-w-[270px]"
          />
          <h1 className="font-extrabold mt-5 text-[1.45rem] uppercase text-center hidden md:block">
            Hangman Game
          </h1>
        </div>
        <div className="game-box">
          <ul className="flex gap-3 list-none items-center justify-center">
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
            <li className="mb-10 w-[28px] text-[2rem] font-semibold text-center uppercase relative group">
              <div className="relative">
                <div className="absolute text-black bottom-6 bg-white w-[250px] shadow-2xl right-0 text-sm font-normal not-italic p-2 rounded z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {question?.word?.length % 2 === 0
                    ? "First letter is" + question.word.split("")[0]
                    : "Last letter is" +
                      question.word.split("")[question?.word?.length-1]}
                </div>
                <InfoIcon />
              </div>
            </li>
          </ul>

          <h4 className="text-[1.1rem] font-medium ">
            Category:{" "}
            <b>{question.category.toLocaleUpperCase() || "Unknown"}</b>
          </h4>
          <h4 className="flex text-center text-[1.1rem] font-medium mb-[15px]">
            Question:&nbsp;
            <span className="flex font-semibold text-start">
              {question.hint}{" "}
            </span>
          </h4>
          <h4 className="text-center text-[1.1rem] font-medium mb-[15px]">
            Incorrect guesses:
            <span className="text-[#ff0000]"> {wrong} / 6 </span>
          </h4>
          <div className="flex flex-wrap gap-2 mt-10 justify-center">
            {Array.from("abcdefghijklmnopqrstuvwxyz").map((alphabet, index) => (
              <button
                key={index}
                className="w-cal p-1 border bg-[#152c53] hover:bg-[#22437c] text-white text-base font-semibold outline-none cursor-pointer rounded uppercase"
                onClick={() => handleClick(alphabet)}
              >
                {alphabet}
              </button>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Hangman;
