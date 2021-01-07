export interface SizeOption {
  maxSize: number;
  fileNameSiffix: string;
  custom?: boolean;
}

export enum FileType {
  JPEG = "image/jpeg",
  PNG = "image/png",
  WEBP = "image/webp",
}

export interface OutputOption {
  sizes: SizeOption[];
  fileType?: FileType;
  quality?: number;
}
