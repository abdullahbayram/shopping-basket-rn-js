module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          jsxImportSource: '@welldone-software/why-did-you-render',
        },
      ],
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@components': './src/components',
            '@constants': './src/constants',
            '@context': './src/context',
            '@redux': './src/redux',
            '@screens': './src/screens',
            '@utils': './src/utils',
            '@validate': './src/validate',
          },
        },
      ],
    ],
  };
};
