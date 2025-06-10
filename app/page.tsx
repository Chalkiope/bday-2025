import Image from "next/image";
import { Riddle } from "./components/Riddle";
// import { Honk } from "next/font/google";
// import localFont from "next/font/local";
// import { Press_Start_2P } from "next/font/google";

// Configure the font
// const honk = Honk({
//   subsets: ["latin"], // Essential for performance
//   weight: ["400"], // Specify weights you actually use
//   // variable: "--font-honk", // Optional, useful for Tailwind CSS
//   display: "swap", // Recommended for optimal loading (prevents invisible text)
// });

// const pressStart = Press_Start_2P({
//   weight: ["400"],
//   subsets: ["latin"],
// });

// const myCustomFont = localFont({
//   src: [
//     {
//       path: "../public/Honk.ttf",
//       weight: "400", // Matches the font file's weight
//       style: "normal",
//     },
//   ],
//   display: "swap", // Recommended: 'swap' for Font Fallback, 'optional' for no layout shift
// });
export default function Home() {
  return (
    <div className="m-5 flex flex-col justify-center">
      {/* <h1 className={`${myCustomFont.className}  text-6xl text-center my-5`}>
        Schnuggis big birthday riddle 2025
      </h1> */}
      <div className="size-11/12 mx-auto my-5">
        <Image
          src="/title.svg"
          alt="Schnuggis Birthday Riddle"
          width={750} // Replace with the actual width of your SVG
          height={90} // Replace with the actual height of your SVG
          priority // If it's a critical hero image, use priority
        />
      </div>
      <Riddle />
    </div>
  );
}
