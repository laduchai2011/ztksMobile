import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import { avatarnull } from '@src/utility/string';
import { YOU } from '@src/const/text';

const Added = () => {
    return (
        <View style={styles.parent}>
            <View style={styles.indexContainer}>
                <Text>1</Text>
            </View>
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
                <View style={styles.txt1c}>
                    <Text style={styles.txt1}>{YOU}</Text>
                </View>
                <View style={styles.txt2c}>
                    <Text style={styles.txt2} numberOfLines={1} ellipsizeMode="tail">
                        Nguyen Van A
                    </Text>
                </View>
            </View>
            <View></View>
        </View>
    );
};

export default memo(Added);
