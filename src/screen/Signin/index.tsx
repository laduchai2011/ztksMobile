import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

const Signin = () => {
    return (
        <View style={styles.parent}>
            <View style={styles.main}>
                <Text>Sign In</Text>
            </View>
        </View>
    );
};

export default Signin;
