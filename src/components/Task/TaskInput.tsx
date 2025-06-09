import { useState } from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

interface TaskInputProps {
  initialText?: string;
  onSave: (text: string) => void;
}

export const TaskInput = ({ initialText = "", onSave }: TaskInputProps) => {
  const [text, setText] = useState(initialText);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && text.trim()) {
      onSave(text.trim());
      setText("");
    }
    if (e.key === "Escape") {
      onSave(""); // Pass empty to signal cancellation
    }
  };

  return (
    <Input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={() => onSave(text.trim())}
      autoFocus
    />
  );
};
