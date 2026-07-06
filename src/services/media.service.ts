import { MediaUploadResponseType } from "@/types/common/base-response.type";
import fetchAPI from "./config/fetch-api";
import { MEDIA_URLS } from "./config/query-urls";

export const mediaService = {
  uploadMedia: async (file: File): Promise<MediaUploadResponseType> => {
    const formData = new FormData();
    formData.append("file", file);
    return await fetchAPI.mediaUpload({
      endpoint: MEDIA_URLS.UPLOAD,
      formData,
    });
  },
};
