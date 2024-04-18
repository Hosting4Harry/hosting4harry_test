import { ChangeEvent, useState } from "react";
import { Outcomes } from "../types/index";

const RockPaperScissor = () => {
  const [outcome, setOutcome] = useState("Let's Play!");
  const [name, setName] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);

  const handleBodyClick = () => {
    if (name === "") {
      alert("Please enter your name to continue..");
    }
  };
  const handleClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    index: number
  ) => {
    if (name === "") {
      return;
    }
    setOutcome("Let's Play!");
    const optionImages = document.querySelectorAll(".option_image");
    const userResult = document.querySelector(
      ".user_result img"
    ) as HTMLImageElement;
    const cpuResult = document.querySelector(
      ".cpu_result img"
    ) as HTMLImageElement;
    if (userResult && cpuResult) {
      userResult.src = "images/rock.svg";
      cpuResult.src = "images/rock.svg";
      const user = document.querySelector(".user_result");
      const cpu = document.querySelector(".cpu_result");
      optionImages.forEach((item) => {
        item.classList.remove("opacity-100");
      });
      user?.classList.add("animate-user_shake");
      cpu?.classList.add("animate-cpu_shake");

      const time = setTimeout(() => {
        user?.classList.remove("animate-user_shake");
        cpu?.classList.remove("animate-cpu_shake");
        e?.target && (e.target as HTMLElement).classList.add("opacity-100");
        const imgageSrc = (e.target as HTMLElement).querySelector("img")?.src;
        if (userResult && imgageSrc) {
          userResult.src = imgageSrc;
        }
        const randomNumber = Math.floor(Math.random() * 3);
        const cpuImages = [
          "images/rock.svg",
          "images/paper.svg",
          "images/scissors.svg",
        ];
        cpuResult.src = cpuImages[randomNumber];
        const cpuValue = ["R", "P", "S"][randomNumber];
        const userValue = ["R", "P", "S"][index];
        const outcomes: Outcomes = {
          RR: "Match Draw",
          PP: "Match Draw",
          SS: "Match Draw",
          RP: "Harry Won!!",
          PR: name + " Won!!",
          RS: name + " Won!!",
          SR: "Harry Won!!",
          PS: "Harry Won!!",
          SP: name + " Won!!",
        };
        if (
          outcomes[(userValue + cpuValue) as keyof Outcomes] !== "Match Draw"
        ) {
          if (
            outcomes[(userValue + cpuValue) as keyof Outcomes] === "Harry Won!!"
          ) {
            setUserScore((prev) => prev - 1);
            setCpuScore((prev) => prev + 1);
          } else {
            setUserScore((prev) => prev + 1);
            setCpuScore((prev) => prev - 1);
          }
        }
        setOutcome(outcomes[(userValue + cpuValue) as keyof Outcomes]);
        return () => clearTimeout(time);
      }, 2500);
    }
  };
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleCheck = (e:ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.toLowerCase() === "harry") {
      alert("Name already taken please enter another!!");
      setName("");
    }
  };
  return (
    <section className="container bg-white py-8 px-[7rem] rounded shadow-xl md:max-w-[700px]">
      <div className="flex items-center justify-center m-10 border-2 bottom-2 rounded gap-2">
        <label htmlFor="name" className="font-bold ">
          Player&apos;s name:
        </label>
        <input
          id="name"
          className="flex items-center judtify-center p-1 m-2 rounded outline-none border border-indigo-600 "
          type="text"
          value={name}
          name="name"
          onChange={handleChange}
          onBlur={handleCheck}
        />
      </div>
      <div
        className={`result_field ${name === "" ? "opacity-50" : "opacity-100"}`}
        onClick={handleBodyClick}
      >
        {name && (
          <div className="flex  justify-center items-center">
            <div className="flex gap-2 items-center justify-center">
              <span
                className={`px-4 py-1.5 border font-bold ${
                  userScore >= 0
                    ? "border-green-500 text-green-500"
                    : "border-red-500 text-red-500"
                }`}
              >
                {userScore}
              </span>
              <sub className="font-bold">{name.toLocaleUpperCase()}</sub>
            </div>
            &nbsp;
            <span className="italic font-bold text-red-500">V/S</span>&nbsp;
            <div className="flex gap-2 items-center justify-center">
              <sub className="font-bold">HARRY</sub>
              <span
                className={`px-4 py-1.5 border font-bold ${
                  cpuScore >= 0
                    ? "border-green-500 text-green-500"
                    : "border-red-500 text-red-500"
                }`}
              >
                {cpuScore}
              </span>
            </div>
          </div>
        )}
        <div className="result_images flex items-center justify-center gap-x-[7rem]">
          <span className="user_result ">
            <img src="images/rock.svg" className="w-[100px] rotate-90" />
          </span>
          <span className="cpu_result">
            <img
              src="images/rock.svg"
              alt=""
              className="w-[100px] transform -rotate-90 scale-x-[-1]"
            />
          </span>
        </div>
        <div className="result text-center text-[2rem] text-[#112342] mt-6">
          {outcome}
        </div>
      </div>
      <div className="option_images flex items-center justify-between mt-10">
        <span
          className={`option_image flex flex-col items-center opacity-50 ${
            name !== "" ? "hover:opacity-100" : ""
          } transition-opacity duration-300 ease-in cursor-pointer`}
          onClick={(e) => handleClick(e, 0)}
        >
          <img src="images/rock.svg" className="w-[50px] pointer-events-none" />
          <p className="text-[#112342] text-[1.235rem] mt-4 ">Rock</p>
        </span>
        <span
          className={`option_image flex flex-col items-center opacity-50 ${
            name !== "" ? "hover:opacity-100" : ""
          } transition-opacity duration-300 ease-in cursor-pointer`}
          onClick={(e) => handleClick(e, 1)}
        >
          <img
            src="images/paper.svg"
            className="w-[50px] pointer-events-none"
          />
          <p className="text-[#112342] text-[1.235rem] mt-4">Paper</p>
        </span>
        <span
          className={`option_image flex flex-col items-center opacity-50 ${
            name !== "" ? "hover:opacity-100" : ""
          } transition-opacity duration-300 ease-in cursor-pointer`}
          onClick={(e) => handleClick(e, 2)}
        >
          <img
            src="images/scissors.svg"
            className="w-[50px] pointer-events-none"
          />
          <p className="text-[#112342] text-[1.235rem] mt-4 ">Scissors</p>
        </span>
      </div>
    </section>
  );
};

export default RockPaperScissor;
