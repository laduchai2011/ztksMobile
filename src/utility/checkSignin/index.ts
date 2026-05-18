import * as Keychain from 'react-native-keychain';
import { getAccessToken, getRefreshToken, getSocketToken } from '@src/token';

export async function isSignin() {
    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();
    const socketToken = await getSocketToken();
    const accountId = await getAccountId();

    if (accessToken && refreshToken && accountId) {
        return true;
    }

    return false;
}

export const getAccountId = async () => {
    try {
        const credentials = await Keychain.getGenericPassword({
            service: 'accountId',
        });

        if (credentials) {
            return credentials.password;
        }

        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const setAccountId = async (accountId: string) => {
    try {
        await Keychain.setGenericPassword('accountId', accountId, {
            service: 'accountId',
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};
