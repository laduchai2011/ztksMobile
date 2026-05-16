import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    parent: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    dialog: {
        backgroundColor: 'white',
        width: '60%',
        padding: 10,
        borderRadius: 10,
    },
    closeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
