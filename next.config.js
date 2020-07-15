const withOptimizedImages = require("next-optimized-images");

function customWebpack(config) {
	config.module.rules.push({
		test: /\.md$/,
		use: "raw-loader",
	});
	config.resolve.alias["@"] = __dirname;
	return config;
}

module.exports = withOptimizedImages({
	poweredByHeader: false,
	exportTrailingSlash: true,
	webpack: customWebpack,
});
