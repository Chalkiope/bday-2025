// "use client";

// import { TextField } from "@mui/material";
// import { useState } from "react";

// export const Clue = ({
//   id,
//   localStorageValue,
//   onChange,
// }: {
//   id: number;
//   localStorageValue: string | null;
//   onChange: (index: number, value: string) => void;
// }) => {
//   const [correct, setCorrect] = useState(false);
//   const [localValue, setLocalValue] = useState("");

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = event.target.value.toUpperCase();
//     setLocalValue(newValue);
//     onChange(id, newValue);
//   };

//   return (
//     <>
//       <TextField
//         id={`clue-${id + 1}`}
//         label={`Clue ${id + 1}`}
//         placeholder="X"
//         color={correct ? "success" : "primary"}
//         variant={"outlined"}
//         value={localStorageValue}
//         onChange={handleChange}
//         slotProps={{
//           inputLabel: {
//             shrink: true, // Forces the label to always be "shrunk" (on top)
//           },
//         }}
//         sx={{
//           bgcolor: "rgba(255, 255, 255, 0.5)",
//           borderColor: "#c6ffdd",
//           boxShadow: 1,
//           borderRadius: 2,
//         }}
//       />
//     </>
//   );
// };
