import React, { useCallback } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import OaList from './component/OaList';
import RoomList from './component/RoomList';
import { NavigateEnum } from '@src/navigation/type';
import { isSignin } from '@src/utility/checkSignin';

const Home = () => {
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
                <OaList />
                <RoomList />
            </View>
        </View>
    );
};

export default Home;
