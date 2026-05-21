import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import { ADD } from '@src/const/text';

const NotAdded = () => {
    return (
        <View style={styles.parent}>
            <View style={styles.inforContainer}>
                <FastImage
                    style={styles.avatar}
                    source={{
                        uri: 'https://picsum.photos/300/300',
                        priority: FastImage.priority.normal,
                        cache: FastImage.cacheControl.immutable,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <View style={styles.txtc}>
                    <Text style={styles.txt} numberOfLines={1} ellipsizeMode="tail">
                        Nguyen Van A
                    </Text>
                </View>
            </View>
            <View style={styles.addBtnC}>
                <Text style={styles.addBtn}>{ADD}</Text>
            </View>
        </View>
    );
};

export default memo(NotAdded);
