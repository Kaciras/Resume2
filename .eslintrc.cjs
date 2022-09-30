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
		"react/prop-types": "off",

		// 自己实现了图片的加载，不用它的 Image 组件。
		"@next/next/no-img-element": "off",

		// 不识别解构，反正我也不会忘记加 alt，关了吧。
		"jsx-a11y/alt-text": "off",
	},
	overrides: [{
		files: "**/__tests__/**/*.?(m)js",
		extends: ["@kaciras/jest"],
	}],
};
