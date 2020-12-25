import React from "react";
import IconButton from "./IconButton";
import { ReactComponent as CloseIcon } from "../icons/close-circle-line.svg";
import "./Info.css";

type InfoProps = {
  onClose: () => void;
  show: boolean;
};

const Info = ({ show, onClose }: InfoProps) => {
  if (!show) {
    return null;
  }
  return (
    <div className="Info">
      <div className="Info-content">
        <div className="Info-header">
          <IconButton disabled={false} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="Info-section">
          <h3>Info</h3>
          <p>
            This tool resizes images in batch. Use this tool to scale down
            images for publishing on the web or similar, not for quality
            printing. This tool is free to use and does not store or send any
            data about you or your images. It only runs in our browser.
          </p>
          <h3>How to use</h3>
          <p>
            Drag images in to the tool or select the images to resize. Select
            one or many output sizes. Small = 240 px, Medium = 500px, Large =
            1024 px or set your custom size. This will set the largest side of
            the image and keep the aspect ratio. Press Resize and images will be
            resized and start a download with the resized images in a zip file.
          </p>
          <h3>Bugs</h3>
          <p>
            If you find and want to report a bug please do so{" "}
            <a
              href="https://github.com/ahrberg/image-batch-resize/issues"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
            .
          </p>
          <h3>Credits</h3>
          <ul>
            <li>
              <a
                href="https://github.com/nodeca/pica"
                target="_blank"
                rel="noreferrer"
              >
                pica
              </a>
            </li>
            <li>
              <a
                href="https://github.com/eligrey/FileSaver.js"
                target="_blank"
                rel="noreferrer"
              >
                Filesaver.js
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Stuk/jszip"
                target="_blank"
                rel="noreferrer"
              >
                jszip
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Info;
