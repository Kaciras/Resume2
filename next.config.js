const { join } = require("path");
const withPlugins = require("next-compose-plugins");
const withOptimizedImages = require("next-optimized-images");
const withBundlerAnalyzer = require("@next/bundle-analyzer");

function customWebpack(config) {
	config.resolve.alias["@"] = __dirname;

	// https://github.com/vercel/next.js/issues/17806
	config.module.rules.push({
		test: /\.mjs$/,
		type: "javascript/auto",
	});

	/*
	 * next/image 默认的转码参数太差，我也没能找到如何自定义的方法，
	 * 所以还是用 next-optimized-images。
	 *
	 * next-optimized-images 将 SVG 转换为 URL，而图标又需要支持设置属性，
	 * 所以选择 svgr 作为加载器，并用 oneOf 避免重复处理。
	 */
	const loaders = [
		{
			test: /\.(md|aes)$/,
			type: "asset/source",
		},
		{
			test: /\.svg$/,
			include: join(__dirname, "assets/icon"),
			use: "@svgr/webpack",
		},
		{
			rules: config.module.rules,
		},
	];

	config.module.rules = [{ oneOf: loaders }];
	return config;
}

module.exports = withPlugins([
	withOptimizedImages,
	withBundlerAnalyzer({ enabled: process.env.ANALYZE === "true" }),
], {
	future: {
		webpack5: true,
	},
	poweredByHeader: false,
	webpack: customWebpack,
});
