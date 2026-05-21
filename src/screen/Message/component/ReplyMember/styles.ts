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
    hiddenContent: {
        position: 'absolute',
        opacity: 0,
        zIndex: -1,
    },
    addedList: {
        overflow: 'hidden',
    },
    addedMore: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    addedTxt: {
        color: 'blue',
    },
    notAddedList: {
        overflow: 'hidden',
    },
    notAddedMore: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    notAddedTxt: {
        color: 'blue',
    },
});
