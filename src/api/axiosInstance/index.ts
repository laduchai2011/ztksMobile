import axios from 'axios';
import { BASE_URL } from '@src/const/api/baseUrl';
import { DeviceEnum } from '@src/device/type';
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from '@src/token';
import { getAccountId, setAccountId } from '@src/utility/checkSignin';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 0,
    headers: {
        'Content-Type': 'application/json',
        'x-device-type': DeviceEnum.MOBILE,
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = await getAccessToken();
        const refreshToken = await getRefreshToken();
        const accountId = await getAccountId();

        config.headers.set('x-access-token', accessToken || '');
        config.headers.set('x-refresh-token', refreshToken || '');
        config.headers.set('x-account-id', accountId || '');

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    async (response) => {
        // Lấy token mới từ response header
        const isRefresh = response.headers['x-isRefresh'];
        const newAccessToken = response.headers['x-access-token'];
        const newRefreshToken = response.headers['x-refresh-token'];
        const newAccountId = response.headers['x-account-id'];

        if (isRefresh === '1') {
            if (newAccessToken) {
                await setAccessToken(newAccessToken);
            }

            if (newRefreshToken) {
                await setRefreshToken(newRefreshToken);
            }

            if (newAccountId) {
                await setAccountId(newAccountId);
            }
        }

        return response;
    },
    async (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
