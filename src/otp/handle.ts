import auth from '@react-native-firebase/auth';

export const sendOtp = async (phone: string) => {
    try {
        const confirmation = await auth().signInWithPhoneNumber(phone);
        return confirmation;
    } catch (e) {
        console.log(e);
    }
};

export const verifyOtp = async (confirmationResult: any, code: string) => {
    const result = await confirmationResult.confirm(code);

    const user = result.user;

    const token = await user.getIdToken();

    return token;
};
