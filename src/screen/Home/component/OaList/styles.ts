import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    parent: {},
    selected: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e2e2e2',
    },
    selectedText: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        overflow: 'hidden',
    },
    oneOa: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        backgroundColor: '#cfcfcf',
        padding: 3,
    },
});
