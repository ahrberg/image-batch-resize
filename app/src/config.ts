import { SizeOption } from "./types";

export const Small: SizeOption = {
  maxSize: 240,
  fileNameSiffix: "_s",
};

export const Medium: SizeOption = {
  maxSize: 500,
  fileNameSiffix: "_m",
};

export const Large: SizeOption = {
  maxSize: 1024,
  fileNameSiffix: "_l",
};

export const AcceptedFileTypes = ["image/webp", "image/jpeg", "image/png"];
