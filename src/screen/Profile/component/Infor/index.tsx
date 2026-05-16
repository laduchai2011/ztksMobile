import React, { memo, useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { styles } from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { avatarnull } from '@src/utility/string';

const Infor = () => {
    const [isShowId, setIsShowId] = useState<boolean>(false);
    const [isShowRecommend, setIsShowRecommendd] = useState<boolean>(false);

    const handleIsShowId = (isShow: boolean) => {
        setIsShowId(isShow);
    };

    const handleIsShowRecommend = (isShow: boolean) => {
        setIsShowRecommendd(isShow);
    };

    return (
        <View style={styles.parent}>
            <View style={styles.avatarContainer}>
                <Image style={styles.avatar} source={{ uri: avatarnull }} />
                <Ionicons name="add-circle-outline" size={28} color="black" />
            </View>
            <View>
                <View style={styles.nameContainer}>
                    <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                        name name name name name name name name name name name name name
                    </Text>
                </View>
                <View style={styles.typeContainer}>
                    <Text style={styles.accountType}>admin</Text>
                </View>
                <View style={styles.idHiddenContainer}>
                    <View style={styles.idTextDot}>
                        {isShowId && (
                            <View style={styles.idText}>
                                <Text>name</Text>
                            </View>
                        )}
                        {!isShowId && (
                            <View style={styles.idDotContainer}>
                                <Entypo name="dot-single" size={22} />
                                <Entypo name="dot-single" size={22} />
                                <Entypo name="dot-single" size={22} />
                                <Entypo name="dot-single" size={22} />
                                <Entypo name="dot-single" size={22} />
                                <Entypo name="dot-single" size={22} />
                            </View>
                        )}
                    </View>
                    <View style={styles.idEyeContainer}>
                        {!isShowId && (
                            <Pressable onPress={() => handleIsShowId(true)}>
                                <Feather name="eye" size={20} />
                            </Pressable>
                        )}
                        {isShowId && (
                            <Pressable onPress={() => handleIsShowId(false)}>
                                <Feather name="eye-off" size={20} />
                            </Pressable>
                        )}
                    </View>
                </View>
                <View style={styles.recommendHiddenContainer}>
                    <View style={styles.recommendTextDot}>
                        {isShowRecommend && (
                            <View style={styles.recommendText}>
                                <Text>recommend</Text>
                            </View>
                        )}
                        {!isShowRecommend && (
                            <View style={styles.recommendDotContainer}>
                                <Entypo name="dot-single" size={22} />
                                <Entypo name="dot-single" size={22} />
                                <Entypo name="dot-single" size={22} />
                                <Entypo name="dot-single" size={22} />
                                <Entypo name="dot-single" size={22} />
                                <Entypo name="dot-single" size={22} />
                            </View>
                        )}
                    </View>
                    <View style={styles.recommendEyeContainer}>
                        {!isShowRecommend && (
                            <Pressable onPress={() => handleIsShowRecommend(true)}>
                                <Feather name="eye" size={20} />
                            </Pressable>
                        )}
                        {isShowRecommend && (
                            <Pressable onPress={() => handleIsShowRecommend(false)}>
                                <Feather name="eye-off" size={20} />
                            </Pressable>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
};

export default memo(Infor);
