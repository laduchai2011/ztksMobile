import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import OaList from './component/OaList';
import RoomList from './component/RoomList';

const Home = () => {
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
