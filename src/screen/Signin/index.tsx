import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@src/redux';
import { ACCOUNT, PASSWORD, SIGNIN, FORGET_PASSWORD, SIGNUP } from '@src/const/text';
import { NavigateEnum } from '@src/navigation/type';
import { getAccountId } from '@src/utility/checkSignin';
import { useSigninMutation } from '@src/redux/query/accountRTK';
import { AccountField } from '@src/dataStruct/account';
import { MessageDialog_TypeEnum } from '@src/component/MessageDialog/type';
import { setIsShow_messageDialog, setData_messageDialog, set_isLoading } from '@src/redux/slice/Signin';
import { account_field_type, account_enum } from './type';

const Signin = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<any>();

    const [account, setAccount] = useState<AccountField>({
        id: -1,
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

    const myId = getAccountId();

    const [signin] = useSigninMutation();

    // useEffect(() => {
    //     if (myId !== null) {
    //         navigation.navigate(NavigateEnum.HOME);
    //     }
    // }, [navigation, myId]);

    const handleInput = (value: string, type: account_field_type) => {
        if (type === account_enum.USERNAME) {
            setAccount({ ...account, userName: value });
        }
        if (type === account_enum.PASSWORD) {
            setAccount({ ...account, password: value });
        }
    };

    const handleSignin = () => {
        dispatch(set_isLoading(true));
        signin(account)
            .then((res) => {
                const resData = res.data;

                console.log('signin', resData);

                if (resData?.isSuccess) {
                    navigation.navigate(NavigateEnum.ROOT_TAB, {
                        screen: NavigateEnum.HOME,
                    });
                } else {
                    dispatch(setIsShow_messageDialog(true));
                    dispatch(
                        setData_messageDialog({
                            type: MessageDialog_TypeEnum.ERROR,
                            message: 'Đăng nhập thất bại !',
                        })
                    );
                }
            })
            .catch((err) => {
                console.error(err);
                dispatch(setIsShow_messageDialog(true));
                dispatch(
                    setData_messageDialog({
                        type: MessageDialog_TypeEnum.ERROR,
                        message: 'Đã có lỗi xảy ra !',
                    })
                );
            })
            .finally(() => {
                dispatch(set_isLoading(false));
            });
    };

    const handleGotoForgetPassword = () => {
        navigation.navigate(NavigateEnum.FORGET_PASSWORD);
    };

    const handleGotoSignup = () => {
        navigation.navigate(NavigateEnum.SIGNUP);
    };

    return (
        <View style={styles.parent}>
            <View style={styles.main}>
                <View style={styles.row}>
                    <View style={styles.txtContainer}>
                        <Text>{ACCOUNT}</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => handleInput(value, account_enum.USERNAME)}
                        placeholder={ACCOUNT}
                    />
                </View>
                <View style={styles.row}>
                    <View style={styles.txtContainer}>
                        <Text>{PASSWORD}</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => handleInput(value, account_enum.PASSWORD)}
                        placeholder={PASSWORD}
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity onPress={() => handleSignin()}>
                    <View style={styles.btn1Container}>
                        <Text style={styles.btn1Text}>{SIGNIN}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.btn2Container}>
                    <TouchableOpacity onPress={() => handleGotoForgetPassword()}>
                        <Text style={styles.btn2Text}>{FORGET_PASSWORD}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleGotoSignup()}>
                        <Text style={styles.btn2Text}>{SIGNUP}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Signin;
