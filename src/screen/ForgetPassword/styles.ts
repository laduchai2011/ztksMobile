import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    parent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    main: {},
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    txtContainer: {
        width: 100,
        marginRight: 5,
    },
    input: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: '#e2e2e2',
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    btn1Container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        backgroundColor: 'blue',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    btn1Text: {
        color: 'white',
    },
    btn2Container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300,
    },
    btn2Text: {
        color: 'blue',
    },
});
