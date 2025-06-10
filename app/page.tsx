import { Riddle } from "./components/Riddle";
import { Honk } from "next/font/google";

// Configure the font
const honk = Honk({
  subsets: ["latin"], // Essential for performance
  weight: ["400"], // Specify weights you actually use
  variable: "--font-honk", // Optional, useful for Tailwind CSS
  display: "swap", // Recommended for optimal loading (prevents invisible text)
});

export default function Home() {
  return (
    <div className="m-5 flex flex-col justify-center">
      <h1 className={`${honk.className} text-6xl text-center my-5`}>
        Schnuggis big birthday riddle 2025
      </h1>
      <Riddle />
    </div>
  );
}
