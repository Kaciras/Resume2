import nextMDX from "@next/mdx";

export default nextMDX()({
	turbopack: {
		rules: {
			"*.svg": [
				{
					condition: { query: "?react" },
					as: "*.js",
					loaders: ["@svgr/webpack"],
				},
			],
		},
	},
	poweredByHeader: false,
	images: {
		dangerouslyAllowSVG: true,
		formats: ["image/avif", "image/webp"],
	},
});
