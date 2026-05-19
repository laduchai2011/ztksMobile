import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

const NotAdded = () => {
    return (
        <View style={styles.parent}>
            <Text>Not Added</Text>
        </View>
    );
};

export default memo(NotAdded);
