import React from "react";
import "./IconButton.css";

type IconButtonProps = {
  onClick?: () => void;
  disabled: boolean;
  title?: string;
};

const IconButton: React.FC<IconButtonProps> = ({
  children,
  onClick,
  disabled,
  title,
}) => {
  let css = "IconButton";

  if (disabled) {
    css += " IconButton-disabled";
  }
  return (
    <span className={css} onClick={onClick} title={title}>
      {children}
    </span>
  );
};

export default IconButton;
