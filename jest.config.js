import nextJest from "next/jest.js";

// Following: https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler

const createJestConfig = nextJest({
	dir: "./", // Provide the path to your Next.js app to load next.config.js
});

/** @type {import('jest').Config} */
const customJestConfig = {
	moduleFileExtensions: ["js", "jsx", "json"],
	clearMocks: true,
	testMatch: [
		"**/__tests__/**/*.?(m)js",
	],
	//https://github.com/vercel/next.js/issues/40183
	transformIgnorePatterns: ["node_modules/@kaciras"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);
