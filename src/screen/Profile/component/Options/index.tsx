import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

const Options = () => {
    return (
        <View style={styles.parent}>
            <View style={styles.oneCluster}>
                <Text style={styles.header}>OA</Text>
                <View style={styles.content}>
                    <TouchableOpacity>
                        <View style={styles.oneOption}>
                            <Text>OA</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.oneCluster}>
                <Text style={styles.header}>Thành viên</Text>
                <View style={styles.content}>
                    <TouchableOpacity>
                        <View style={styles.oneOption}>
                            <Text>Thành viên</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.oneOption}>
                            <Text>Quản lý nhân viên</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.oneOption}>
                            <Text>Tài khoản nhận tin nhắn</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.oneCluster}>
                <Text style={styles.header}>Tiền</Text>
                <View style={styles.content}>
                    <TouchableOpacity>
                        <View style={styles.oneOption}>
                            <Text>Ví tiền</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.oneOption}>
                            <Text>Ngân hàng</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.oneCluster}>
                <Text style={styles.header}>Bài đăng</Text>
                <View style={styles.content}>
                    <TouchableOpacity>
                        <View style={styles.oneOption}>
                            <Text>Bài đăng</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.oneCluster}>
                <Text style={styles.header}>Mở rộng</Text>
                <View style={styles.content}>
                    <TouchableOpacity>
                        <View style={styles.oneOption}>
                            <Text>Rời đi</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.oneOption}>
                            <Text>Đăng xuất</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default memo(Options);
