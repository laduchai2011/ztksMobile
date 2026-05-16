import React, { memo } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import Dot from './component/Dot';

const Loading = () => {
    return (
        <View style={styles.parent}>
            <View style={styles.dotContainer}>
                <Dot delay={0} />
                <Dot delay={200} />
                <Dot delay={400} />
            </View>
        </View>
    );
};

export default memo(Loading);
