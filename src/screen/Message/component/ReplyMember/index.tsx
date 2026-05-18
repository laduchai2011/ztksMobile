import React, { memo, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AccountField } from '@src/dataStruct/account';
import { SEE_MORE } from '@src/const/text';
import Added from './component/Added';

const ReplyMember = () => {
    const [isShowAdded, setIsShowAdded] = useState<boolean>(false);
    const [replyAccounts, setReplyAccount] = useState<AccountField[]>([]);
    const [replyAccountTotal, setReplyAccountTotal] = useState<number>(10);
    const [replyAccountIndex, setReplyAccountIndex] = useState<number>(1);
    const replyAccountSize = 5;

    const [isShowNotAdded, setIsShowNotAdded] = useState<boolean>(false);
    const [notReplyAccounts, setNotReplyAccount] = useState<AccountField[]>([]);
    const [notReplyAccountTotal, setNotReplyAccountTotal] = useState<number>(-1);
    const [notReplyAccountIndex, setNotReplyAccountIndex] = useState<number>(1);
    const notReplyAccountSize = 10;

    const handleShowDown = () => {
        setIsShowAdded(true);
        setIsShowNotAdded(false);
    };

    const handleShowUp = () => {
        setIsShowAdded(false);
    };

    const handleShowNotAdded = () => {
        setIsShowAdded(false);
        setIsShowNotAdded(!isShowNotAdded);
    };

    const handleSeeMore_replyAccount = () => {
        setReplyAccountIndex((pre) => pre + 1);
    };

    return (
        <View style={styles.parent}>
            <View style={styles.header}>
                <View style={styles.txtContainer}>
                    <Text style={styles.txt}>Thành viên trả lời tin nhắn</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Ionicons name="add" size={28} color="green" />
                    {!isShowAdded && (
                        <Pressable onPress={handleShowDown}>
                            <Entypo name="chevron-small-down" size={28} color="black" />
                        </Pressable>
                    )}
                    {isShowAdded && (
                        <Pressable onPress={handleShowUp}>
                            <Entypo name="chevron-small-up" size={28} color="black" />
                        </Pressable>
                    )}
                </View>
            </View>
            <View style={styles.addedList}>
                <Added />
                <Added />
                <Added />
                {replyAccounts.length < replyAccountTotal && (
                    <View style={styles.addedMore}>
                        <Pressable onPress={handleSeeMore_replyAccount}>
                            <Text style={styles.addedTxt}>{SEE_MORE}</Text>
                        </Pressable>
                    </View>
                )}
            </View>
        </View>
    );
};

export default memo(ReplyMember);
