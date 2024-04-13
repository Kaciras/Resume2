import core from "@kaciras/eslint-config-core";
import jest from "@kaciras/eslint-config-jest";
// import react from "@kaciras/eslint-config-react";

export default [
	{ ignores: ["out/**", ".next/**"] },
	...core.map(config => ({ ...config, files: ["**/*.[jt]s?(x)"] })),
	// ...react,
	...jest.map(config => ({ ...config, files: ["**/__tests__/**/*.?(m)js"] })),
	{
		rules: {
			// Currently I do not use next/image.
			"@next/next/no-img-element": "off",

			// Do not recognize object rest.
			"jsx-a11y/alt-text": "off",

			// I do not care about prop types.
			"react/prop-types": "off",

			"import/no-anonymous-default-export": "off",
		},
	},
];
