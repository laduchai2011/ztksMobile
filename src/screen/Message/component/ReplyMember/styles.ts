import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    parent: {},
    header: {
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
    },
    txtContainer: {
        flex: 1,
    },
    txt: {
        fontStyle: 'italic',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addedList: {
        padding: 5,
    },
    addedMore: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    addedTxt: {
        color: 'blue',
    },
});
