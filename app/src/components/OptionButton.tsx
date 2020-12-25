import React, { useState } from "react";
import { OutputOption } from "../types";
import Button from "./Button";

type OptionButtonProps = {
  text: string;
  onChange: (selected: boolean, option: OutputOption) => void;
  option: OutputOption;
};

const OptionButton = ({ text, onChange, option }: OptionButtonProps) => {
  const [selected, setSelected] = useState(false);
  const handleClick = () => {
    setSelected((s) => {
      onChange(!s, option);
      return !s;
    });
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
