const { join } = require("path");
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer");
const aliasConfig = require("./alias.idea");

function customWebpack(config) {
	Object.assign(config.resolve.alias, aliasConfig.resolve.alias);

	// https://github.com/vercel/next.js/issues/17806
	config.module.rules.push({
		test: /\.mjs$/,
		type: "javascript/auto",
	});

	/*
	 * image-loader 将 SVG 转换为 URL，而图标又需要支持设置属性，
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
			test: /\.(png|jpg|svg)$/,
			use: "./lib/image-loader.js",
		},
		{
			rules: config.module.rules,
		},
	];

	config.module.rules = [{ oneOf: loaders }];
	return config;
}

module.exports = withPlugins([
	withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" }),
], {
	webpack: customWebpack,
	poweredByHeader: false,
	swcMinify: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		disableStaticImages: true,
	},
});
