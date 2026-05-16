import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
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

const Signup = () => {
    const navigation = useNavigation<any>();

    const handleGotoForgetPassword = () => {
        navigation.navigate(NavigateEnum.FORGET_PASSWORD);
    };

    const handleGotoSignin = () => {
        navigation.navigate(NavigateEnum.SIGNIN);
    };

    return (
        <View style={styles.parent}>
            <View style={styles.main}>
                <View style={styles.row}>
                    <View style={styles.txtContainer}>
                        <Text>{ACCOUNT}</Text>
                    </View>
                    <TextInput style={styles.input} placeholder={ACCOUNT} />
                </View>
                <View style={styles.row}>
                    <View style={styles.txtContainer}>
                        <Text>{PASSWORD}</Text>
                    </View>
                    <TextInput style={styles.input} placeholder={PASSWORD} secureTextEntry />
                </View>
                <View style={styles.row}>
                    <View style={styles.txtContainer}>
                        <Text>{PHONE_NUMBER}</Text>
                    </View>
                    <TextInput style={styles.input} placeholder={PHONE_NUMBER} />
                </View>
                <View style={styles.row}>
                    <View style={styles.txtContainer}>
                        <Text>{FIRST_NAME}</Text>
                    </View>
                    <TextInput style={styles.input} placeholder={FIRST_NAME} />
                </View>
                <View style={styles.row}>
                    <View style={styles.txtContainer}>
                        <Text>{LAST_NAME}</Text>
                    </View>
                    <TextInput style={styles.input} placeholder={LAST_NAME} />
                </View>
                <TouchableOpacity>
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
        </View>
    );
};

export default Signup;
