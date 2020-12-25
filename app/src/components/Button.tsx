import React from "react";
import "./Button.css";

type ButtonProps = {
  text: string | JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "solid" | "outline";
  color: "primary" | "secondary";
  size?: "normal" | "wide";
};

const Button = ({
  text,
  onClick,
  disabled,
  variant,
  color,
  size,
}: ButtonProps) => {
  let css = "Button";

  if (color === "secondary") {
    css += " Button-secondary";
  }

  if (variant === "outline" && color === "secondary") {
    css += " Button-outline-secondary";
  }

  if (variant === "outline" && color !== "secondary") {
    css += " Button-outline";
  }

  if (size === "wide") {
    css += " Button-wide";
  }

  return (
    <button type="button" className={css} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
