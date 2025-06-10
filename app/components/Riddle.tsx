// Riddle.tsx
"use client";

import { Button, Modal } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { NameRiddleInput } from "./NameRiddleInput";
import InstagramEmbed from "./Embed";

// import { Honk } from "next/font/google";
import Image from "next/image";

// Configure the font
// const honk = Honk({
//   subsets: ["latin"], // Essential for performance
//   weight: ["400"], // Specify weights you actually use
//   variable: "--font-honk", // Optional, useful for Tailwind CSS
//   display: "swap", // Recommended for optimal loading (prevents invisible text)
// });

const ALL_SOLUTIONS: string[] = [
  "Michelangelo",
  "Banksy",
  "Picasso",
  "Pollock",
  "Warhol",
  "Dali",
  "Van Gogh",
];

export const Riddle = () => {
  const [currentGuesses, setCurrentGuesses] = useState<string[]>(
    Array(ALL_SOLUTIONS.length).fill("")
  );
  const [allRiddlesSolved, setAllRiddlesSolved] = useState(false);
  const [bdayPopupOpen, setBdayPopupOpen] = useState<boolean>(false);

  // Function to check if all riddles are solved
  const checkCompletion = useCallback((guessesToCheck: string[]) => {
    let allSolved = true;
    for (let i = 0; i < ALL_SOLUTIONS.length; i++) {
      const guessedName = (guessesToCheck[i] || "").toUpperCase();
      const solutionName = ALL_SOLUTIONS[i].toUpperCase();

      if (guessedName !== solutionName) {
        allSolved = false;
        break;
      }
    }
    setAllRiddlesSolved(allSolved);
  }, []);

  // Effect to load all progress from localStorage ONCE on initial mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedProgress = localStorage.getItem("riddle_progress");
      // console.log(
      //   "On initial load, raw savedProgress from localStorage:",
      //   savedProgress
      // ); // Debugging

      const initialGuesses = Array(ALL_SOLUTIONS.length).fill("");
      if (savedProgress) {
        try {
          const parsedProgress: string[] = JSON.parse(savedProgress);
          // Ensure the loaded progress has the correct length, fill if sparse
          parsedProgress.forEach((entry, index) => {
            if (index < ALL_SOLUTIONS.length) {
              initialGuesses[index] = entry;
            }
          });
        } catch (e) {
          console.error(
            "Error parsing riddle_progress from localStorage on load:",
            e
          );
          // If parsing fails, use initial empty array
        }
      }
      setCurrentGuesses(initialGuesses); // Set state based on loaded/default data
      checkCompletion(initialGuesses); // Immediately check completion
    }
  }, [checkCompletion]); // Dependency: checkCompletion must be stable

  // This useEffect will run whenever currentGuesses changes
  // It handles both saving to localStorage AND re-checking completion
  useEffect(() => {
    if (typeof window !== "undefined") {
      // console.log(
      //   "currentGuesses updated, saving to localStorage:",
      //   currentGuesses
      // ); // Debugging
      localStorage.setItem("riddle_progress", JSON.stringify(currentGuesses));
    }
    checkCompletion(currentGuesses);
  }, [currentGuesses, checkCompletion]);

  // Callback from individual NameRiddleInput components when their value changes
  const handleNameInputChange = useCallback((id: number, value: string) => {
    setCurrentGuesses((prevGuesses) => {
      const newGuesses = [...prevGuesses];
      newGuesses[id] = value;
      return newGuesses;
    });
    // No need to call checkCompletion here, the useEffect above watches currentGuesses
  }, []);

  // For debugging allRiddlesSolved status changes
  // useEffect(() => {
  //   console.log("allRiddlesSolved state:", allRiddlesSolved);
  // }, [allRiddlesSolved]);

  const getBdaySurprise = () => {
    // Only reachable if allRiddlesSolved is true
    // alert(
    //   "Congratulations! You've solved all the riddles! Here's your grand reward!"
    // );
    setBdayPopupOpen(true);
  };

  const resetGame = () => {
    // Added a dedicated reset function for clarity
    if (typeof window !== "undefined") {
      localStorage.removeItem("riddle_progress");
    }
    setCurrentGuesses(Array(ALL_SOLUTIONS.length).fill(""));
    setAllRiddlesSolved(false);
    console.log("Game reset!");
  };

  return (
    <>
      <Modal
        open={bdayPopupOpen}
        onClose={() => setBdayPopupOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="p-4 mx-4 bg-white mt-8 flex flex-col items-center h-[80%] overflow-scroll">
          <div className="size-11/12 mx-auto my-5">
            <Image
              src="/happy-bday.svg"
              alt="Schnuggis Birthday Riddle"
              width={750} // Replace with the actual width of your SVG
              height={90} // Replace with the actual height of your SVG
              priority // If it's a critical hero image, use priority
            />
          </div>
          <InstagramEmbed permalink="https://www.instagram.com/reel/DKq1Dr2Ju_p/?utm_source=ig_embed&amp;utm_campaign=loading" />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setBdayPopupOpen(false)}
            sx={{
              bgcolor: "#c6ffdd",
              boxShadow: 1,
              borderRadius: 2,
              fontSize: 12,
              fontStyle: "bold",
              color: "black",
            }}
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            Close
          </Button>
        </div>
      </Modal>
      <div className="flex flex-col gap-5 justify-center mt-8 mx-auto">
        {ALL_SOLUTIONS.map((solution, index) => (
          <NameRiddleInput
            key={index}
            id={index}
            solution={solution}
            onChange={handleNameInputChange}
            initialValue={currentGuesses[index]} // Pass the specific value from parent's state
          />
        ))}
      </div>
      <div className="my-8 mx-auto w-fit flex flex-col justify-center gap-4">
        {allRiddlesSolved && (
          <Button
            variant="contained"
            color="primary"
            onClick={getBdaySurprise}
            sx={{
              bgcolor: "#c6ffdd",
              boxShadow: 1,
              borderRadius: 2,
              fontSize: 14,
              fontStyle: "bold",
              color: "black",
            }}
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            Get Your Bday Surprise
          </Button>
        )}
        <Button // Reset button visible for testing
          variant="contained"
          color="secondary" // Changed color for distinction
          onClick={resetGame}
          sx={{
            bgcolor: "#ffcdd2", // Light red for reset
            boxShadow: 1,
            borderRadius: 2,
            fontSize: 14,
            fontStyle: "bold",
            color: "black",
          }}
        >
          Reset Game
        </Button>
      </div>
    </>
  );
};
