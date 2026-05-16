import React, { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { styles } from './styles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Infor from './component/Infor';
import Options from './component/Options';
import MyLoading from './component/MyLoading';
import MyMessageDialog from './component/MyMessageDialog';
import { NavigateEnum } from '@src/navigation/type';
import { isSignin } from '@src/utility/checkSignin';

const Profile = () => {
    const navigation = useNavigation<any>();

    useFocusEffect(
        useCallback(() => {
            isSignin().then((result) => {
                if (!result) {
                    navigation.navigate(NavigateEnum.SIGNIN);
                }
            });
        }, [])
    );

    return (
        <View style={styles.parent}>
            <View style={styles.main}>
                <ScrollView>
                    <Infor />
                    <Options />
                </ScrollView>
                <MyLoading />
                <MyMessageDialog />
            </View>
        </View>
    );
};

export default Profile;
