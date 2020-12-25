import React from "react";
import "./Footer.css";
import { ReactComponent as GithubIcon } from "../icons/github-fill.svg";
import { ReactComponent as InfoIcon } from "../icons/information-line.svg";
import IconButton from "./IconButton";

type FooterProps = {
  onShowInfo: () => void;
};

const Footer = ({ onShowInfo }: FooterProps) => {
  return (
    <div className="Footer-container">
      <span>
        <a
          href="https://github.com/ahrberg/image-batch-resize"
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon />
        </a>
      </span>
      <IconButton disabled={false} onClick={onShowInfo}>
        <InfoIcon />
      </IconButton>
    </div>
  );
};

export default Footer;
