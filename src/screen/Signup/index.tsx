import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@src/redux';
import {
    ACCOUNT,
    PASSWORD,
    SIGNIN,
    FORGET_PASSWORD,
    SIGNUP,
    PHONE_NUMBER,
    FIRST_NAME,
    LAST_NAME,
} from '@src/const/text';
import { NavigateEnum } from '@src/navigation/type';
import OtpInputDialog from './component/OtpInputDialog';
import MyMessageDialog from './component/MyMessageDialog';
import MyLoading from './component/MyLoading';
import {
    setIsShow_messageDialog,
    setData_messageDialog,
    set_isLoading,
    setToken_otpDialog,
    setIsShow_otpDialog,
} from '@src/redux/slice/Signup';
import { MessageDialog_TypeEnum } from '@src/component/MessageDialog/type';
import { useSignupMutation } from '@src/redux/query/accountRTK';
// import { router_res_type } from '@src/interface';
import { AccountField } from '@src/dataStruct/account';
import { account_field_type, account_enum } from './type';
import { isSpace, isFirstNumber, containsSpecialCharacters, isValidPhoneNumber } from '@src/utility/string';
import { formatPhone } from '@src/utility/string';
import { sendOtp } from '@src/otp/handle';

const Signup = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<any>();

    const token: string = useSelector((state: RootState) => state.SignupSlice.otpDialog.token);

    const [account, setAccount] = useState<AccountField>({
        id: 0,
        userName: '',
        password: '',
        phone: '',
        firstName: '',
        lastName: '',
        avatar: null,
        status: '',
        updateTime: '',
        createTime: '',
    });
    const [confirmation, setConfirmation] = useState<any>(null);

    const [signup] = useSignupMutation();

    const handleChange = (value: string, field: account_field_type) => {
        checkString(value, field);
        switch (field) {
            case account_enum.USERNAME: {
                setAccount({ ...account, userName: value });
                break;
            }
            case account_enum.PASSWORD: {
                setAccount({ ...account, password: value });
                break;
            }
            case account_enum.PHONE: {
                setAccount({ ...account, phone: value });
                break;
            }
            case account_enum.FIRST_NAME: {
                setAccount({ ...account, firstName: value });
                break;
            }
            case account_enum.LAST_NAME: {
                setAccount({ ...account, lastName: value });
                break;
            }
            default: {
                break;
            }
        }
    };

    const checkString = (str: string, field: account_field_type) => {
        switch (field) {
            case account_enum.USERNAME: {
                if (isSpace(str)) {
                    dispatch(setIsShow_messageDialog(true));
                    dispatch(
                        setData_messageDialog({
                            type: MessageDialog_TypeEnum.ERROR,
                            message: 'Tên tài khoản không được có khoảng trắng !',
                        })
                    );
                } else if (isFirstNumber(str)) {
                    dispatch(setIsShow_messageDialog(true));
                    dispatch(
                        setData_messageDialog({
                            type: MessageDialog_TypeEnum.ERROR,
                            message: 'Ký tự đầu tiên không được là số !',
                        })
                    );
                } else if (containsSpecialCharacters(str)) {
                    dispatch(setIsShow_messageDialog(true));
                    dispatch(
                        setData_messageDialog({
                            type: MessageDialog_TypeEnum.ERROR,
                            message: 'Tên tài khoản không được chứa ký tự đặc biệt !',
                        })
                    );
                }
                break;
            }
            case account_enum.PASSWORD: {
                if (isSpace(str)) {
                    dispatch(setIsShow_messageDialog(true));
                    dispatch(
                        setData_messageDialog({
                            type: MessageDialog_TypeEnum.ERROR,
                            message: 'Không được có khoảng trắng !',
                        })
                    );
                } else if (containsSpecialCharacters(str)) {
                    dispatch(setIsShow_messageDialog(true));
                    dispatch(
                        setData_messageDialog({
                            type: MessageDialog_TypeEnum.ERROR,
                            message: 'Mật khẩu không được chứa ký tự đặc biệt !',
                        })
                    );
                }
                break;
            }
            case account_enum.PHONE: {
                if (isSpace(str)) {
                    dispatch(setIsShow_messageDialog(true));
                    dispatch(
                        setData_messageDialog({
                            type: MessageDialog_TypeEnum.ERROR,
                            message: 'Không được có khoảng trắng !',
                        })
                    );
                } else if (containsSpecialCharacters(str)) {
                    dispatch(setIsShow_messageDialog(true));
                    dispatch(
                        setData_messageDialog({
                            type: MessageDialog_TypeEnum.ERROR,
                            message: 'Số điện thoại không được chứa ký tự đặc biệt !',
                        })
                    );
                } else if (!isValidPhoneNumber(str)) {
                    dispatch(setIsShow_messageDialog(true));
                    dispatch(
                        setData_messageDialog({
                            type: MessageDialog_TypeEnum.ERROR,
                            message: 'Không phải là số điện thoại !',
                        })
                    );
                }
                break;
            }
            case account_enum.FIRST_NAME: {
                if (containsSpecialCharacters(str)) {
                    dispatch(setIsShow_messageDialog(true));
                    dispatch(
                        setData_messageDialog({
                            type: MessageDialog_TypeEnum.ERROR,
                            message: 'Tên không được chứa ký tự đặc biệt !',
                        })
                    );
                }
                break;
            }
            case account_enum.LAST_NAME: {
                if (containsSpecialCharacters(str)) {
                    dispatch(setIsShow_messageDialog(true));
                    dispatch(
                        setData_messageDialog({
                            type: MessageDialog_TypeEnum.ERROR,
                            message: 'Họ không được chứa ký tự đặc biệt !',
                        })
                    );
                }
                break;
            }
            default: {
                break;
            }
        }
    };

    useEffect(() => {
        if (token.length === 0) return;
        dispatch(set_isLoading(true));
        signup({ body: account, token: token })
            .then((res) => {
                const resData = res.data;
                if (resData?.isSuccess && resData?.data) {
                    dispatch(setIsShow_messageDialog(true));
                    dispatch(
                        setData_messageDialog({ type: MessageDialog_TypeEnum.SUCCESS, message: 'Đăng ký thành công !' })
                    );
                } else {
                    dispatch(setIsShow_messageDialog(true));
                    dispatch(
                        setData_messageDialog({
                            type: MessageDialog_TypeEnum.ERROR,
                            message: 'Đăng ký thất bại !',
                        })
                    );
                }
            })
            .catch((err) => console.error(err))
            .finally(() => {
                dispatch(setToken_otpDialog(''));
                dispatch(set_isLoading(false));
            });
    }, [dispatch, token, account, signup]);

    const handleSignup = () => {
        handleSendOtp();
    };

    const handleSendOtp = async () => {
        const phone = formatPhone(account.phone.trim());
        if (phone.length === 0) return;
        const res = await sendOtp(phone);
        if (!res) {
            dispatch(setData_messageDialog({ type: MessageDialog_TypeEnum.ERROR, message: 'Gửi mã OTP thất bại !' }));
            dispatch(setIsShow_messageDialog(true));
            return;
        }
        setConfirmation(res);
        dispatch(setIsShow_otpDialog(true));
    };

    const handleGotoForgetPassword = () => {
        navigation.navigate(NavigateEnum.FORGET_PASSWORD);
    };

    const handleGotoSignin = () => {
        navigation.navigate(NavigateEnum.SIGNIN);
    };

    // const handleSignup = () => {
    //     dispatch(set_isLoading(true));
    //     dispatch(setData_messageDialog({ type: MessageDialog_TypeEnum.SUCCESS, message: 'Đăng ký thành công!' }));
    //     dispatch(setIsShow_messageDialog(true));
    // };

    return (
        <View style={styles.parent}>
            <View style={styles.main}>
                <View style={styles.row}>
                    <View style={styles.txtContainer}>
                        <Text>{ACCOUNT}</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => handleChange(value, account_enum.USERNAME)}
                        placeholder={ACCOUNT}
                    />
                </View>
                <View style={styles.row}>
                    <View style={styles.txtContainer}>
                        <Text>{PASSWORD}</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => handleChange(value, account_enum.PASSWORD)}
                        placeholder={PASSWORD}
                        secureTextEntry
                    />
                </View>
                <View style={styles.row}>
                    <View style={styles.txtContainer}>
                        <Text>{PHONE_NUMBER}</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => handleChange(value, account_enum.PHONE)}
                        placeholder={PHONE_NUMBER}
                    />
                </View>
                <View style={styles.row}>
                    <View style={styles.txtContainer}>
                        <Text>{FIRST_NAME}</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => handleChange(value, account_enum.FIRST_NAME)}
                        placeholder={FIRST_NAME}
                    />
                </View>
                <View style={styles.row}>
                    <View style={styles.txtContainer}>
                        <Text>{LAST_NAME}</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => handleChange(value, account_enum.LAST_NAME)}
                        placeholder={LAST_NAME}
                    />
                </View>
                <TouchableOpacity onPress={() => handleSignup()}>
                    <View style={styles.btn1Container}>
                        <Text style={styles.btn1Text}>{SIGNUP}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.btn2Container}>
                    <TouchableOpacity onPress={() => handleGotoForgetPassword()}>
                        <Text style={styles.btn2Text}>{FORGET_PASSWORD}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleGotoSignin()}>
                        <Text style={styles.btn2Text}>{SIGNIN}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <OtpInputDialog confirmation={confirmation} />
            <MyMessageDialog />
            <MyLoading />
        </View>
    );
};

export default Signup;
