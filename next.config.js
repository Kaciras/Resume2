const withOptimizedImages = require("next-optimized-images");

function customWebpack(config) {
	config.module.rules.push({
		test: /\.(?:md|encrypt)$/,
		use: "raw-loader",
	});

	// https://github.com/vercel/next.js/issues/17806
	config.module.rules.push({
		test: /\.mjs$/,
		type: "javascript/auto",
	});

	config.resolve.alias["@"] = __dirname;
	return config;
}

module.exports = withOptimizedImages({
	poweredByHeader: false,
	trailingSlash: true,
	webpack: customWebpack,
});
