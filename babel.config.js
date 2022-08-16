module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__decode'],
      },
    ],
  ]
};
