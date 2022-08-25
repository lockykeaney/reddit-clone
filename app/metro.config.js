const path = require('path');
const { getDefaultConfig } = require('metro-config');

const extraNodeModules = {
  react: path.resolve(__dirname, '../../node_modules/react'),
  'react-native': path.resolve(__dirname, '../../node_modules/react-native'),
};
const watchFolders = [
  path.resolve(path.join(__dirname, '../../node_modules')),
  path.resolve(path.join(__dirname, '../../packages/ui-core')),
  path.resolve(path.join(__dirname, '../../packages/ui-components')),
];
const nodeModulesPaths = [path.resolve(path.join(__dirname, './node_modules'))];

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig(__dirname);
  return {
    transformer: {
      // babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: true,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      extraNodeModules,
      nodeModulesPaths,
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg', 'cjs', 'tsx', 'ts', 'jsx', 'js'],
    },
    watchFolders,
  };
})();
