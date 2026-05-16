import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    parent: {
        width: '100%',
        padding: 10,

        backgroundColor: '#fff',
        borderRadius: 12,

        // iOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,

        // Android
        elevation: 5,
    },
    avatarContainer: {
        width: '100%',
        height: 140,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    nameContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 500,
    },
    typeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    accountType: {
        color: 'blue',
    },

    idHiddenContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    idTextDot: {
        width: 150,
    },
    idText: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    idDotContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    idEyeContainer: {
        flexDirection: 'row',
    },

    recommendHiddenContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    recommendTextDot: {
        width: 150,
    },
    recommendText: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    recommendDotContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    recommendEyeContainer: {
        flexDirection: 'row',
    },
});
