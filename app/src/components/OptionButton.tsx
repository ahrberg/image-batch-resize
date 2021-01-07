import React from "react";
import { SizeOption } from "../types";
import Button from "./Button";

type OptionButtonProps = {
  text: string;
  onChange: (option: SizeOption) => void;
  option: SizeOption;
  selected: boolean;
};

const OptionButton = ({
  text,
  onChange,
  option,
  selected,
}: OptionButtonProps) => {
  const handleClick = () => {
    onChange(option);
  };

  return (
    <div title={`${option.maxSize.toString()} px`}>
      <Button
        variant={selected ? "solid" : "outline"}
        onClick={handleClick}
        text={text}
        color="secondary"
      />
    </div>
  );
};

export default OptionButton;
