export interface BaseResponseType {
  statusCode: number;
  message: string;
  timeStamp: string;
}

export interface MediaUploadType {
  path: string;
  ETag: string;
  ChecksumCRC32: string;
  VersionId: string;
  $metadata: {
    httpStatusCode: number;
    attempts: number;
    totalRetryDelay: number;
  };
}

export interface MediaUploadResponseType extends BaseResponseType {
  data: MediaUploadType;
}
