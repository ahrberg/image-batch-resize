import React from "react";
import "./TextInput.css";

type TextInputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  color?: "primary" | "secondary";
};

const TextInput = ({ onChange, value, color }: TextInputProps) => {
  const id = `text-input-${Math.floor(Math.random() * 1000).toString()}`;

  let css = "TextInput";
  if (color === "secondary") {
    css += " TextInput-secondary";
  }

  return (
    <div>
      <label htmlFor={id} className="TextInput-label">
        Custom size
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        className={css}
      ></input>
    </div>
  );
};

export default TextInput;
