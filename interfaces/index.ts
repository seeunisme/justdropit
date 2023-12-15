export interface S3ImageData {
  bucketUrl: string;
  cdnUrl: string;
  fileName: string;
}

export interface S3Data {
  Key: string;
  LastModified: Date;
  ETag: string;
  Size: number;
  StorageClass: string;
}