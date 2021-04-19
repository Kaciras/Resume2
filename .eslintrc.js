const jestConfig = require("./jest.config");

module.exports = {
	root: true,
	extends: [
		"@kaciras/core",
		"@kaciras/react",
	],
	env: {
		node: true,
		browser: true,
	},
	rules: {
		"react/prop-types": "off",
	},
	overrides: [{
		files: jestConfig.testMatch,
		extends: ["@kaciras/jest"],
	}],
};
