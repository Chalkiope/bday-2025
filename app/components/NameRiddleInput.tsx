// components/NameRiddleInput.tsx
"use client";

import { InputAdornment, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface NameRiddleInputProps {
  id: number;
  solution: string;
  onChange: (id: number, value: string) => void;
  // New prop: Pass the initial value from the parent's state
  initialValue: string; // The value this specific input should display on load
}

export const NameRiddleInput = ({
  id,
  solution,
  onChange: onParentChange,
  initialValue, // Receive initial value from parent
}: NameRiddleInputProps) => {
  const [correct, setCorrect] = useState(false);
  // Initialize localValue directly from the prop provided by the parent
  const [localValue, setLocalValue] = useState(initialValue);

  // Effect to set correct status when initialValue or solution changes
  // This ensures the visual feedback is correct on initial load
  useEffect(() => {
    setCorrect(localValue.toUpperCase() === solution.toUpperCase());
  }, [localValue, solution]); // Re-run if localValue or solution changes

  useEffect(() => {
    if (localValue !== initialValue) {
      // Crucial check to prevent unnecessary updates/loops
      setLocalValue(initialValue);
      setCorrect(initialValue.toUpperCase() === solution.toUpperCase());
    }
  }, [initialValue, solution, localValue]);

  // Handle changes to the TextField
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setLocalValue(newValue); // Update internal state
    setCorrect(newValue.toUpperCase() === solution.toUpperCase()); // Update correct status
    onParentChange(id, newValue); // Notify parent component
  };

  // console.log(initialValue, localValue);

  return (
    <div className="flex flex-col align-middle justify-center">
      <TextField
        id={`riddle-${id + 1}`}
        label={`Solution ${id + 1}`}
        size="small"
        color={correct ? "success" : "primary"}
        // variant={correct ? "filled" : "outlined"}
        value={localValue} // Controlled component: value comes from state
        onChange={handleChange}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: correct ? ( // <-- Use a ternary operator here
              <InputAdornment position="end">
                <CheckCircleIcon color="success" />
              </InputAdornment>
            ) : null,
          },
        }}
      />
    </div>
  );
};
