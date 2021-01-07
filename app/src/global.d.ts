declare module "image-blob-reduce" {
  interface IOptions {
    pica?: any;
  }

  interface IBlobOptions {
    max: number;
    alpha?: number;
    unsharpAmount?: number;
    unsharpRadius?: number;
    unsharpThreshold?: number;
    cancelToken?: number;
  }

  interface IImageBlobReduce {
    toBlob: (blob: Blob, options: IBlobOptions) => Promise<Blob>;
    toCanvas: (blob: Blob, options: IBlobOptions) => Promise<HTMLCanvasElement>;
  }

  function ImageBlobReduce(options?: IOptions): IImageBlobReduce;

  export = ImageBlobReduce;
}
