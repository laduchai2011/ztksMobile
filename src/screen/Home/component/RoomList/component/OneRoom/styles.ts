import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    parent: {
        height: 80,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        height: 55,
        width: 55,
        borderRadius: 50,
    },
    nameContainer: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 500,
    },
    message: {
        color: 'gray',
    },
    timeContainer: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
