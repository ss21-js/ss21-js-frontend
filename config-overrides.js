const { override, addBabelPreset, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
	addBabelPreset('@emotion/babel-preset-css-prop'),
	addWebpackAlias({
		['assets']: path.resolve(__dirname, './src/assets'),
		['components']: path.resolve(__dirname, './src/components'),
		['models']: path.resolve(__dirname, './src/models'),
		['pages']: path.resolve(__dirname, './src/pages'),
		['store']: path.resolve(__dirname, './src/store'),
		['common']: path.resolve(__dirname, './src/common'),
		['Router']: path.resolve(__dirname, './src/Router.tsx'),
	})
);
