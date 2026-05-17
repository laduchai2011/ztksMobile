import React, { FC, useRef, useState, useEffect } from 'react';
import { View, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@src/redux';
import { setToken_otpDialog, setIsShow_otpDialog, setData_messageDialog, set_isLoading } from '@src/redux/slice/Signup';
import { verifyOtp } from '@src/otp/handle';
import { MessageDialog_TypeEnum } from '@src/component/MessageDialog/type';

const OTP_LENGTH = 6;

const OtpInputDialog: FC<{ confirmation: any }> = ({ confirmation }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));

    const inputRefs = useRef<Array<TextInput | null>>([]);

    useEffect(() => {
        const stringOtp = otp.join('');
        console.log('OTP:', stringOtp);

        if (stringOtp.length === OTP_LENGTH) {
            dispatch(set_isLoading(true));
            handleVerify(stringOtp)
                .then((token) => {
                    if (!token) {
                        dispatch(
                            setData_messageDialog({
                                type: MessageDialog_TypeEnum.ERROR,
                                message: 'Xác thực OTP thất bại!',
                            })
                        );
                    } else {
                        dispatch(setToken_otpDialog(token));
                        dispatch(setIsShow_otpDialog(false));
                    }
                })
                .catch((error) => {
                    console.error('OTP verification failed:', error);
                    dispatch(
                        setData_messageDialog({
                            type: MessageDialog_TypeEnum.ERROR,
                            message: 'Mã OTP không đúng!',
                        })
                    );
                })
                .finally(() => {
                    dispatch(set_isLoading(false));
                });
        }
    });

    const handleVerify = async (otp: string) => {
        const token = await verifyOtp(confirmation, otp);
        return token;
    };

    const handleChange = (text: string, index: number) => {
        if (!/^\d?$/.test(text)) {
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // tự động chuyển sang ô tiếp theo
        if (text && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        console.log('OTP:', newOtp.join(''));
    };

    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        // backspace quay lại ô trước
        if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <View style={styles.parent}>
            <View style={styles.container}>
                {otp.map((value, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => {
                            inputRefs.current[index] = ref;
                        }}
                        value={value}
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        keyboardType="number-pad"
                        maxLength={1}
                        style={styles.input}
                        textAlign="center"
                    />
                ))}
            </View>
        </View>
    );
};

export default OtpInputDialog;
