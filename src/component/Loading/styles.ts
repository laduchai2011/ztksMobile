// import { StyleSheet } from 'react-native';

// export const styles = StyleSheet.create({
//     parent: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: 'rgba(0,0,0,0.3)',
//     },
//     dotContainer: {
//         flexDirection: 'row',
//     },
//     dot: {
//         backgroundColor: 'blue',
//         width: 10,
//         height: 10,
//         borderRadius: 50,
//         marginLeft: 5,
//         marginRight: 5,
//     },
// });

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

    dotContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
});
