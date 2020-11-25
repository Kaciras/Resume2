module.exports = {
	clearMocks: true,
	testEnvironment: "node",
	transform: {
		"^.+\\.jsx?$": "babel-jest",
		"^.+\\.mjs$": "babel-jest",
	},
	testMatch: [
		"**/__tests__/**/*.?(m)[jt]s?(x)",
		"**/?(*.)+(spec|test).?(m)[tj]s?(x)",
	],
	moduleFileExtensions: [
		"ts", "tsx",
		"mjs",
		"js", "jsx",
		"json", "node",
	],
};
