import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { ACCOUNT, PASSWORD, SIGNIN, SEND, SIGNUP } from '@src/const/text';
import { NavigateEnum } from '@src/navigation/type';

const ForgetPassword = () => {
    const navigation = useNavigation<any>();

    const handleGotoSignin = () => {
        navigation.navigate(NavigateEnum.SIGNIN);
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
                    <TextInput style={styles.input} placeholder={ACCOUNT} />
                </View>
                <View style={styles.row}>
                    <View style={styles.txtContainer}>
                        <Text>{PASSWORD}</Text>
                    </View>
                    <TextInput style={styles.input} placeholder={PASSWORD} secureTextEntry />
                </View>
                <TouchableOpacity>
                    <View style={styles.btn1Container}>
                        <Text style={styles.btn1Text}>{SEND}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.btn2Container}>
                    <TouchableOpacity onPress={() => handleGotoSignin()}>
                        <Text style={styles.btn2Text}>{SIGNIN}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleGotoSignup()}>
                        <Text style={styles.btn2Text}>{SIGNUP}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ForgetPassword;
