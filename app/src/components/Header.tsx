import React from "react";
import "./Header.css";
import { ReactComponent as ImageIcon } from "../icons/image-line.svg";
import { ReactComponent as DeleteIcon } from "../icons/delete-bin-line.svg";
import IconButton from "./IconButton";

type HeaderProps = {
  count: number;
  onReset: () => void;
};

const Header = ({ count, onReset }: HeaderProps) => {
  return (
    <div className="Header-container">
      {count > 0 && <span>{count.toString()}</span>}
      <span>
        <ImageIcon
          className={count > 0 ? "Header-icon" : "Header-icon-inactive"}
        />
      </span>
      <IconButton disabled={count < 1} onClick={onReset} title="Remove images">
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default Header;
