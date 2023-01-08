module.exports = {
	root: true,
	extends: [
		"@kaciras/core",
		"@kaciras/react",
		"next",
	],
	env: {
		node: true,
		browser: true,
	},
	rules: {
		// Currently I do not use next/image.
		"@next/next/no-img-element": "off",

		// Do not recognize object rest.
		"jsx-a11y/alt-text": "off",

		// I do not care about prop types.
		"react/prop-types": "off",

		"import/no-anonymous-default-export":"off",
	},
	overrides: [{
		files: "**/__tests__/**/*.?(m)js",
		extends: ["@kaciras/jest"],
	}],
};
