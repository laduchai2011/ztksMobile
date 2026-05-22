import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    parent: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    main: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    msgContainer: {
        flex: 1,
        height: '100%',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        padding: 5,
        backgroundColor: '#d8d8d8',
        borderRadius: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
});
