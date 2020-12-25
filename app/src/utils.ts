import JSZip from "jszip";
import { saveAs } from "file-saver";
import Reducer from "image-blob-reduce";
import { OutputOption } from "./types";

const reducer = Reducer();

export const resizeFiles = async (
  files: File[],
  maxSize: number,
  suffix?: string
) => {
  const resized: File[] = [];

  for (const file of files) {
    const newBlob = await reducer.toBlob(file, { max: maxSize });
    const fileName = suffix
      ? file.name.replace(/(\.[\w\d_-]+)$/i, `${suffix}$1`)
      : file.name;
    resized.push(new File([newBlob], fileName));
  }
  return resized;
};

export const saveFilesAsZip = async (files: File[]) => {
  var zip = new JSZip();

  for (const file of files) {
    zip.file(file.name, file, { base64: true });
  }

  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, "resized-images.zip");
  });
};

export const resize = async (files: File[], outputOptions: OutputOption[]) => {
  let outputFiles: File[] = [];
  for (const option of outputOptions) {
    const resized = await resizeFiles(
      files,
      option.maxSize,
      option.fileNameSiffix
    );
    outputFiles = [...outputFiles, ...resized];
  }

  saveFilesAsZip(outputFiles);
};
