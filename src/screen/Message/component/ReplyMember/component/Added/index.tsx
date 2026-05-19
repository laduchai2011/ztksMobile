import React, { memo, useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@src/redux';
import FastImage from 'react-native-fast-image';
import { avatarnull } from '@src/utility/string';
import { YOU } from '@src/const/text';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { setIsShow_colorPickerDialog } from '@src/redux/slice/Message';

const Added = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [isRead, setIsRead] = useState<boolean>(false);
    const [isSend, setIsSend] = useState<boolean>(false);

    const handleIsRead = () => {
        setIsRead(!isRead);
    };

    const handleIsSend = () => {
        setIsSend(!isSend);
    };

    const handleBackgroundColor = () => {
        dispatch(setIsShow_colorPickerDialog(true));
    };

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
            <View style={styles.statusContainer}>
                <View style={styles.oneStatus}>
                    <FontAwesome name="check-square" onPress={handleIsRead} size={20} color={isRead ? 'red' : 'gray'} />
                    <View style={styles.txtc}>
                        <Text style={{ color: isRead ? 'red' : 'gray' }}>Đọc</Text>
                    </View>
                </View>
                <View style={styles.oneStatus}>
                    <FontAwesome
                        name="check-square"
                        onPress={handleIsSend}
                        size={20}
                        color={isSend ? 'blue' : 'gray'}
                    />
                    <View style={styles.txtc}>
                        <Text style={{ color: isSend ? 'blue' : 'gray' }}>Gửi</Text>
                    </View>
                </View>
                <View style={styles.oneStatus}>
                    <FontAwesome name="square" onPress={handleBackgroundColor} size={20} color="gray" />
                    <View style={styles.txtc}>
                        <Text>Màu nền</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default memo(Added);
