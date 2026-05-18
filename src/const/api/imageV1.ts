import { BASE_URL } from './baseUrl';

export const IMAGEV1_API = {
    UPLOAD_A_IMAGE_TO_ZALO: `${BASE_URL}/service_image_v1/mutate/uploadAImageToZalo`,
    UPLOAD_CHUNK: `${BASE_URL}/service_image_v1/mutate/uploadChunk`,
    MERGE_CHUNK: `${BASE_URL}/service_image_v1/mutate/mergeChunks`,
};
