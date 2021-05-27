module.exports = {
	clearMocks: true,
	transform: {
		"^.+\\.mjs$": ["babel-jest", { configFile: "./babel.jest.js" }],
	},
	testMatch: [
		"**/__tests__/**/*.?(m)js",
	],
	moduleFileExtensions: ["mjs", "js", "jsx", "json", "node"],
};
