import React, { memo, useState, useRef, useEffect } from 'react';
import { Animated, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/redux';
import Entypo from 'react-native-vector-icons/Entypo';
import { useLazyGetZaloOaListWith2FkQuery } from '@src/redux/query/zaloRTK';
import { AccountInformationField } from '@src/dataStruct/account';
import { ZaloAppField, ZaloOaField } from '@src/dataStruct/zalo';
import { setIsShow_messageDialog, setData_messageDialog, set_isLoading } from '@src/redux/slice/Home';
import { set_selectedOa } from '@src/redux/slice/App';
import { MessageDialog_TypeEnum } from '@src/component/MessageDialog/type';
import { SEE_MORE } from '@src/const/text';

const OaList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const accountInformation: AccountInformationField | undefined = useSelector(
        (state: RootState) => state.AppSlice.accountInformation
    );
    const zaloApp: ZaloAppField | undefined = useSelector((state: RootState) => state.AppSlice.zaloApp);
    const selectedOa: ZaloOaField | undefined = useSelector((state: RootState) => state.AppSlice.selectedOa);
    const [isShow, setIsShow] = useState(false);
    const maxHeightAnim = useRef(new Animated.Value(0)).current;
    const [page, setPage] = useState<number>(1);
    const size: number = 5;
    const [zaloOaList, setZaloOaList] = useState<ZaloOaField[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [getZaloOaListWith2Fk] = useLazyGetZaloOaListWith2FkQuery();

    useEffect(() => {
        Animated.timing(maxHeightAnim, {
            toValue: isShow ? 300 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isShow]);

    useEffect(() => {
        if (!accountInformation || !zaloApp) return;
        dispatch(set_isLoading(true));
        getZaloOaListWith2Fk({
            page: page,
            size: size,
            zaloAppId: zaloApp.id,
            accountId: accountInformation.addedById || -1,
        })
            .then((res) => {
                const resData = res.data;
                if (resData?.isSuccess && resData.data) {
                    if (page === 1) {
                        setZaloOaList(resData.data.items);
                    } else {
                        setZaloOaList((prev) => [...prev, ...(resData.data?.items ?? [])]);
                    }

                    setTotal(resData.data.totalCount);
                }
            })
            .catch((err) => {
                console.error(err);
                dispatch(setIsShow_messageDialog(true));
                dispatch(setData_messageDialog({ type: MessageDialog_TypeEnum.ERROR, message: 'Đã có lỗi xảy ra !' }));
            })
            .finally(() => {
                dispatch(set_isLoading(false));
            });
    }, [dispatch, accountInformation, getZaloOaListWith2Fk, page, zaloApp]);

    const handleIsShow = () => {
        setIsShow(!isShow);
    };

    const handleSelected = (item: ZaloOaField) => {
        dispatch(set_selectedOa(item));
    };

    const handleSeeMore = () => {
        setPage((prev) => prev + 1);
    };

    return (
        <View style={styles.parent}>
            <View style={styles.selected}>
                <View style={styles.selectedText}>
                    <Text>{selectedOa?.oaName}</Text>
                </View>
                {!isShow && (
                    <TouchableOpacity onPress={() => handleIsShow()}>
                        <Entypo name="chevron-small-down" size={28} color="black" />
                    </TouchableOpacity>
                )}
                {isShow && (
                    <TouchableOpacity onPress={() => handleIsShow()}>
                        <Entypo name="chevron-small-up" size={28} color="black" />
                    </TouchableOpacity>
                )}
            </View>
            <Animated.View
                style={[
                    styles.list,
                    {
                        maxHeight: maxHeightAnim,
                    },
                ]}
            >
                <FlatList
                    data={zaloOaList}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.oneOa} onPress={() => handleSelected(item)}>
                            <Text>{item.oaName}</Text>
                        </TouchableOpacity>
                    )}
                />
            </Animated.View>
        </View>
    );
};

export default memo(OaList);
