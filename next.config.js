const withPlugins = require("next-compose-plugins");
const withOptimizedImages = require("next-optimized-images");
const withBundlerAnalyzer = require("@next/bundle-analyzer");

function customWebpack(config) {
	config.module.rules.push({
		test: /\.(md|aes)$/,
		type: "asset/source",
	});

	// https://github.com/vercel/next.js/issues/17806
	config.module.rules.push({
		test: /\.mjs$/,
		type: "javascript/auto",
	});

	config.resolve.alias["@"] = __dirname;
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
