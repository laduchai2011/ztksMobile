import React, { FC, memo } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';

const OneRoom: FC<{ data: number }> = ({ data }) => {
    const imgUrl = 'https://api.5kaquarium.com/service_image_v1/query/image/1778517412032_1_133955780355947187.jpg';

    return (
        <TouchableOpacity>
            <View style={styles.parent}>
                <View style={styles.avatarContainer}>
                    <Image style={styles.avatar} source={{ uri: imgUrl }} />
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>Name</Text>
                    <Text style={styles.message}>message</Text>
                </View>
                <View style={styles.timeContainer}>
                    <Text>{data}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default memo(OneRoom);
