import JSZip from "jszip";
import { saveAs } from "file-saver";
import Reducer from "image-blob-reduce";
import { OutputOption } from "./types";
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

export const resizeFile = async (
  file: File,
  maxSize: number,
  suffix?: string
) => {
  const newBlob = await reducer.toBlob(file, { max: maxSize });
  const fileName = suffix
    ? file.name.replace(/(\.[\w\d_-]+)$/i, `${suffix}$1`)
    : file.name;

  return new File([newBlob], fileName);
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
  outputOptions: OutputOption[],
  onUpdate: OnProgressCallback
) => {
  let outputFiles: File[] = [];

  const allFilesWithSize: {
    file: File;
    maxSize: number;
    suffix?: string;
  }[] = [];

  files.forEach((f) =>
    outputOptions.forEach((o) =>
      allFilesWithSize.push({
        file: f,
        maxSize: o.maxSize,
        suffix: o.fileNameSiffix,
      })
    )
  );

  let percent = 0;

  for (const file of allFilesWithSize) {
    const resized = await resizeFile(file.file, file.maxSize, file.suffix);

    outputFiles = [...outputFiles, resized];
    percent += 100 / allFilesWithSize.length;
    onUpdate({ percent, currentFile: file.file.name });
  }

  return outputFiles;
};

export const resizeAndArchive = async (
  files: File[],
  outputOptions: OutputOption[],
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
