function customWebpack(config) {
	config.module.rules.push({
		test: /\.md$/,
		use: "raw-loader",
	});
	return config;
}

module.exports = { webpack: customWebpack };
