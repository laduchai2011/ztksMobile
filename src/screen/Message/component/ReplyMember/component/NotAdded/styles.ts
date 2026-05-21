import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    parent: {
        padding: 5,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    inforContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    txtc: {
        paddingLeft: 5,
        flex: 1,
    },
    txt: {
        fontWeight: 500,
        fontSize: 18,
    },
    addBtnC: {
        backgroundColor: 'green',
        padding: 3,
        borderRadius: 5,
    },
    addBtn: {
        color: 'white',
    },
});
