module.exports = {
	clearMocks: true,
	testEnvironment: "node",
	transform: {
		"^.+\\.mjs$": ["babel-jest", { configFile: "./babel.jest.js" }],
	},
	testMatch: [
		"**/__tests__/**/*.?(m)[jt]s",
		"**/?(*.)+(spec|test).?(m)[tj]s",
	],
	moduleFileExtensions: ["ts", "tsx", "mjs", "js", "jsx", "json", "node"],
};
