import React, { FC, memo } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { NavigateEnum } from '@src/navigation/type';

const OneRoom: FC<{ data: number }> = ({ data }) => {
    const navigation = useNavigation<any>();
    const imgUrl = 'https://api.5kaquarium.com/service_image_v1/query/image/1778517412032_1_133955780355947187.jpg';

    const goToMessage = () => {
        navigation.navigate(NavigateEnum.MESSAGE, { id: 1 });
    };

    return (
        <TouchableOpacity onPress={goToMessage}>
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
