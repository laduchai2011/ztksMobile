import axios from 'axios';
import { BASE_URL } from '@src/const/api/baseUrl';
import { DeviceEnum } from '@src/device/type';

const axiosInstance = axios.create({
    baseURL: `${BASE_URL}`,
    timeout: 0,
    headers: {
        'Content-Type': 'application/json',
        'x-device-type': DeviceEnum.MOBILE,
    },
    withCredentials: true,
});

export default axiosInstance;
