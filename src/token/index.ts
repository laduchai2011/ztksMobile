import * as Keychain from 'react-native-keychain';

export const getAccessToken = async () => {
    try {
        const credentials = await Keychain.getGenericPassword({
            service: 'accessToken',
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

export const getRefreshToken = async () => {
    try {
        const credentials = await Keychain.getGenericPassword({
            service: 'refreshToken',
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

export const getSocketToken = async () => {
    try {
        const credentials = await Keychain.getGenericPassword({
            service: 'socketToken',
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

export const setAccessToken = async (token: string) => {
    try {
        await Keychain.setGenericPassword('access', token, {
            service: 'accessToken',
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const setRefreshToken = async (token: string) => {
    try {
        await Keychain.setGenericPassword('refresh', token, {
            service: 'refreshToken',
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const setSocketToken = async (token: string) => {
    try {
        await Keychain.setGenericPassword('socket', token, {
            service: 'socketToken',
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};
