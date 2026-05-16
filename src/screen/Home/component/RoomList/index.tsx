import React, { memo, useState } from 'react';
import { View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import OneRoom from './component/OneRoom';

const RoomList = () => {
    const [data, setData] = useState(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`));

    const [loading, setLoading] = useState(false);

    const loadMore = () => {
        if (loading) return;

        setLoading(true);

        setTimeout(() => {
            const newData = Array.from({ length: 20 }, (_, i) => `Item ${data.length + i + 1}`);

            setData((prev) => [...prev, ...newData]);
            setLoading(false);
        }, 1000);
    };

    return (
        <View style={styles.parent}>
            <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        <OneRoom data={item} />
                    </TouchableOpacity>
                )}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
            />
        </View>
    );
};

export default memo(RoomList);
