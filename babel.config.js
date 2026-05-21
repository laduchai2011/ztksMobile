module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./'],
                alias: {
                    '@src': './src',
                },
            },
        ],

        // luôn phải cuối cùng
        'react-native-reanimated/plugin',
    ],
};
