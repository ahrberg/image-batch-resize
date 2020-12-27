import { OutputOption } from "./types";

export const Small: OutputOption = {
  maxSize: 240,
  fileNameSiffix: "_s",
};

export const Medium: OutputOption = {
  maxSize: 500,
  fileNameSiffix: "_m",
};

export const Large: OutputOption = {
  maxSize: 1024,
  fileNameSiffix: "_l",
};

export const AcceptedFileTypes = ["image/webp", "image/jpeg", "image/png"];
