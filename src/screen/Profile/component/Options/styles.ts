import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    parent: {
        margin: 10,
    },
    oneCluster: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 12,
        marginBottom: 10,

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
    header: {
        fontWeight: 500,
        fontSize: 18,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        padding: 10,
    },
    oneOption: {
        height: 40,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EDEDED',
        borderRadius: 8,
        padding: 5,
    },
});
