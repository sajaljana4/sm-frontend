import { BASE_MEDIA_URL } from "@/services/config/query-urls";

export const formatImage = (path: string) => `${BASE_MEDIA_URL}/${path}`;
