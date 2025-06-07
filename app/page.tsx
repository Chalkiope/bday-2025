import { Riddle } from "./components/Riddle";

export default function Home() {
  return (
    <div className="m-5 flex flex-col">
      <h1 className="honk text-6xl text-center my-10">
        Schnuggis big birthday riddle 2025
      </h1>
      {/* <div className="flex flex-col h-full mt-10"> */}
      <Riddle />
      {/* </div> */}
    </div>
  );
}
