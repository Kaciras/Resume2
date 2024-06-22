import nextMDX from "@next/mdx";

function customWebpack(config) {
	/*
	 * image-loader 将 SVG 转换为 URL，而图标又需要支持设置属性，
 	 * 所以选择 svgr 作为加载器，并用 oneOf 避免重复处理。
	 */
	const loaders = [
		{
			test: /\.svg$/,
			resourceQuery: /react/,
			use: "@svgr/webpack",
		},
		{
			rules: config.module.rules,
		},
	];

	config.module.rules = [{ oneOf: loaders }];
	return config;
}

export default nextMDX()({
	webpack: customWebpack,
	poweredByHeader: false,
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		dangerouslyAllowSVG: true,
		formats: ["image/avif", "image/webp"],
	},
});
