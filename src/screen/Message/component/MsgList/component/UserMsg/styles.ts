import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    parent: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 5,
    },
    main: {
        // width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    msgContainer: {
        // flex: 1,
        height: '100%',
        maxWidth: '80%',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: 5,
        backgroundColor: '#d8d8d8',
        borderRadius: 10,
    },
    avatarContainer: {
        alignSelf: 'flex-start',
        margin: 3,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
});
