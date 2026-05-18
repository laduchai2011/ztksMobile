import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    parent: {
        padding: 5,
        width: '100%',
    },
    indexContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inforContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    txt1c: {
        paddingLeft: 5,
    },
    txt1: {
        color: 'blue',
        fontSize: 12,
        fontStyle: 'italic',
    },
    txt2c: {
        paddingLeft: 5,
        flex: 1,
    },
    txt2: {
        fontWeight: 500,
    },
});
