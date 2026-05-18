import { BASE_URL } from './baseUrl';

export const IMAGE_API = {
    UPLOAD_A_IMAGE: `${BASE_URL}/service_image/mutate/uploadAImage`,
    UPLOAD_MULTIPLE_IMAGE: `${BASE_URL}/service_image/mutate/uploadMultipleImage`,
    UPLOAD_A_IMAGE_TO_ZALO: `${BASE_URL}/service_image/mutate/uploadAImageToZalo`,
    UPLOAD_MULTIPLE_IMAGE_TO_ZALO: `${BASE_URL}/service_image/mutate/uploadMultipleImageToZalo`,
    UPLOAD_CHUNK: `${BASE_URL}/service_image/mutate/uploadChunk`,
    MERGE_CHUNK: `${BASE_URL}/service_image/mutate/mergeChunks`,
};
