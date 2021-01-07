import JSZip from "jszip";
import { saveAs } from "file-saver";
import Reducer from "image-blob-reduce";
import { FileType, OutputOption } from "./types";
import Pica from "pica";

// Add pica as option to image-blob-reduce with default setting since
// image-blob-reduce imports/require pica conditionally and is not
// bundled with webpack
const pica = Pica();
const reducer = Reducer({ pica });

interface Metadata {
  percent: number;
  currentFile: string;
}

type OnProgressCallback = (metadata: Metadata) => void;

export const resizeAndConvertFile = async (
  blob: Blob,
  size: number,
  fileType?: FileType,
  quality?: number
) => {
  const canvas = await reducer.toCanvas(blob, { max: size });

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          return resolve(blob);
        } else {
          reject("No blob returned");
        }
      },
      fileType,
      quality
    );
  });
};

const createFile = (
  blob: Blob,
  fileName: string,
  suffix: string,
  fileType?: FileType
) => {
  let newFileName = suffix
    ? fileName.replace(/(\.[\w\d_-]+)$/i, `${suffix}$1`)
    : fileName;

  if (fileType) {
    newFileName =
      newFileName.substr(0, newFileName.lastIndexOf(".")) +
      "." +
      fileType.split("/")[1];
  }

  return new File([blob], newFileName);
};

export const saveFilesAsZip = async (
  files: File[],
  onUpdate?: OnProgressCallback
) => {
  var zip = new JSZip();

  for (const file of files) {
    zip.file(file.name, file, { base64: true });
  }

  const content = await zip.generateAsync({ type: "blob" }, onUpdate);
  saveAs(content, "resized-images.zip");
};

const ProgressConfig = {
  resize: {
    weight: 0.8,
    ahead: 0,
  },
  archive: {
    weight: 0.2,
    ahead: 80,
  },
};

const resize = async (
  files: File[],
  outputOptions: OutputOption,
  onUpdate: OnProgressCallback
) => {
  let outputFiles: File[] = [];

  interface Options {
    fileType?: FileType;
    quality?: number;
    maxSize: number;
    fileNameSiffix: string;
  }

  const allFilesWithSize: {
    file: File;
    options: Options;
  }[] = [];

  files.forEach((f) =>
    outputOptions.sizes.forEach((o) =>
      allFilesWithSize.push({
        file: f,
        options: {
          fileNameSiffix: o.fileNameSiffix,
          maxSize: o.maxSize,
          fileType: outputOptions.fileType,
          quality: outputOptions.quality,
        },
      })
    )
  );

  let percent = 0;

  for (const file of allFilesWithSize) {
    let blob: Blob = new Blob();

    if (file.options.fileType) {
      blob = await resizeAndConvertFile(
        file.file,
        file.options.maxSize,
        file.options.fileType,
        file.options.quality
      );
    } else {
      blob = await reducer.toBlob(file.file, { max: file.options.maxSize });
    }

    const newFile = createFile(
      blob,
      file.file.name,
      file.options.fileNameSiffix,
      file.options.fileType
    );

    outputFiles = [...outputFiles, newFile];
    percent += 100 / allFilesWithSize.length;
    onUpdate({ percent, currentFile: file.file.name });
  }

  return outputFiles;
};

export const resizeAndArchive = async (
  files: File[],
  outputOptions: OutputOption,
  onProgress: (percent: number) => void
) => {
  const handleProgress = (type: "resize" | "archive") => (
    metadata: Metadata
  ) => {
    onProgress(
      ProgressConfig[type].ahead +
        ProgressConfig[type].weight * metadata.percent
    );
  };

  const resizedImages = await resize(
    files,
    outputOptions,
    handleProgress("resize")
  );
  await saveFilesAsZip(resizedImages, handleProgress("archive"));
};
