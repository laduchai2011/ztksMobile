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
        zIndex: 999,
        elevation: 999,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    input: {
        width: 50,
        height: 55,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#fff',
    },
});
