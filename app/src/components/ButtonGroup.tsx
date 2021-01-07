import React from "react";
import Button from "./Button";

type ButtonGroupProps = {
  items: { text: string; id: string }[];
  selectedChanged: (id: string | undefined) => void;
  selectedId: string | undefined;
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  items,
  selectedChanged,
  selectedId,
}) => {
  return (
    <>
      {items.map((i) => (
        <div className="ButtonGroup-item" key={i.id}>
          <Button
            color="secondary"
            variant={selectedId === i.id ? "solid" : "outline"}
            text={i.text}
            key={i.id}
            onClick={() => selectedChanged(i.id)}
          ></Button>
        </div>
      ))}
    </>
  );
};

export default ButtonGroup;
