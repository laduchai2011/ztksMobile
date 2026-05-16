import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
import { styles } from './styles';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MessageDialogProps, MessageDialog_TypeEnum } from './type';

const MessageDialog: FC<{ data: MessageDialogProps; isShow: boolean; onClose(): void }> = ({
    data,
    isShow,
    onClose,
}) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const [visible, setVisible] = useState(isShow);

    useEffect(() => {
        if (isShow) {
            setVisible(true);

            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                setVisible(false);
            });
        }
    }, [isShow]);

    const handleClose = () => {
        onClose();
    };

    if (!visible) {
        return null;
    }

    return (
        <Animated.View
            style={[
                styles.parent,
                {
                    opacity,
                },
            ]}
        >
            <View style={styles.dialog}>
                <View style={styles.closeContainer}>
                    <Pressable onPress={() => handleClose()}>
                        <EvilIcons name="close" size={28} color="black" />
                    </Pressable>
                </View>
                <View style={styles.textContainer}>
                    <Text>message</Text>
                </View>
                <View style={styles.iconContainer}>
                    {data.type === MessageDialog_TypeEnum.ERROR && <MaterialIcons name="error" size={28} color="red" />}
                    {data.type === MessageDialog_TypeEnum.WARN && (
                        <MaterialIcons name="warning" size={28} color="yellow" />
                    )}
                    {data.type === MessageDialog_TypeEnum.SUCCESS && (
                        <MaterialIcons name="check" size={28} color="green" />
                    )}
                </View>
            </View>
        </Animated.View>
    );
};

export default MessageDialog;
