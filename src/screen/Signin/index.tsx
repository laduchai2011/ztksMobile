import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { ACCOUNT, PASSWORD, SIGNIN, FORGET_PASSWORD, SIGNUP } from '@src/const/text';
import { NavigateEnum } from '@src/navigation/type';

const Signin = () => {
    const navigation = useNavigation<any>();

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
